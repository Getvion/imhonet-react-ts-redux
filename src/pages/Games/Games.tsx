import React, { useEffect } from 'react';

import { GamesSlider } from './GamesSlider/GamesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import classes from './Games.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { loadBestGames } from '../../features/games/bestGamesSlice';
import { AppDispatch } from '../../store';

interface IGame {
  id: number;
  background_image: string;
  metacritic: number;
  rating: number;
  name: string;
  released: string;
  genres: { id: number; name: string }[];
  short_screenshots: { id: number; image: string }[];
}

interface IBestGames {
  bestGames: {
    gamesList: {
      results: IGame[];
    };
  };
}

export const Games = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bestGames = useSelector((state: IBestGames) => state.bestGames.gamesList.results);

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
            {bestGames.map(({ id, background_image, name }: IGame) => (
              <SectionCard key={id} id={id} section={'games'} bgImage={background_image} name={name} />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
