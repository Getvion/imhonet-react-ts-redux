import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  loadBestBooks,
  loadBestGames,
  loadBestMovies,
  loadBestShows,
  selectBestContent
} from '../../features/best/bestContentSlice';

import { MainContent } from './components';

import { useAppDispatch } from '../../hooks';

import classes from './Main.module.scss';

export const Main = () => {
  const dispatch = useAppDispatch();

  const { games, movies, shows, books } = useSelector(selectBestContent);

  useEffect(() => {
    dispatch(loadBestGames());
    dispatch(loadBestMovies());
    dispatch(loadBestShows());
    dispatch(loadBestBooks());
  }, [dispatch]);

  return (
    <main className={classes.main}>
      <section className={classes.category}>
        <h2 className={classes.category__title}>Лучшие фильмы</h2>
        <MainContent content={movies} section='movies' />
      </section>
      <section className={classes.category}>
        <h2 className={classes.category__title}>Лучшие игры</h2>
        <MainContent content={games} section='games' />
      </section>
      <section className={classes.category}>
        <h2 className={classes.category__title}>Лучшие сериалы</h2>
        <MainContent content={shows} section='shows' />
      </section>
      <section className={classes.category}>
        <h2 className={classes.category__title}>Лучшие книги</h2>
        <MainContent content={books} section='books' />
      </section>
    </main>
  );
};
