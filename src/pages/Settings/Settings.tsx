import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { ResetPassword, Links, General } from './';
import { Button } from '../../components';
import { IUserData } from '../../intefaces';

import classes from './Settings.module.scss';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { setNotification } from '../../features/notification/notificationSlice';
import { updateProfile } from 'firebase/auth';

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state: IUserData) => state.user);
  const { name, imageUrl, country, description, email } = userData;

  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [generalData, setGeneralData] = useState(userData);

  const navLinks = [
    { href: 'general', text: 'Основные' },
    { href: 'password', text: 'Смена пароля (в разработке)' },
    { href: 'social-links', text: 'Сcылки (в разработке)' },
  ];

  const onApplyChanges = async () => {
    if (!generalData.name) return dispatch(setNotification({ type: 'reject', text: 'Сначала укажите имя' }));

    const newUserData = {
      ...userData,
      name: generalData.name,
      description: generalData.description,
      country: generalData.country,
      imageUrl: generalData.imageUrl,
    };

    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, { displayName: newUserData.name });

    const docRef = doc(db, 'users', email);
    await updateDoc(docRef, {
      userData: newUserData,
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Данные обновллены' })))
      .then(() => navigate('/profile/favorite'))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

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
            <Route
              path='general'
              element={
                <General
                  name={name}
                  imageUrl={imageUrl}
                  country={country}
                  description={description}
                  setGeneralData={setGeneralData}
                />
              }
            />
            <Route path='password' element={<ResetPassword />} />
            <Route path='social-links' element={<Links />} />
          </Routes>
        </div>
      </div>

      <div className={classes.buttons}>
        <Button onClick={onApplyChanges} state='accept' text='Сохранить' />
        <Button onClick={() => navigate('/profile/favorite')} state='reject' text='Отмена' />
      </div>
    </div>
  );
};
