import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeUser } from '../../../features/auth/userSlice';

import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

import { useAuthOnReload } from '../../../features/auth/useAuthOnReload';
import { useFetchUser } from '../../../features/auth/useFetchUser';

import classes from './Dropdown.module.scss';

export const Dropdown = () => {
  const dispatch = useDispatch();

  const { userData } = useFetchUser();

  const onSignOut = async () => {
    dispatch(removeUser());
    await signOut(auth);
  };

  useAuthOnReload(auth);

  return (
    <div className={classes.nav__item}>
      {userData.name ? (
        <>
          <p className={classes.username}>{userData.name}</p>
          <div className={classes.dropdown}>
            <Link to='/profile/favorite' className={classes.dropdown__item}>
              {userData.name}
            </Link>
            <Link className={classes.dropdown__item} to={'/settings/general'}>
              Настройки
            </Link>
            <Link onClick={onSignOut} className={classes.dropdown__item} to='/auth'>
              Выйти
            </Link>
          </div>
        </>
      ) : (
        <Link to='/auth'>Войти</Link>
      )}
    </div>
  );
};
