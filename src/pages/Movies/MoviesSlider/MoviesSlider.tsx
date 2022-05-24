import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import classes from './MoviesSlider.module.scss';
import clsx from 'clsx';

interface Movie {
  items: {
    filmId: number;
    nameRu: string;
    year: string;
    filmLength: string;
    genres: { genre: string }[];
    rating: string;
    posterUrl: string;
  }[];
}

export const MoviesSlider: React.FC<Movie> = ({ items }) => {
  return (
    <Swiper slidesPerView={1} loop={true} autoplay={true} className={classes.slider}>
      {items.map((item) => (
        <SwiperSlide className={classes.slide__inner} key={item.filmId}>
          <img className={classes.slide__img} src={item.posterUrl} alt='slide' />
          <div className={classes.slide__content}>
            <h2 className={classes.slide__name}>{item.nameRu}</h2>
            <div className={classes.slide__reviews}>
              <span
                className={clsx(classes.slide__review, {
                  [classes.green]: +item.rating > 7,
                  [classes.yellow]: +item.rating > 4 && +item.rating < 7,
                  [classes.red]: +item.rating < 4,
                })}
              >
                {item.rating}
              </span>
            </div>
            <span className={classes.slide__release}>Год релиза: {item.year}</span>
            <div className={classes.slide__genres}>
              Жанры:{' '}
              {item.genres.map((genre) => (
                <span key={genre.genre} className={classes.slide__genre}>
                  {genre.genre.toLowerCase()}{' '}
                </span>
              ))}
            </div>
            <span className={classes.slide__length}>Длина: {item.filmLength}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
