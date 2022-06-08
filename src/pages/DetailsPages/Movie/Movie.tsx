import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Movie.module.scss';

import { Button, LoadingSpinner, Ratings } from '../../../components';
import { MovieListItem } from './MovieListItem';
import { loadMovieInfo } from '../../../features/movies/loadMovieInfoSlice';
import { AppDispatch } from '../../../store';
import { setLoginOffer } from '../../../features/loginOffer/loginOfferSlice';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { setNotification } from '../../../features/notification/notificationSlice';

interface IMovie {
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
      name: string;
      imageUrl: string;
      description: string;
      country: string;
      birthday: string;
      socialMedia: { link: string; name: string }[];
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

  const onWatchLaterClick = async () => {
    if (!userData.name) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    const { waitingContent } = fetchData;

    const isMovieAdded = waitingContent.movies.filter(
      (movieObj: IMovie) => movieObj.kinopoiskId === movieData.kinopoiskId
    ).length;

    if (isMovieAdded)
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список ожидаемых ранее' })
      );

    await updateDoc(doc(db, 'users', userData.email), {
      waitingContent: {
        games: [...fetchData.waitingContent.games],
        shows: [...fetchData.waitingContent.shows],
        movies: [
          ...fetchData.waitingContent.movies,
          {
            filmId: kinopoiskId,
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
          },
        ],
        books: [...fetchData.waitingContent.books],
      },
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Фильм добавлен в список ожидаемых' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  const onFavoriteClick = async () => {
    if (!userData.name) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    const { favoriteContent } = fetchData;

    const isMovieAdded = favoriteContent.movies.filter(
      (movieObj: IMovie) => movieObj.kinopoiskId === movieData.kinopoiskId
    ).length;

    if (isMovieAdded)
      return dispatch(
        setNotification({ type: 'warning', text: 'Вы уже добавляли этот фильм в список ожидаемых ранее' })
      );

    await updateDoc(doc(db, 'users', fetchData.userData.email), {
      favoriteContent: {
        games: [...fetchData.favoriteContent.games],
        shows: [...fetchData.favoriteContent.shows],
        movies: [
          ...fetchData.favoriteContent.movies,
          {
            filmId: kinopoiskId,
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
          },
        ],
        books: [...fetchData.favoriteContent.books],
      },
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Фильм добавлен в список любимых' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
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
                  <Button text='Буду смотреть' onClick={onWatchLaterClick} />
                  <Button text='Любимый' onClick={onFavoriteClick} />
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
