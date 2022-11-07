import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button, LoadingSpinner } from '../../components';

import { Lists, Stats, FavAndWait } from './components';

import { useFetchUser } from '../../hooks';

import classes from './Profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { userData, lists, waitingContent, favoriteContent } = useFetchUser();
  const { country, description, imageUrl, name } = userData;

  const tabsTitles = [
    { title: 'Избранные', route: 'favorite' },
    { title: 'Ожидаемое', route: 'waiting' },
    { title: 'Списки', route: 'lists' },
    { title: 'Статистика', route: 'stats' }
  ];

  return (
    <div className={classes.profile}>
      <div className={classes.profile__info}>
        <div className={classes.profile__info_container}>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className={classes.profile__avatar} />
          ) : (
            <LoadingSpinner />
          )}
          <div className={classes.profile__content}>
            <h1 className={classes.profile__username}>{name}</h1>
            <div className={classes.profile__descr}>
              {description && <p>{description}</p>}
              {country && <p>Страна: {country}</p>}
            </div>
          </div>
        </div>
        <Button text='Редактировать' onClick={() => navigate('/settings/general')} />
      </div>
      <div className={classes.tabs}>
        <ul className={classes.tabs__list}>
          {tabsTitles.map((item, i) => (
            <li key={item.route}>
              <Link
                to={item.route}
                onClick={() => setActiveTabIndex(i)}
                className={clsx(classes.tabs__title, { [classes.active]: activeTabIndex === i })}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Routes>
          <Route
            path='favorite'
            element={<FavAndWait itemsArr={favoriteContent} dbSection='favorite' />}
          />
          <Route path='lists' element={<Lists lists={lists} />} />
          <Route
            path='waiting'
            element={<FavAndWait itemsArr={waitingContent} dbSection='waiting' />}
          />
          <Route path='stats' element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};
