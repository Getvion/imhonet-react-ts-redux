/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MoviesSlider } from './MoviesSlider/MoviesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import classes from './Movies.module.scss';

import { loadBestMovies } from '../../features/movies/bestMoviesSlice';
import { AppDispatch } from '../../store';

interface IMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  posterUrlPreview: string;
}

export const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const bestMovies = useSelector((state: any) => state?.bestMovies.moviesList.films);

  useEffect(() => {
    dispatch(loadBestMovies());
  }, [dispatch]);

  return (
    <div className={classes.movies}>
      {bestMovies ? (
        <>
          <MoviesSlider items={bestMovies} />
          <h2 className={classes.movies__title}>Лучшие фильмы</h2>
          <div className={classes.movies__list}>
            {bestMovies.map(({ filmId, nameRu, nameEn, posterUrlPreview }: IMovie) => (
              <SectionCard
                key={filmId}
                id={filmId}
                name={nameRu || nameEn}
                bgImage={posterUrlPreview}
                section='movies'
              />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
