import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Dropdown.module.scss';

interface IDropdown {
  username: string;
}

export const Dropdown: React.FC<IDropdown> = ({ username }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <>
      {isDropdownVisible && <div onClick={toggleDropdown} className={classes.wrap}></div>}
      <li className={classes.nav__item} onClick={toggleDropdown}>
        {username}
        {isDropdownVisible && (
          <div className={classes.dropdown}>
            <Link className={classes.dropdown__item} to={'/profile'}>
              {username}
            </Link>
            <Link className={classes.dropdown__item} to={'/settings'}>
              Настройки
            </Link>
            <button className={`${classes.dropdown__item} ${classes.dropdown__logout}`}>
              Выйти
            </button>
          </div>
        )}
      </li>
    </>
  );
};
