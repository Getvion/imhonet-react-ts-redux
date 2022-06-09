import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Button } from '../../components';
import { Lists, Stats, FavAndWait } from './';

import { useFetchUser } from '../../features/auth/useFetchUser';

import classes from './Profile.module.scss';

interface IUserContent {
  user: {
    favoriteContent: { shows: IItem[]; books: IItem[]; games: IItem[]; movies: IItem[] };
    waitingContent: { shows: IItem[]; books: IItem[]; games: IItem[]; movies: IItem[] };
  };
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
}

export const Profile = () => {
  const navigate = useNavigate();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { userData } = useFetchUser();
  const { birthday, country, description, imageUrl, name } = userData;

  const { favoriteContent, waitingContent } = useSelector((state: IUserContent) => state.user);

  const tabsTitles = [
    { title: 'Избранные', route: 'favorite' },
    { title: 'Ожидаемое', route: 'waiting' },
    { title: 'Списки', route: 'lists' },
    { title: 'Статистика', route: 'stats' },
  ];

  return (
    <div className={classes.profile}>
      <div className={classes.profile__info}>
        <div className={classes.profile__info_container}>
          <img src={imageUrl} alt={name} className={classes.profile__avatar} />
          <div className={classes.profile__content}>
            <h1 className={classes.profile__username}>{name}</h1>
            <div className={classes.profile__descr}>
              {description && <p>{description}</p>}
              {country && <p>Страна: {country}</p>}
              {birthday && <p>День рождения: {birthday}</p>}
            </div>
          </div>
        </div>
        <Button text='Редактировать' onClick={() => navigate('/settings/general')} />
      </div>
      <div className={classes.tabs}>
        <div className={classes.tabs__list}>
          {tabsTitles.map((item, index) => (
            <Link
              key={item.route}
              to={item.route}
              onClick={() => setActiveTabIndex(index)}
              className={clsx(classes.tabs__title, {
                [classes.active]: activeTabIndex === index,
              })}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <Routes>
          <Route path='favorite' element={<FavAndWait items={favoriteContent} />} />
          <Route path='lists' element={<Lists />} />
          <Route path='waiting' element={<FavAndWait items={waitingContent} />} />
          <Route path='stats' element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};
