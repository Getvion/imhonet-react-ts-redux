import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../features/auth/use-auth';
import { removeUser } from '../../../features/auth/userSlice';

import classes from './Dropdown.module.scss';

// todo заменить email на nickname

export const Dropdown = () => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onSignOut = () => {
    toggleDropdown();
    dispatch(removeUser());
  };

  return (
    <>
      {isDropdownVisible && <div className={classes.wrap} onClick={toggleDropdown}></div>}
      <div className={classes.nav__item}>
        {email ? <span onClick={toggleDropdown}>{email}</span> : <Link to='/auth'>Войти</Link>}
        {isDropdownVisible && (
          <div className={classes.dropdown} onClick={toggleDropdown}>
            <Link className={classes.dropdown__item} to={'/profile/about'}>
              {email}
            </Link>
            <Link className={classes.dropdown__item} to={'/settings'}>
              Настройки
            </Link>
            <Link onClick={onSignOut} className={classes.dropdown__item} to='/auth'>
              {email ? 'Выйти' : 'Войти'}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
