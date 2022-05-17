import React from 'react';

import { MoviesSlider } from './MoviesSlider/MoviesSlider';

import classes from './Movies.module.scss';
import { Link } from 'react-router-dom';

interface IMovies {
  name: string;
  movies: Array<IMovie>;
}

interface IMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  filmLength: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  rating: string;
  posterUrl: string;
  posterUrlPreview: string;
}

export const Movies: React.FC<IMovies> = ({ name, movies }) => {
  return (
    <div className={classes.movies}>
      <MoviesSlider items={movies} />
      <h2 className={classes.movies__title}>{name}</h2>
      <div className={classes.movies__list}>
        {movies.map((movie: IMovie) => (
          <Link to={String(movie.filmId)} key={movie.filmId} className={classes.movie}>
            <div className={classes.movie__img__wrapper}>
              <img className={classes.movie__img} src={movie.posterUrlPreview} alt={movie.nameRu} />
            </div>
            <h3 className={classes.movie__title}>{movie.nameRu}</h3>
            <div className={classes.movie__descr}>
              {movie.genres.map((genre) => (
                <span key={genre.genre} className={classes.move__genre}>
                  {genre.genre}{' '}
                </span>
              ))}
            </div>

            <div className={classes.additional}>
              <div className={classes.additional__release}>
                Дата релиза<span>{movie.year}</span>
              </div>
              <div className={classes.additional__rating}>
                Рейтинг <span>{movie.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
