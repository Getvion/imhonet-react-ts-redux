import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadMovieInfo } from '../../features/movies/loadMovieInfo';
import { AppDispatch } from '../../store';

import classes from './MovieCard.module.scss';

interface IMovie {
  movie: {
    filmId: number;
    nameRu: string;
    year: string;
    genres: { genre: string }[];
    rating: string;
    posterUrlPreview: string;
  };
}

export const MovieCard: React.FC<IMovie> = ({ movie }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onMovieClick = (filmId: number) => {
    dispatch(loadMovieInfo(filmId));
  };

  return (
    <Link to={String(movie.filmId)} className={classes.movie} onClick={() => onMovieClick(movie.filmId)}>
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
  );
};
