import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { GamesSlider } from './GamesSlider/GamesSlider';
import { LoadingSpinner, SectionCard } from '../../components';

import { loadBestGames, selectBestGames } from '../../features/best/bestContentSlice';
import { setNotification } from '../../features/notification/notificationSlice';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import classes from './Games.module.scss';

export const Games = () => {
  const dispatch = useAppDispatch();

  const bestGames = useSelector(selectBestGames);

  useEffect(() => {
    dispatch(loadBestGames());
  }, [dispatch]);

  if (bestGames.isError) {
    dispatch(setNotification({ text: bestGames.isError, type: 'reject' }));
  }

  return (
    <div className={classes.games}>
      {bestGames.isLoaded ? (
        <>
          <GamesSlider items={bestGames.results} />
          <h2 className={classes.games__title}>Лучшие игры</h2>
          <div className={classes.games__list}>
            {bestGames.results.map(({ id, posterUrl, name }) => (
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
