import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { GamesSlider } from './GamesSlider/GamesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import classes from './Games.module.scss';

import { loadBestGames } from '../../features/games/bestGamesSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';

interface IBestGames {
  bestGames: {
    gamesList: {
      results: {
        id: number;
        background_image: string;
        metacritic: number;
        rating: number;
        name: string;
        released: string;
        genres: { id: number; name: string }[];
        short_screenshots: { id: number; image: string }[];
      }[];
    };
  };
}

export const Games = () => {
  const dispatch = useAppDispatch();
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
            {bestGames.map(({ id, background_image, name }) => (
              <SectionCard key={id} id={id} section='games' bgImage={background_image} name={name} />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
