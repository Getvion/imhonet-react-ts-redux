import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoadingSpinner, SectionCard } from '../../components';

import {
  loadBestGames,
  loadBestMovies,
  selectBestContent
} from '../../features/best/bestContentSlice';
import { setNotification } from '../../features/notification/notificationSlice';

import { useWindowDimensions, useAppDispatch } from '../../hooks';

import classes from './Main.module.scss';
import 'swiper/css';

export const Main = () => {
  const dispatch = useAppDispatch();

  const [slidesToView, setSlidesToView] = useState(4);

  const { games, movies } = useSelector(selectBestContent);

  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (windowWidth > 1200) setSlidesToView(4);
    if (windowWidth < 1200) setSlidesToView(3);
    if (windowWidth < 910) setSlidesToView(2);
    if (windowWidth < 610) setSlidesToView(1);
  }, [windowWidth]);

  useEffect(() => {
    dispatch(loadBestGames());
    dispatch(loadBestMovies());
  }, [dispatch]);

  if (games.isError || movies.isError) {
    dispatch(setNotification({ text: games.isError || movies.isError, type: 'reject' }));
  }

  return (
    <main className={classes.main}>
      <div className={classes.category}>
        <h2 className={classes.category__title}>Лучшие Фильмы</h2>
        <div className={classes.cards}>
          {movies.isLoaded ? (
            <Swiper slidesPerView={slidesToView} loop>
              {movies.results.map(({ id, name, posterUrl }) => (
                <SwiperSlide key={id} className={classes.card}>
                  <SectionCard name={name} bgImage={posterUrl} section='movies' id={id} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
      <div className={classes.category}>
        <h2 className={classes.category__title}>Лучшие Игры</h2>
        <div className={classes.cards}>
          {games.isLoaded ? (
            <Swiper slidesPerView={slidesToView} loop>
              {games.results.map(({ id, name, posterUrl }) => (
                <SwiperSlide key={id} className={classes.card}>
                  <SectionCard name={name} bgImage={posterUrl} section='games' id={id} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </main>
  );
};
