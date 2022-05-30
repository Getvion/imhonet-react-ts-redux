import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button, UploadImage } from '../../components';
import { Favorite, Lists, Waiting, Stats } from './';

import { useFetchUser } from '../../features/auth/useFetchUser';

import classes from './Profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { description, imageUrl, name } = useFetchUser();

  const tabsTitles = [
    { title: 'Избранные', route: 'favorite' },
    { title: 'Списки', route: 'lists' },
    { title: 'Ожидаемое', route: 'waiting' },
    { title: 'Статистика', route: 'stats' },
  ];

  return (
    <div className={classes.profile}>
      <div className={classes.profile__info}>
        <div className={classes.profile__info_container}>
          <UploadImage imageUrl={imageUrl} name={name} />
          <div className={classes.profile__content}>
            <h1 className={classes.profile__username}>{name}</h1>
            <p className={classes.profile__descr}>{description}</p>
          </div>
        </div>
        <Button text='Редактировать' onClick={() => navigate('/settings')} />
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
          <Route path='favorite' element={<Favorite />} />
          <Route path='lists' element={<Lists />} />
          <Route path='waiting' element={<Waiting />} />
          <Route path='stats' element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};
