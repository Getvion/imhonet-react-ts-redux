import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { GamesSlider } from './GamesSlider/GamesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import { loadBestGames } from '../../features/best/bestGamesSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { IState } from '../../@types/state';

import classes from './Games.module.scss';

export const Games = () => {
  const dispatch = useAppDispatch();

  const bestGames = useSelector((state: IState) => state.bestGames.results);

  useEffect(() => {
    dispatch(loadBestGames());
  }, [dispatch]);

  return (
    <div className={classes.games}>
      {bestGames.length ? (
        <>
          <GamesSlider items={bestGames} />
          <h2 className={classes.games__title}>Лучшие игры</h2>
          <div className={classes.games__list}>
            {bestGames.map(({ id, posterUrl, name }) => (
              <SectionCard key={id} id={id} section='games' bgImage={posterUrl} name={name} />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
