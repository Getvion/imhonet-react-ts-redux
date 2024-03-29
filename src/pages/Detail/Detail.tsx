import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { Button, LoadingSpinner, RatingFormater, Ratings } from '../../components';
import { Description, MoviePlayer, PageInfo } from './components';

import {
  loadGameInfo,
  loadMovieInfo,
  loadShowsInfo,
  loadBookInfo,
  selectPageDetails
} from '../../features/details/pageDetailsSlice';
import {
  setCatalogListData,
  setCatalogListOpen,
  emptyPageState,
  setLoginOffer,
  setNotification
} from '../../features';
import { selectUserData } from '../../features/auth/userSlice';

import { useAppDispatch } from '../../hooks';

import { IAdd, IItem, SectionType } from '../../@types/intefaces';

import classes from './Detail.module.scss';

interface IProps {
  sectionName: SectionType;
}

export const Detail: React.FC<IProps> = ({ sectionName }) => {
  const dispatch = useAppDispatch();

  const { email } = useSelector(selectUserData);
  const pageDetails = useSelector(selectPageDetails);
  const { name, nameOriginal, id, posterUrl, rating1, rating2, description, year, genres } =
    pageDetails;

  const updateBaseContent = async (content: IAdd[], section: string) => {
    const newObj: IItem = {
      id,
      name,
      nameOrig: nameOriginal,
      bgImg: posterUrl,
      section: sectionName,
      year,
      genres
    };

    const newContent = content.map((element) =>
      element.sectionName === sectionName
        ? { ...element, items: [...element.items, newObj] }
        : element
    );

    await updateDoc(doc(db, 'users', email), { [section]: newContent })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Успешно добавлено' })))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' }))
      );
  };

  const onLaterClick = async (waitingContent: IAdd[]) => {
    const findWaitSection = waitingContent.find((item: IAdd) => item.sectionName === sectionName);
    const waitGameAdded = findWaitSection?.items.find((item) => Number(item.id) === Number(id));

    if (waitGameAdded?.id) {
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот элемент в список' })
      );
    }

    updateBaseContent(waitingContent, 'waitingContent');
  };

  const onFavoriteClick = async (favoriteContent: IAdd[]) => {
    const findFavoriteSection = favoriteContent.find((item) => item.sectionName === sectionName);
    const favGameAdded = findFavoriteSection?.items.find((item) => Number(item.id) === Number(id));

    if (favGameAdded?.id)
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот элемент в список' })
      );

    updateBaseContent(favoriteContent, 'favoriteContent');
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
    if (!email) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', email);
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
    const currentId = window.location.href.split('/').reverse()[0];

    if (sectionName === 'movies') dispatch(loadMovieInfo(currentId));
    if (sectionName === 'games') dispatch(loadGameInfo(currentId));
    if (sectionName === 'shows') dispatch(loadShowsInfo(currentId));
    if (sectionName === 'books') dispatch(loadBookInfo(currentId));

    return () => {
      dispatch(emptyPageState());
    };
  }, []);

  return (
    <div className={classes.page}>
      {id ? (
        <>
          <div className={classes.page__top}>
            <img className={classes.page__image} src={posterUrl} alt={name} />
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
                {rating1 && <RatingFormater rating={rating1} />}
                {rating2 && <RatingFormater rating={rating2} />}
              </div>
            </div>
          </div>
          {description && <Description description={description} />}
          {sectionName === 'movies' && <MoviePlayer sectionName={sectionName} id={id} />}
          <div className={classes.ratings}>
            <h3 className={classes.ratings__title}>Оценка</h3>
            <Ratings section={sectionName} />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
