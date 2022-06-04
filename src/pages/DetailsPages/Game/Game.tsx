import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Game.module.scss';

import { Button, LoadingSpinner, Ratings } from '../../../components';
import { GameListItem } from './GameListItem';
import { AppDispatch } from '../../../store';
import { Description } from './Description';
import { loadGameInfo } from '../../../features/games/loadGameInfo';
import { setLoginOffer } from '../../../features/loginOffer/loginOfferSlice';

interface IGame {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  metacritic: number;
  released: string;
  background_image: string;
  rating: number;
  esrb_rating: { name: string };
  platforms: { platform: { name: string } }[];
  description_raw: string;
  developers: { name: string }[];
  genres: { name: string }[];
  tags: { name: string }[];
  publishers: { name: string }[];
}

interface IGameInfo {
  gameInfo: {
    gameData: IGame;
  };
}

interface IUserData {
  user: { email: string; name: string };
}

export const Game = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { gameData } = useSelector(({ gameInfo }: IGameInfo) => gameInfo);
  const userData = useSelector(({ user }: IUserData) => user);

  const onWatchLaterClick = () => {
    if (!userData.name) return dispatch(setLoginOffer(true));
  };

  const onFavoriteClick = () => {
    if (!userData.name) return dispatch(setLoginOffer(true));
  };

  useEffect(() => {
    const currentGameId = window.location.href.split('/').reverse()[0];

    dispatch(loadGameInfo(currentGameId));
  }, [dispatch]);

  const {
    name,
    name_original,
    background_image,
    description_raw,
    genres,
    released,
    developers,
    publishers,
    platforms,
    metacritic,
    rating,
    esrb_rating,
    tags,
  } = gameData;

  return (
    <div className={classes.game}>
      {gameData.id ? (
        <>
          <div className={classes.game__top}>
            <img className={classes.game__image} src={background_image} alt={name} />
            <div className={classes.game__title_wrapper}>
              <div className={classes.game__inner}>
                <h1 className={classes.game__title}>{name}</h1>
                <h2 className={classes.game__original}>{name_original}</h2>
                <div className={classes.game__add}>
                  <Button text='Буду играть' onClick={onWatchLaterClick} />
                  <Button text='Любимая игра' onClick={onFavoriteClick} />
                </div>
                <div className={classes.game__info}>
                  <h3 className={classes.game__about}>О игре</h3>
                  <ul className={classes.game__list}>
                    <GameListItem description={'Год выхода'} content={released.split('-')[0]} />
                    <GameListItem description={'Разработчик'} content={developers.map((d) => `${d.name} `)} />
                    <GameListItem description={'Издатели'} content={publishers.map((p) => `${p.name} `)} />
                    {esrb_rating && <GameListItem description={'Рейткинг ESRB'} content={esrb_rating.name} />}
                    <GameListItem description={'Жанр'} content={genres.map((g) => `${g.name} `)} />
                    <GameListItem
                      description={'Платформы'}
                      content={platforms.map((p) => `${p.platform.name} `)}
                    />
                    <GameListItem description={'Теги'} content={tags.map((t) => `${t.name} `)} />
                  </ul>
                </div>
              </div>
              <div className={classes.game__grades}>
                {metacritic && (
                  <span
                    className={clsx(classes.game__grade, {
                      [classes.green]: metacritic / 10 >= 7,
                      [classes.yellow]: metacritic / 10 >= 4 && metacritic / 10 < 7,
                      [classes.red]: metacritic / 10 < 4,
                    })}
                  >
                    {metacritic / 10}
                  </span>
                )}
                {rating && (
                  <span
                    className={clsx(classes.game__grade, {
                      [classes.green]: rating * 2 >= 7,
                      [classes.yellow]: rating * 2 >= 4 && rating * 2 < 7,
                      [classes.red]: rating * 2 < 4,
                    })}
                  >
                    {(rating * 2).toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Description description={description_raw} />

          <div className={classes.game__ratings}>
            <h3 className={classes.game__about}>Оценка</h3>
            <Ratings />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
