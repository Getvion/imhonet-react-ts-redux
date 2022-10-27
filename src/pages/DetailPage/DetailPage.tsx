import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { Button, LoadingSpinner, RatingFormater, Ratings } from '../../components';
import { Description, MoviePlayer, PageInfo } from './components';

import { loadGameInfo, loadMovieInfo } from '../../features/details/pageDetailsSlice';
import {
  setCatalogListData,
  setCatalogListOpen,
  emptyPageState,
  setLoginOffer,
  setNotification
} from '../../features';

import { useAppDispatch } from '../../hooks';

import { IAdd } from '../../@types/intefaces';
import { IState } from '../../@types/state';

import classes from './DetailPage.module.scss';

interface IProps {
  sectionName: string;
}

export const DetailPage: React.FC<IProps> = ({ sectionName }) => {
  const dispatch = useAppDispatch();

  const { userData } = useSelector((state: IState) => state.user);
  const pageDetails = useSelector((state: IState) => state.pageDetails);
  const { name, nameOriginal, id, posterUrl } = pageDetails;

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

  // load content info
  useEffect(() => {
    if (id) return;

    const currentId = window.location.href.split('/').reverse()[0];

    if (sectionName === 'movies') dispatch(loadMovieInfo(currentId));
    if (sectionName === 'games') dispatch(loadGameInfo(currentId));

    return () => {
      dispatch(emptyPageState());
    };
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
                <PageInfo pageDetails={pageDetails} sectionName={sectionName} />
              </div>
              <div className={classes.page__grades}>
                <RatingFormater rating={pageDetails.rating1} />
                <RatingFormater rating={pageDetails.rating2} />
              </div>
            </div>
          </div>
          {pageDetails.description && <Description description={pageDetails.description} />}
          {sectionName === 'movies' && <MoviePlayer sectionName={sectionName} id={id} />}
          <div className={classes.ratings}>
            <h3 className={classes.ratings__title}>Оценка</h3>
            <Ratings />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
