import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../store';
import { searchGamesByName, searchMoviesByName } from '../../features/search/searchSlice';

import classes from './Search.module.scss';

// todo сдлать в виде табов как в профиле: все, игры, фильмы, сериалы, книги
// todo сделать один компонент и передевать в него разные параметры: картинка и название. Верстка одинаковая.

interface ISearch {
  search: {
    searchInputValue: string;
    books: {
      isLoaded: boolean;
    };
    games: {
      isLoaded: boolean;
    };
    movies: {
      isLoaded: boolean;
    };
    shows: {
      isLoaded: boolean;
    };
  };
}

export const Search = () => {
  const { searchInputValue, books, games, movies, shows } = useSelector((state: ISearch) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(searchGamesByName('gta v'));
    dispatch(searchMoviesByName('gta v'));
  }, [dispatch]);

  return (
    <div className={classes.search}>
      <h1 className={classes.search__title}>Поиск по запросу: {searchInputValue}</h1>
      <section className={classes.games}>
        <h2 className={classes.games__title}>Поиск в разделе игры:</h2>
      </section>
      <section className={classes.movies}>
        <h2 className={classes.movies__title}>Поиск в разделе фильмы:</h2>
      </section>
      <section className={classes.shows}>
        <h2 className={classes.shows__title}>Поиск в разделе сериалы:</h2>
      </section>
      <section className={classes.books}>
        <h2 className={classes.books__title}>Поиск в разделе книги:</h2>
      </section>
    </div>
  );
};
