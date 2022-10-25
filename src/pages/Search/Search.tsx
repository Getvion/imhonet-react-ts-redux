import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import {
  searchGamesByName,
  searchMoviesByName,
  selectSearchContent
} from '../../features/search/searchSlice';

import { LoadingSpinner, SectionCard } from '../../components';

import { useAppDispatch } from '../../hooks';

import classes from './Search.module.scss';

export const Search = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { searchInputValue, games, movies } = useSelector(selectSearchContent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchGamesByName(searchInputValue));
    dispatch(searchMoviesByName(searchInputValue));
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
      {searchTabs.map((tab, i) => (
        <Link
          to={tab.route}
          key={tab.route}
          onClick={() => setSelectedTab(i)}
          className={clsx(classes.search__tab, { [classes.active]: selectedTab === i })}
        >
          {tab.title}
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
          path='books'
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
      </Routes>
    </div>
  );
};
