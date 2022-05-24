import React, { useEffect } from 'react';

import { GamesSlider } from './GamesSlider/GamesSlider';
import { GameCard, LoadingSpinner } from '../../components';

import classes from './Games.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { loadBestGames } from '../../features/games/bestGamesSlice';
import { AppDispatch } from '../../store';

interface IGame {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: { id: number; name: string }[];
}

export const Games = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bestGames = useSelector((state: any) => state?.bestGames.gamesList.results);

  useEffect(() => {
    dispatch(loadBestGames());
  }, [dispatch]);

  return (
    <div className={classes.games}>
      {bestGames ? (
        <>
          <GamesSlider items={bestGames} />
          <h2 className={classes.games__title}>Лучшие игры</h2>
          <div className={classes.games__list}>
            {bestGames.map((game: IGame) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
