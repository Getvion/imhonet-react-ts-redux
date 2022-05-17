import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './GameCard.module.scss';

interface IGame {
  game: {
    prev?: string;
    next?: string;
    id: number;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    metacritic: number;
    genres: {
      id: number;
      name: string;
    }[];
    stores: {
      id: number;
      store: {
        id: number;
        name: string;
        image_background: string;
      };
    }[];
    short_screenshots: {
      id: number;
      image: string;
    }[];
  };
}

export const GameCard: React.FC<IGame> = ({ game }) => {
  return (
    <Link to={String(game.id)} className={classes.game}>
      <div className={classes.game__img__wrapper}>
        <img className={classes.game__img} src={game.background_image} alt={game.name} />
      </div>
      <h3 className={classes.game__title}>{game.name}</h3>
      <div className={classes.game__descr}>
        {game.genres.map((genre) => (
          <span key={genre.id} className={classes.game__genre}>
            {genre.name.toLowerCase()}{' '}
          </span>
        ))}
      </div>

      <div className={classes.additional}>
        <div
          className={clsx(classes.additional__metacritic, {
            [classes.metacriti_red]: game.metacritic < 60,
            [classes.metacriti_yellow]: game.metacritic > 60 && game.metacritic < 80,
            [classes.metacriti_green]: game.metacritic > 80,
          })}
        >
          {game.metacritic}
        </div>
        <div className={classes.additional__release}>
          Дата релиза<span>{game.released}</span>
        </div>
        <div className={classes.additional__rating}>
          Рейтинг <span>{game.rating}</span>
        </div>
      </div>
    </Link>
  );
};
