import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoadingSpinner, SectionCard } from '../../components';
import { loadBestGames } from '../../features/games/bestGamesSlice';
import { loadBestMovies } from '../../features/movies/bestMoviesSlice';
import { useWindowDimensions } from '../../hooks';
import { AppDispatch } from '../../store';

import classes from './Main.module.scss';

interface IBestGames {
  bestGames: { gamesList: { results: { background_image: string; id: number; name: string }[] } };
}

interface IBestMovies {
  bestMovies: {
    moviesList: { films: { filmId: number; nameRu: string; nameEn: string; posterUrlPreview: string }[] };
  };
}

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [slidesToView, setSlidesToView] = useState(4);

  const bestGames = useSelector((state: IBestGames) => state.bestGames.gamesList.results);
  const bestMovies = useSelector((state: IBestMovies) => state.bestMovies.moviesList.films);

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

  return (
    <main className={classes.main}>
      <div className={classes.category}>
        <h2 className={classes.category__title}>Лучшие Фильмы</h2>
        <div className={classes.cards}>
          {bestMovies ? (
            <Swiper slidesPerView={slidesToView} loop>
              {bestMovies.map(({ filmId, nameEn, nameRu, posterUrlPreview }) => (
                <SwiperSlide key={filmId} className={classes.card}>
                  <SectionCard name={nameRu || nameEn} bgImage={posterUrlPreview} section='movies' id={filmId} />
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
          {bestGames ? (
            <Swiper slidesPerView={slidesToView} loop>
              {bestGames.map(({ id, name, background_image }) => (
                <SwiperSlide key={id} className={classes.card}>
                  <SectionCard name={name} bgImage={background_image} section='games' id={id} />
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
