/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { MoviesSlider } from './MoviesSlider/MoviesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import { loadBestMovies } from '../../features/best/bestMoviesSlice';

import { useAppDispatch } from '../../hooks';

import { IState } from '../../@types/state';

import classes from './Movies.module.scss';

interface IMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  posterUrlPreview: string;
}

export const Movies = () => {
  const dispatch = useAppDispatch();

  const bestMovies = useSelector((state: IState) => state?.bestMovies.moviesList.films);

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
