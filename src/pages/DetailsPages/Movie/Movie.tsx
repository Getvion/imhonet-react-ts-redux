import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Movie.module.scss';

import 'swiper/css/bundle';
import { Button, LoadingSpinner, Ratings } from '../../../components';
import { MovieListItem } from './MovieListItem';
import { loadMovieInfo, loadMovieSimilar, loadMovieStaffInfo } from '../../../features/movies/loadMovieInfo';
import { AppDispatch } from '../../../store';

interface IMovie {
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
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

interface IStaff {
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionKey: string;
}

interface IMovieData {
  movieInfo: {
    movieData: IMovie;
    movieStaffData: {
      nameRu: string;
      nameEn: string;
      description: string;
      posterUrl: string;
      professionKey: string;
    }[];
    movieSimilar: {
      items: {
        filmId: number;
        nameRu: string;
        posterUrlPreview: string;
      }[];
    };
  };
}

// todo если пользователь не вошел в аккаунт, то  показывать попап с просьбой авторизоваться

export const Movie = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movieData, movieStaffData, movieSimilar } = useSelector(({ movieInfo }: IMovieData) => movieInfo);

  const {
    posterUrl,
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

  const ratingAgeLimits = () => {
    if (movieData.ratingAgeLimits === 'age18') return '18+';
    if (movieData.ratingAgeLimits === 'age16') return '16+';
    if (movieData.ratingAgeLimits === 'age12') return '12+';
    return '0+';
  };

  const onSimilarMovieClick = (filmId: number) => {
    dispatch(loadMovieInfo(filmId));
    dispatch(loadMovieStaffInfo(filmId));
    dispatch(loadMovieSimilar(filmId));
  };

  useEffect(() => {
    const currentMovieId = window.location.href.split('/').reverse()[0];

    dispatch(loadMovieInfo(currentMovieId));
    dispatch(loadMovieStaffInfo(currentMovieId));
    dispatch(loadMovieSimilar(currentMovieId));
  }, [dispatch]);

  return (
    <div className={classes.movie}>
      {movieData.kinopoiskId ? (
        <>
          <div className={classes.movie__top}>
            <img className={classes.movie__image} src={posterUrl} alt={nameRu} />
            <div className={classes.movie__title_wrapper}>
              <div className={classes.movie__inner}>
                <h1 className={classes.movie__title}>{nameRu}</h1>
                <h2 className={classes.movie__original}>{nameOriginal}</h2>
                <div className={classes.movie__add}>
                  <Button text='Буду смотреть' onClick={() => console.log('hi')} />
                  <Button text='Любимый' onClick={() => console.log('hi')} />
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

          <div className={classes.roles}>
            <h3 className={classes.movie__about}>Актеры и роли</h3>
            <Swiper slidesPerView={5} spaceBetween={30} loop={false}>
              {movieStaffData.length &&
                movieStaffData.map((person: IStaff) => (
                  <div key={person.nameEn}>
                    {person.professionKey === 'ACTOR' && (
                      <SwiperSlide className={classes.roles__person}>
                        <img className={classes.roles__img} src={person.posterUrl} alt={person.nameRu} />
                        <span className={classes.roles__name}>{person.nameRu}</span>
                        <span className={classes.roles__role}>{person.description}</span>
                      </SwiperSlide>
                    )}
                  </div>
                ))}
            </Swiper>
          </div>

          <div className={classes.similar}>
            <h3 className={classes.movie__about}>Похожие фильмы</h3>
            <Swiper slidesPerView={5} spaceBetween={10} loop={false}>
              {movieSimilar.items &&
                movieSimilar.items.map((item) => (
                  <SwiperSlide className={classes.similar__movie} key={item.filmId}>
                    <Link to={String(item.filmId)} onClick={() => onSimilarMovieClick(item.filmId)}>
                      <img className={classes.similar__img} src={item.posterUrlPreview} alt={item.nameRu} />
                      <span className={classes.similar__name}>{item.nameRu}</span>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
