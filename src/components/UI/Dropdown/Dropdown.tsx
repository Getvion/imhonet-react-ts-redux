import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeUser, setUser } from '../../../features/auth/userSlice';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

import classes from './Dropdown.module.scss';

export const Dropdown = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.user.name);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onSignOut = async () => {
    toggleDropdown();
    dispatch(removeUser());
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            name: currentUser.displayName,
            token: currentUser.refreshToken,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <>
      {isDropdownVisible && <div className={classes.wrap} onClick={toggleDropdown}></div>}
      <div className={classes.nav__item}>
        {userName ? (
          <span onClick={toggleDropdown} className={classes.username}>
            {userName}
          </span>
        ) : (
          <Link to='/auth'>Войти</Link>
        )}
        {isDropdownVisible && (
          <div className={classes.dropdown} onClick={toggleDropdown}>
            <Link className={classes.dropdown__item} to={'/profile/favorite'}>
              {userName}
            </Link>
            <Link className={classes.dropdown__item} to={'/settings'}>
              Настройки
            </Link>
            <Link onClick={onSignOut} className={classes.dropdown__item} to='/auth'>
              Выйти
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
