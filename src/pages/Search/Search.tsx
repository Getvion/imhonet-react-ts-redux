import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import clsx from 'clsx';

import { searchGamesByName, searchMoviesByName } from '../../features/search/searchSlice';
import { LoadingSpinner, SectionCard } from '../../components';

import classes from './Search.module.scss';

import { useAppDispatch } from '../../hooks';

interface ISearch {
  search: {
    searchInputValue: string;
    books: {
      isLoaded: boolean;
    };
    games: {
      isLoaded: boolean;
      gamesSearch: { results: { name: string; background_image: string; id: number }[] };
    };
    movies: {
      isLoaded: boolean;
      moviesSearch: { films: { filmId: number; posterUrlPreview: string; nameEn: string; nameRu: string }[] };
    };
    shows: {
      isLoaded: boolean;
    };
  };
}

export const Search = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { searchInputValue, games, movies } = useSelector((state: ISearch) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchGamesByName(searchInputValue));
    dispatch(searchMoviesByName(searchInputValue));
  }, [dispatch, searchInputValue]);

  const searchTabs = [
    { title: 'Игры', route: 'games' },
    { title: 'Фильмы', route: 'movies' }
    // { title: 'Сериалы', route: 'shows' }, { title: 'Книги', route: 'books' },
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
                <>
                  {games.gamesSearch.results.map(({ id, name, background_image }) => (
                    <SectionCard key={id} name={name} id={id} bgImage={background_image} section='games' />
                  ))}
                </>
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
                <>
                  {movies.moviesSearch.films.map(({ filmId, nameEn, nameRu, posterUrlPreview }) => (
                    <SectionCard
                      key={filmId}
                      name={nameRu || nameEn}
                      bgImage={posterUrlPreview}
                      id={filmId}
                      section='movies'
                    />
                  ))}
                </>
              ) : (
                <LoadingSpinner />
              )}
            </section>
          }
        />
        {/* <Route path='shows' element={<Section title={'Только cериалы:'} dataArray={[]} />} /> */}
        {/* <Route path='books' element={<Section title={'Только книги:'} dataArray={[]} />} /> */}
      </Routes>
    </div>
  );
};
