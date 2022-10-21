import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { Button, LoadingSpinner, RatingFormater, Ratings } from '../../components';
import { Description, ListItem } from './components';

import { setNotification } from '../../features/notification/notificationSlice';
import { setLoginOffer } from '../../features/loginOffer/loginOfferSlice';
import { loadGameInfo, loadMovieInfo } from '../../features/details/pageDetailsSlice';
import {
  setCatalogListData,
  setCatalogListOpen
} from '../../features/listsCatalog/listsCatalogSlice';

import { useAppDispatch } from '../../hooks';

import { IAdd, IUserData } from '../../@types/intefaces';

import classes from './DetailPage.module.scss';
import { RootState } from '../../store';

interface IProps {
  sectionName: string;
}

export const DetailPage: React.FC<IProps> = ({ sectionName }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const pageDetails = useSelector((state: RootState) => state.pageDetails);
  const { name, nameOriginal, id, posterUrl } = pageDetails;

  const { userData } = useSelector(({ user }: IUserData) => user);

  const addContent = (contentType: IAdd[]) =>
    contentType.map((element) => {
      if (element.sectionName === sectionName) {
        return {
          ...element,
          items: [
            ...element.items,
            { id, name, nameOrig: nameOriginal, bgImg: posterUrl, section: sectionName }
          ]
        };
      }
      return element;
    });

  const onLaterClick = async (waitingContent: IAdd[]) => {
    const findWaitSection = waitingContent.find((item: IAdd) => item.sectionName === sectionName);
    const waitGameAdded = findWaitSection?.items.find((item) => Number(item.id) === Number(id));

    if (waitGameAdded?.id) {
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот элемент в список' })
      );
    }

    await updateDoc(doc(db, 'users', userData.email), {
      waitingContent: addContent(waitingContent)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Успешно добавлено' })))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' }))
      );
  };

  const onFavoriteClick = async (favoriteContent: IAdd[]) => {
    const findFavoriteSection = favoriteContent.find((item) => item.sectionName === sectionName);
    const favGameAdded = findFavoriteSection?.items.find((item) => Number(item.id) === Number(id));

    if (favGameAdded?.id)
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот элемент в список' })
      );

    await updateDoc(doc(db, 'users', userData.email), {
      favoriteContent: addContent(favoriteContent)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Успешно добавлено' })))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' }))
      );
  };

  const onAddCustomList = () => {
    const catalogListObj = {
      name,
      nameOrig: nameOriginal,
      bgImg: posterUrl,
      id,
      section: sectionName
    };
    dispatch(setCatalogListData(catalogListObj));
    dispatch(setCatalogListOpen(true));
  };

  const onAddItem = async (triggerList: string) => {
    if (!userData.email) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    const { waitingContent, favoriteContent } = fetchData;

    if (triggerList === 'waiting') onLaterClick(waitingContent);
    if (triggerList === 'favorite') onFavoriteClick(favoriteContent);
    if (triggerList === 'listCatalog') onAddCustomList();
  };

  const contentTypeCheck = () => {
    if (sectionName === 'games') return 'игре';
    if (sectionName === 'movies') return 'фильме';
    if (sectionName === 'shows') return 'сериале';
    return 'книге';
  };

  const ratingAgeLimits = () => {
    if (pageDetails.ageRating === 'age18' || pageDetails.ageRating === 'Mature') return '18+';
    if (pageDetails.ageRating === 'age16' || pageDetails.ageRating === 'Teen') return '16+';
    if (pageDetails.ageRating === 'age12' || pageDetails.ageRating === 'Everyone 10+') return '12+';
    return '0+';
  };

  useEffect(() => {
    if (id) return;

    const section = pathname.split('/')[1];
    const currentId = pathname.split('/').reverse()[0];

    if (section === 'movies') {
      dispatch(loadMovieInfo(currentId));
    }

    if (section === 'games') {
      dispatch(loadGameInfo(currentId));
    }
  }, []);

  return (
    <div className={classes.page}>
      {id ? (
        <>
          <div className={classes.page__top}>
            <img className={classes.page__image} src={posterUrl} alt={pageDetails.name} />
            <div className={classes.page__title_wrapper}>
              <div className={classes.page__inner}>
                <h1 className={classes.page__title}>{name}</h1>
                <h2 className={classes.page__original}>{nameOriginal}</h2>
                <div className={classes.page__add}>
                  <Button text='Позже' onClick={() => onAddItem('waiting')} />
                  <Button text='Любимое' onClick={() => onAddItem('favorite')} />
                  <Button text='+' onClick={() => onAddItem('listCatalog')} />
                </div>
                <div className={classes.page__info}>
                  <h3 className={classes.page__about}>О {contentTypeCheck()}</h3>
                  <ul className={classes.page__list}>
                    <ListItem description='Год выхода' content={pageDetails.year} />
                    <ListItem description='Жанр' content={pageDetails.genres} />
                    <ListItem description='Возраст' content={ratingAgeLimits()} />

                    {pageDetails.achievementsCount && (
                      <ListItem description='Достижения' content={pageDetails.achievementsCount} />
                    )}

                    {pageDetails.developers?.length && (
                      <ListItem
                        description='Разработчики'
                        content={pageDetails.developers.map((elem) => elem.name)}
                      />
                    )}
                    {pageDetails.publishers?.length && (
                      <ListItem
                        description='Издатели'
                        content={pageDetails.publishers.map((elem) => elem.name)}
                      />
                    )}
                    {pageDetails.countries?.length && (
                      <ListItem description='Страны' content={pageDetails.countries} />
                    )}
                    {pageDetails.filmLength && (
                      <ListItem description='Длина' content={`${pageDetails.filmLength}мин`} />
                    )}
                  </ul>
                </div>
              </div>
              <div className={classes.page__grades}>
                <RatingFormater rating={pageDetails.rating1} />
                <RatingFormater rating={pageDetails.rating2} />
              </div>
            </div>
          </div>
          <Description description={pageDetails.description} />
          <div className={classes.page__ratings}>
            <h3 className={classes.page__about}>Оценка</h3>
            <Ratings />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
