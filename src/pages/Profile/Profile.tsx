import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import clsx from 'clsx';
import 'react-tabs/style/react-tabs.css';

import { Button } from '../../components';
import { Collections, About, Lists, Waiting } from './';

import classes from './Profile.module.scss';

// todo perhaps возможно сделать не табами а ссылками /profile/about, /profile/lists, /profile/waiting/, /profile/collections
// todo подробная статистика
// todo раздел с подробной статистикой график распределения разного контента по годам, + все что есть в myshows

export const Profile = () => {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsTitles: string[] = ['Обо мне', 'Списки', 'Ожидаемое', 'Коллекции'];

  return (
    <div className={classes.profile}>
      <div className={classes.profile__info}>
        <div className={classes.profile__info_container}>
          <img
            src='https://media.rawg.io/media/resize/200/-/persons/e98/e988c4ee76e5c012452a3a4d52ea3d8f.jpg'
            alt='username'
            className={classes.profile__avatar}
          />
          <h1 className={classes.profile__username}>Username</h1>
        </div>
        {/* <div className={classes.profile__info_container}> */}
        <Button text='Settings' onClick={() => navigate('/settings')} />
        {/* </div> */}
      </div>
      <div className={classes.profile__content}>
        <Tabs className={classes.tabs}>
          <TabList className={classes.tabs__list}>
            {tabsTitles.map((item, index) => (
              <Tab
                onClick={() => setActiveTabIndex(index)}
                className={clsx(classes.tabs__title, {
                  [classes.active]: activeTabIndex === index,
                })}
              >
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanel className={classes.tabs__content}>
            <About />
          </TabPanel>
          <TabPanel className={classes.tabs__content}>
            <Lists />
          </TabPanel>
          <TabPanel className={classes.tabs__content}>
            <Waiting />
          </TabPanel>
          <TabPanel className={classes.tabs__content}>
            <Collections />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
