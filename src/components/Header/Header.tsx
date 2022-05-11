import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { GlobalSvgSelector } from '../../assets/icons/SvgSelector';

import classes from './Header.module.scss';

interface IHeader {
  theme: string;
  setTheme: Function;
  isUserLogined: boolean;
  setIsUserLogined: Function;
}

export const Header: React.FC<IHeader> = ({
  theme,
  setTheme,
  isUserLogined,
  setIsUserLogined,
}: IHeader) => {
  const [currentPage, setCurrentPage] = useState(10);

  const navArr = [
    { text: 'USERNAME', link: 'profile' },
    { text: 'Игры', link: 'games' },
    { text: 'Фильмы', link: 'movies' },
    { text: 'Сериалы', link: 'shows' },
    { text: 'Книги', link: 'books' },
  ];

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={classes.container}>
      <Link to='/' className={classes.logo} onClick={() => setCurrentPage(-1)}>
        IMHONET
      </Link>
      <nav className={classes.nav}>
        <ul className={classes.nav__list}>
          {navArr.map((obj, index) => (
            <Link
              key={obj.text}
              to={`/${obj.link}`}
              onClick={() => setCurrentPage(index)}
              className={clsx(classes.nav__item, { [classes.active]: currentPage === index })}
            >
              <span className={classes.nav__link}>{obj.text}</span>
            </Link>
          ))}
        </ul>
        <div onClick={changeTheme} className={classes.nav__theme}>
          {theme === 'light' ? <GlobalSvgSelector id='moon' /> : <GlobalSvgSelector id='sun' />}
        </div>
        <div className={classes.user}>
          {isUserLogined ? (
            <div className={classes.user__avatar} onClick={() => setIsUserLogined(!isUserLogined)}>
              H
            </div>
          ) : (
            <Link to='/auth' className={classes.user__login}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
