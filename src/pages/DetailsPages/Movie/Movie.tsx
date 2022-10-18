import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import classes from './Movie.module.scss';

import { Button, LoadingSpinner, Ratings } from '../../../components';
import { IAdd, IMovieData, IUserData } from '../../../@types/intefaces';
import { MovieListItem } from './MovieListItem';
import { loadMovieInfo } from '../../../features/movies/loadMovieInfoSlice';
import { AppDispatch } from '../../../store';
import { setLoginOffer } from '../../../features/loginOffer/loginOfferSlice';
import { setNotification } from '../../../features/notification/notificationSlice';
import { setCatalogListData, setCatalogListOpen } from '../../../features/listsCatalog/listsCatalogSlice';

import { db } from '../../../firebase';

import { useAppDispatch } from '../../../hooks/useAppDispatch';

interface IProps {
  sectionName: string;
}

export const Movie: React.FC<IProps> = ({ sectionName }) => {
  const dispatch = useAppDispatch();

  const { movieInfo } = useSelector((state: IMovieData) => state);
  const { userData } = useSelector(({ user }: IUserData) => user);

  const {
    kinopoiskId,
    posterUrl,
    posterUrlPreview,
    nameRu,
    nameOriginal,
    year,
    countries,
    genres,
    ratingMpaa,
    description,
    filmLength,
    ratingKinopoisk,
    ratingImdb
  } = movieInfo;

  const ratingAgeLimits = () => {
    if (movieInfo.ratingAgeLimits === 'age18') return '18+';
    if (movieInfo.ratingAgeLimits === 'age16') return '16+';
    if (movieInfo.ratingAgeLimits === 'age12') return '12+';
    return '0+';
  };

  const addContent = (contentType: IAdd[]) =>
    contentType.map((element: IAdd) => {
      if (element.sectionName === sectionName) {
        return {
          ...element,
          items: [
            ...element.items,
            {
              id: kinopoiskId,
              name: nameRu,
              nameOrig: nameOriginal,
              bgImg: posterUrlPreview,
              section: sectionName
            }
          ]
        };
      }
      return element;
    });

  const onWatchLaterClick = async (waitingContent: IAdd[]) => {
    const findWaitSection = waitingContent.find((item: IAdd) => item.sectionName === sectionName);
    const waitMovieAdded = findWaitSection?.items.find((item: { id: number }) => item.id === kinopoiskId);

    if (waitMovieAdded?.id)
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список' }));

    await updateDoc(doc(db, 'users', userData.email), {
      waitingContent: addContent(waitingContent)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Фильм добавлен в список ожидаемых' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  const onFavoriteClick = async (favoriteContent: IAdd[]) => {
    const findFavSection = favoriteContent.find((item: IAdd) => item.sectionName === sectionName);
    const favMovieAdded = findFavSection?.items.find((item: { id: number }) => item.id === kinopoiskId);

    if (favMovieAdded?.id)
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список' }));

    await updateDoc(doc(db, 'users', userData.email), {
      favoriteContent: addContent(favoriteContent)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Фильм добавлен в список любимых' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  const onAddCustomList = () => {
    const catalogListObj = {
      name: nameRu,
      nameOrig: nameOriginal,
      bgImg: posterUrlPreview,
      id: kinopoiskId,
      section: 'movies'
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
    if (triggerList === 'waiting') onWatchLaterClick(waitingContent);
    if (triggerList === 'favorite') onFavoriteClick(favoriteContent);
    if (triggerList === 'listCatalog') onAddCustomList();
  };

  useEffect(() => {
    const currentMovieId = window.location.href.split('/').reverse()[0];

    dispatch(loadMovieInfo(currentMovieId));
  }, [dispatch]);

  return (
    <div className={classes.movie}>
      {kinopoiskId ? (
        <>
          <div className={classes.movie__top}>
            <img className={classes.movie__image} src={posterUrl} alt={nameRu} />
            <div className={classes.movie__title_wrapper}>
              <div className={classes.movie__inner}>
                <h1 className={classes.movie__title}>{nameRu}</h1>
                <h2 className={classes.movie__original}>{nameOriginal}</h2>
                <div className={classes.movie__add}>
                  <Button text='Буду смотреть' onClick={() => onAddItem('waiting')} />
                  <Button text='Любимый' onClick={() => onAddItem('favorite')} />
                  <Button text='+' onClick={() => onAddItem('listCatalog')} />
                </div>
                <div className={classes.movie__info}>
                  <h3 className={classes.movie__about}>О фильме</h3>
                  <ul className={classes.movie__list}>
                    {year && <MovieListItem description='Год производства' content={year} />}
                    {countries.length && (
                      <MovieListItem
                        description='Страна'
                        content={countries.map((c, i) => (i === countries.length - 1 ? c.country : `${c.country}, `))}
                      />
                    )}
                    {genres.length && (
                      <MovieListItem
                        description='Жанр'
                        content={genres.map((g, i) => (i === genres.length - 1 ? g.genre : `${g.genre}, `))}
                      />
                    )}
                    <MovieListItem description='Возраст' content={ratingAgeLimits()} />
                    {ratingMpaa && <MovieListItem description='Возраст MRAA' content={ratingMpaa.toUpperCase()} />}
                    {filmLength && <MovieListItem description='Продолжительность' content={`${filmLength} мин`} />}
                  </ul>
                </div>
              </div>
              <div className={classes.movie__grades}>
                {ratingKinopoisk && (
                  <span
                    className={clsx(classes.movie__grade, {
                      [classes.green]: ratingKinopoisk >= 7,
                      [classes.yellow]: ratingKinopoisk >= 4 && ratingKinopoisk < 7,
                      [classes.red]: ratingKinopoisk < 4
                    })}
                  >
                    {ratingKinopoisk}
                  </span>
                )}
                {ratingImdb && (
                  <span
                    className={clsx(classes.movie__grade, {
                      [classes.green]: ratingImdb >= 7,
                      [classes.yellow]: ratingImdb >= 4 && ratingImdb < 7,
                      [classes.red]: ratingImdb < 4
                    })}
                  >
                    {ratingImdb}
                  </span>
                )}
              </div>
            </div>
          </div>
          {description && (
            <div className={classes.movie__descr}>
              <h3 className={classes.movie__about}>Описание</h3>
              <p className={classes.movie__descr_text}>{description}</p>
            </div>
          )}

          <div className={classes.movie__ratings}>
            <h3 className={classes.movie__about}>Оценка</h3>
            <Ratings />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
