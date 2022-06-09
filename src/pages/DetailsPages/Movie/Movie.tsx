import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Movie.module.scss';

import { Button, LoadingSpinner, Ratings } from '../../../components';
import { MovieListItem } from './MovieListItem';
import { loadMovieInfo } from '../../../features/movies/loadMovieInfoSlice';
import { AppDispatch } from '../../../store';
import { setLoginOffer } from '../../../features/loginOffer/loginOfferSlice';
import { setNotification } from '../../../features/notification/notificationSlice';
import { setCatalogListData, setCatalogListOpen } from '../../../features/listsCatalog/listsCatalogSlice';

import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface IMovie {
  filmId: number;
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  filmLength: number;
  description: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
}

interface IMovieData {
  movieInfo: {
    movieData: IMovie;
  };
}

interface IUserData {
  user: {
    userData: {
      email: string;
    };
  };
}

export const Movie = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movieData } = useSelector(({ movieInfo }: IMovieData) => movieInfo);
  const { userData } = useSelector(({ user }: IUserData) => user);

  const ratingAgeLimits = () => {
    if (movieData.ratingAgeLimits === 'age18') return '18+';
    if (movieData.ratingAgeLimits === 'age16') return '16+';
    if (movieData.ratingAgeLimits === 'age12') return '12+';
    return '0+';
  };

  const onAddItem = async (triggerList: string) => {
    if (!userData.email) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    const { waitingContent, favoriteContent } = fetchData;
    const waitMovieAdded = waitingContent.movies.filter(
      (movieObj: IMovie) => movieObj.filmId === movieData.kinopoiskId
    ).length;
    const favMovieAdded = favoriteContent.movies.filter(
      (movieObj: IMovie) => movieObj.filmId === movieData.kinopoiskId
    ).length;

    if (triggerList === 'waiting') onWatchLaterClick(fetchData, waitMovieAdded);
    if (triggerList === 'favorite') onFavoriteClick(fetchData, favMovieAdded);
    if (triggerList === 'listCatalog') onAddCustomList();
  };

  const onWatchLaterClick = async (fetchData: DocumentData, waitMovieAdded: undefined) => {
    if (waitMovieAdded)
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список' }));

    await updateDoc(doc(db, 'users', userData.email), {
      waitingContent: {
        games: [...fetchData.waitingContent.games],
        shows: [...fetchData.waitingContent.shows],
        movies: [
          ...fetchData.waitingContent.movies,
          { id: kinopoiskId, name: nameRu, nameOrig: nameOriginal, bgImg: posterUrlPreview },
        ],
        books: [...fetchData.waitingContent.books],
      },
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Фильм добавлен в список ожидаемых' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  const onFavoriteClick = async (fetchData: DocumentData, favMovieAdded: undefined) => {
    if (favMovieAdded)
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список' }));

    await updateDoc(doc(db, 'users', fetchData.userData.email), {
      favoriteContent: {
        games: [...fetchData.favoriteContent.games],
        shows: [...fetchData.favoriteContent.shows],
        movies: [
          ...fetchData.favoriteContent.movies,
          { id: kinopoiskId, name: nameRu, nameOrig: nameOriginal, bgImg: posterUrlPreview },
        ],
        books: [...fetchData.favoriteContent.books],
      },
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
      section: 'movies',
    };

    dispatch(setCatalogListData(catalogListObj));
    dispatch(setCatalogListOpen(true));
  };

  useEffect(() => {
    const currentMovieId = window.location.href.split('/').reverse()[0];

    dispatch(loadMovieInfo(currentMovieId));
  }, [dispatch]);

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
    ratingImdb,
  } = movieData;

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
                    <MovieListItem description={'Год производства'} content={year} />
                    <MovieListItem
                      description={'Страна'}
                      content={countries.map((c, i) =>
                        i === countries.length - 1 ? c.country : `${c.country}, `
                      )}
                    />
                    <MovieListItem
                      description={'Жанр'}
                      content={genres.map((g, i) => (i === genres.length - 1 ? g.genre : `${g.genre}, `))}
                    />
                    <MovieListItem description={'Возраст'} content={ratingAgeLimits()} />
                    <MovieListItem description={'Возраст MRAA'} content={ratingMpaa.toUpperCase()} />
                    <MovieListItem description={'Продолжительность'} content={`${filmLength} мин`} />
                  </ul>
                </div>
              </div>
              <div className={classes.movie__grades}>
                <span
                  className={clsx(classes.movie__grade, {
                    [classes.green]: ratingKinopoisk >= 7,
                    [classes.yellow]: ratingKinopoisk >= 4 && ratingKinopoisk < 7,
                    [classes.red]: ratingKinopoisk < 4,
                  })}
                >
                  {ratingKinopoisk}
                </span>
                <span
                  className={clsx(classes.movie__grade, {
                    [classes.green]: ratingImdb >= 7,
                    [classes.yellow]: ratingImdb >= 4 && ratingImdb < 7,
                    [classes.red]: ratingImdb < 4,
                  })}
                >
                  {ratingImdb}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.movie__descr}>
            <h3 className={classes.movie__about}>Описание</h3>
            <p className={classes.movie__descr_text}>{description}</p>
          </div>

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
