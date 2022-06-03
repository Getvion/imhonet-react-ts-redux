import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoadingSpinner, SectionCard } from '../../components';
import { loadBestGames } from '../../features/games/bestGamesSlice';
import { loadBestMovies } from '../../features/movies/bestMoviesSlice';
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

  const bestGames = useSelector((state: IBestGames) => state.bestGames.gamesList.results);
  const bestMovies = useSelector((state: IBestMovies) => state.bestMovies.moviesList.films);

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
            <Swiper slidesPerView={4} spaceBetween={30} loop={true}>
              {bestMovies.map(({ filmId, nameEn, nameRu, posterUrlPreview }) => (
                <SwiperSlide key={filmId}>
                  <SectionCard
                    name={nameRu || nameEn}
                    bgImage={posterUrlPreview}
                    section={'movies'}
                    id={filmId}
                  />
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
            <Swiper slidesPerView={4} spaceBetween={30} loop={true}>
              {bestGames.map(({ id, name, background_image }) => (
                <SwiperSlide key={id}>
                  <SectionCard name={name} bgImage={background_image} section={'games'} id={id} />
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
