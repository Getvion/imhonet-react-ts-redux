import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { General } from '.';
import { Button } from '../../components';

import { IState } from '../../@types/state';

import { auth, db } from '../../firebase';

import { setNotification } from '../../features/notification/notificationSlice';

import classes from './Settings.module.scss';

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state: IState) => state.user);
  const { name, imageUrl, country, description, email } = userData;

  const [generalData, setGeneralData] = useState(userData);

  const onApplyChanges = async () => {
    if (!generalData.name)
      return dispatch(setNotification({ type: 'reject', text: 'Сначала укажите имя' }));

    const newUserData = {
      ...userData,
      name: generalData.name,
      description: generalData.description,
      country: generalData.country,
      imageUrl: generalData.imageUrl
    };

    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, { displayName: newUserData.name });

    const docRef = doc(db, 'users', email);
    await updateDoc(docRef, {
      userData: newUserData
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Данные обновллены' })))
      .then(() => navigate('/profile/favorite'))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' }))
      );
  };

  return (
    <div className={classes.settings}>
      <div className={classes.settings__container}>
        <nav className={classes.nav}>
          <ul className={classes.nav__list}>
            <li className={classes.nav__item}>
              {/* className={classes.nav__link} */}
              <Button onClick={() => {}} text='Основные' />
            </li>
          </ul>
        </nav>

        <div className={classes.settings__content}>
          <General
            name={name}
            imageUrl={imageUrl}
            country={country}
            description={description}
            setGeneralData={setGeneralData}
          />
        </div>
      </div>

      <div className={classes.buttons}>
        <Button onClick={onApplyChanges} state='accept' text='Сохранить' />
        <Button onClick={() => navigate('/profile/favorite')} state='reject' text='Отмена' />
      </div>
    </div>
  );
};
