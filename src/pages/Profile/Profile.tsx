import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from '../../components';
import { Favorite, Lists, Waiting, Stats } from './';

import classes from './Profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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
          <img
            src='https://media.rawg.io/media/resize/200/-/persons/e98/e988c4ee76e5c012452a3a4d52ea3d8f.jpg'
            alt='username'
            className={classes.profile__avatar}
          />
          <div className={classes.profile__content}>
            <h1 className={classes.profile__username}>Username</h1>
            <p className={classes.profile__descr}>Lorem ipsum dolor sit amet,</p>
          </div>
        </div>
        <Button text='Settings' onClick={() => navigate('/settings')} />
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
