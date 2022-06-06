import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeUser } from '../../../features/auth/userSlice';

import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

import classes from './Dropdown.module.scss';
import { useAuthOnReload } from '../../../features/auth/useAuthOnReload';
import { useFetchUser } from '../../../features/auth/useFetchUser';

export const Dropdown = () => {
  const dispatch = useDispatch();

  const { userData } = useFetchUser();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onSignOut = async () => {
    toggleDropdown();
    dispatch(removeUser());
    await signOut(auth);
  };

  useAuthOnReload(auth);

  return (
    <>
      {isDropdownVisible && <div className={classes.wrap} onClick={toggleDropdown}></div>}
      <div className={classes.nav__item}>
        {userData.name ? (
          <span onClick={toggleDropdown} className={classes.username}>
            {userData.name}
          </span>
        ) : (
          <Link to='/auth'>Войти</Link>
        )}
        {isDropdownVisible && (
          <div className={classes.dropdown} onClick={toggleDropdown}>
            <Link className={classes.dropdown__item} to={'/profile/favorite'}>
              {userData.name}
            </Link>
            <Link className={classes.dropdown__item} to={'/settings/general'}>
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
