import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import classes from './Settings.module.scss';

import { ResetPassword, Links, General } from './';
import { Button } from '../../components';

export const Settings = () => {
  const navigate = useNavigate();
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const navLinks = [
    { href: 'general', text: 'Основные (в разработке)' },
    { href: 'password', text: 'Смена пароля (в разработке)' },
    { href: 'social-links', text: 'Сcылки (в разраотке)' },
  ];

  return (
    <div className={classes.settings}>
      <div className={classes.settings__container}>
        <nav className={classes.nav}>
          <ul className={classes.nav__list}>
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={clsx(classes.nav__item, { [classes.active]: activeLinkIndex === index })}
                onClick={() => setActiveLinkIndex(index)}
              >
                <Link className={classes.nav__link} to={link.href}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={classes.settings__content}>
          <Routes>
            <Route path='general' element={<General />} />
            <Route path='password' element={<ResetPassword />} />
            <Route path='social-links' element={<Links />} />
          </Routes>
        </div>
      </div>

      <div className={classes.buttons}>
        <Button onClick={() => {}} state='accept' text='Сохранить' />
        <Button onClick={() => navigate('/profile/favorite')} state='reject' text='Отмена' />
      </div>
    </div>
  );
};
