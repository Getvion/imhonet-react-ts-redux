import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import {
  searchBooksByName,
  searchGamesByName,
  searchMoviesByName,
  searchShowsByName,
  selectSearchContent
} from '../../features/search/searchSlice';

import { LoadingSpinner, SectionCard } from '../../components';

import { useAppDispatch } from '../../hooks';

import classes from './Search.module.scss';

export const Search = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { searchInputValue, games, movies, shows, books } = useSelector(selectSearchContent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchGamesByName(searchInputValue));
    dispatch(searchMoviesByName(searchInputValue));
    dispatch(searchShowsByName(searchInputValue));
    dispatch(searchBooksByName(searchInputValue));
  }, []);

  const searchTabs = [
    { title: 'Игры', route: 'games' },
    { title: 'Фильмы', route: 'movies' },
    { title: 'Сериалы', route: 'shows' },
    { title: 'Книги', route: 'books' }
  ];

  return (
    <div className={classes.search}>
      <h1 className={classes.search__title}>Поиск по запросу: {searchInputValue}</h1>
      {searchTabs.map(({ route, title }, i) => (
        <Link
          to={route}
          key={route}
          onClick={() => setSelectedTab(i)}
          className={clsx(classes.search__tab, { [classes.active]: selectedTab === i })}
        >
          {title}
        </Link>
      ))}

      <Routes>
        <Route
          path='games'
          element={
            <section className={classes.search__section}>
              {games.isLoaded ? (
                games.results.map(({ id, name, posterUrl }) => (
                  <SectionCard key={id} name={name} id={id} bgImage={posterUrl} section='games' />
                ))
              ) : (
                <LoadingSpinner />
              )}
            </section>
          }
        />
        <Route
          path='movies'
          element={
            <section className={classes.search__section}>
              {movies.isLoaded ? (
                movies.results.map(({ id, name, posterUrl }) => (
                  <SectionCard key={id} name={name} bgImage={posterUrl} id={id} section='movies' />
                ))
              ) : (
                <LoadingSpinner />
              )}
            </section>
          }
        />
        <Route
          path='shows'
          element={
            <section className={classes.search__section}>
              {shows.isLoaded ? (
                shows.results.map(({ id, name, posterUrl }) => (
                  <SectionCard key={id} name={name} bgImage={posterUrl} id={id} section='shows' />
                ))
              ) : (
                <LoadingSpinner />
              )}
            </section>
          }
        />
        <Route
          path='books'
          element={
            <section className={classes.search__section}>
              {books.isLoaded ? (
                books.results.map(({ id, name, posterUrl }) => (
                  <SectionCard key={id} name={name} bgImage={posterUrl} id={id} section='books' />
                ))
              ) : (
                <LoadingSpinner />
              )}
            </section>
          }
        />
      </Routes>
    </div>
  );
};
