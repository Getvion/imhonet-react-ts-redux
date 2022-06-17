import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Game.module.scss';

import { Button, LoadingSpinner, Ratings } from '../../../components';
import { IAdd, IUserData } from '../../../intefaces';
import { GameListItem } from './GameListItem';
import { AppDispatch } from '../../../store';
import { Description } from './Description';
import { loadGameInfo } from '../../../features/games/loadGameInfoSlice';
import { setLoginOffer } from '../../../features/loginOffer/loginOfferSlice';
import { setNotification } from '../../../features/notification/notificationSlice';
import { setCatalogListData, setCatalogListOpen } from '../../../features/listsCatalog/listsCatalogSlice';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface IProps {
  sectionName: string;
}

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
  publishers: { name: string }[];
}

interface IGameInfo {
  gameInfo: IGame;
}

export const Game: React.FC<IProps> = ({ sectionName }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { gameInfo } = useSelector((state: IGameInfo) => state);
  const { userData } = useSelector(({ user }: IUserData) => user);

  const onAddItem = async (triggerList: string) => {
    if (!userData.email) return dispatch(setLoginOffer(true));

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    const { waitingContent, favoriteContent } = fetchData;

    if (triggerList === 'waiting') onPlayLaterClick(waitingContent);
    if (triggerList === 'favorite') onFavoriteClick(favoriteContent);
    if (triggerList === 'listCatalog') onAddCustomList();
  };

  const addContent = (contentType: IAdd[]) => {
    return contentType.map((element: IAdd) => {
      if (element.sectionName === sectionName) {
        return {
          ...element,
          items: [
            ...element.items,
            { id: id, name: name, nameOrig: name_original, bgImg: background_image, section: sectionName },
          ],
        };
      }
      return element;
    });
  };

  const onPlayLaterClick = async (waitingContent: IAdd[]) => {
    const findWaitSection = waitingContent.find((item: IAdd) => item.sectionName === sectionName);
    const waitGameAdded = findWaitSection?.items.find((item: { id: number }) => item.id === id);

    if (waitGameAdded?.id) {
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли эту игру в список' }));
    }

    await updateDoc(doc(db, 'users', userData.email), {
      waitingContent: addContent(waitingContent),
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Игра успешно добавлена в список' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: ' Произошла ошибка попробуйте снвоа' })));
  };

  const onFavoriteClick = async (favoriteContent: IAdd[]) => {
    const findFavoriteSection = favoriteContent.find((item: IAdd) => item.sectionName === sectionName);
    const favGameAdded = findFavoriteSection?.items.find((item: { id: number }) => item.id === id);

    if (favGameAdded?.id)
      return dispatch(setNotification({ type: 'warning', text: 'Вы уже добавляли эту игру в список' }));

    await updateDoc(doc(db, 'users', userData.email), {
      favoriteContent: addContent(favoriteContent),
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Игра успешно добавлена в список' })))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' })));
  };

  const onAddCustomList = () => {
    const catalogListObj = {
      name: name,
      nameOrig: name_original,
      bgImg: background_image,
      id: id,
      section: 'games',
    };
    dispatch(setCatalogListData(catalogListObj));
    dispatch(setCatalogListOpen(true));
  };

  useEffect(() => {
    const currentGameId = window.location.href.split('/').reverse()[0];

    dispatch(loadGameInfo(currentGameId));
  }, [dispatch]);

  const {
    id,
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
  } = gameInfo;

  return (
    <div className={classes.game}>
      {id ? (
        <>
          <div className={classes.game__top}>
            <img className={classes.game__image} src={background_image} alt={name} />
            <div className={classes.game__title_wrapper}>
              <div className={classes.game__inner}>
                <h1 className={classes.game__title}>{name}</h1>
                <h2 className={classes.game__original}>{name_original}</h2>
                <div className={classes.game__add}>
                  <Button text='Буду играть' onClick={() => onAddItem('waiting')} />
                  <Button text='Любимая игра' onClick={() => onAddItem('favorite')} />
                  <Button text='+' onClick={() => onAddItem('listCatalog')} />
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
