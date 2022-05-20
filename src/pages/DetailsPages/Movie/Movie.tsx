import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import classes from './Movie.module.scss';

import 'swiper/css/bundle';
import { Button, LoadingSpinner } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovieInfo, loadMovieStaffInfo } from '../../../features/movies/loadMovieInfo';
import { AppDispatch } from '../../../store';

interface IMovie {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear: number;
  endYear: number;
  serial: boolean;
}

interface IStaff {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

interface IMovieData {
  movieInfo: {
    movieData: IMovie;
    movieStaffData: {
      staffId: number;
      nameRu: string;
      nameEn: string;
      description: string;
      posterUrl: string;
      professionText: string;
      professionKey: string;
    }[];
  };
}

// todo если пользователь не вошел в аккаунт, то  показывать попап с просьбой авторизоваться

export const Movie = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movieData, movieStaffData } = useSelector(({ movieInfo }: IMovieData) => movieInfo);

  useEffect(() => {
    const currentMovieId = window.location.href.split('/').reverse()[0];

    dispatch(loadMovieStaffInfo(currentMovieId));

    if (!movieData.kinopoiskId) dispatch(loadMovieInfo(currentMovieId));
  }, [dispatch, movieData.kinopoiskId]);

  const similar = {
    items: [
      {
        filmId: 586397,
        nameRu: 'Джанго освобожденный',
        nameEn: 'Django Unchained',
        nameOriginal: 'Django Unchained',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/586397.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/586397.jpg',
        relationType: 'SIMILAR',
      },
    ],
  };

  const ratingAgeLimits = () => {
    if (movieData.ratingAgeLimits === 'age18') return '18+';
    if (movieData.ratingAgeLimits === 'age16') return '16+';
    if (movieData.ratingAgeLimits === 'age12') return '12+';
  };

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
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Год производства</span>
                      <span className={classes.movie__list_content}>{year}</span>
                    </li>
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Страна</span>
                      <span className={classes.movie__list_content}>
                        {countries.map((c, i) => (i === countries.length - 1 ? c.country : `${c.country}, `))}
                      </span>
                    </li>
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Жанр</span>
                      <span className={classes.movie__list_content}>
                        {genres.map((g, i) => (i === genres.length - 1 ? g.genre : `${g.genre}, `))}
                      </span>
                    </li>
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Возраст</span>
                      <span className={classes.movie__list_content}>{ratingAgeLimits()}</span>
                    </li>
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Возраст MRAA</span>
                      <span className={classes.movie__list_content}>{ratingMpaa.toUpperCase()}</span>
                    </li>
                    <li className={classes.movie__list_item}>
                      <span className={classes.movie__list_descr}>Время</span>
                      <span className={classes.movie__list_content}>{filmLength}</span>
                    </li>
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
            <h3 className={classes.movie__about}>О фильме</h3>
            <p className={classes.movie__descr_text}>{description}</p>
          </div>

          <div className={classes.movie__ratings}>select rating</div>

          <div className={classes.roles}>
            <h3 className={classes.movie__about}>Актеры и роли</h3>
            <Swiper slidesPerView={5} spaceBetween={30} loop={false}>
              {movieStaffData.map((person: IStaff) => (
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
              {similar.items.map((item) => (
                <SwiperSlide className={classes.similar__movie} key={item.filmId}>
                  <Link to={String(item.filmId)}>
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
