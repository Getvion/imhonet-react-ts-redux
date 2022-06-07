import React, { useEffect } from 'react';

import { MoviesSlider } from './MoviesSlider/MoviesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import classes from './Movies.module.scss';

import { useDispatch, useSelector } from 'react-redux';
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
  const movies = useSelector((state: any) => state?.bestMovies.moviesList.films);

  useEffect(() => {
    dispatch(loadBestMovies());
  }, [dispatch]);

  return (
    <div className={classes.movies}>
      {movies ? (
        <>
          <MoviesSlider items={movies} />
          <h2 className={classes.movies__title}>Лучшие фильмы</h2>
          <div className={classes.movies__list}>
            {movies.map(({ filmId, nameRu, nameEn, posterUrlPreview }: IMovie) => (
              <SectionCard
                key={filmId}
                id={filmId}
                name={nameRu || nameEn}
                bgImage={posterUrlPreview}
                section={'movies'}
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
