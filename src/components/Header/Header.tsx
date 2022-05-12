import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ThemeSwitcher } from '../../features/theme/ThemeSwitcher';

import classes from './Header.module.scss';
import { Dropdown } from '../UI/Dropdown/Dropdown';

export const Header = () => {
  const [currentPage, setCurrentPage] = useState(10);

  const navArr = [
    { text: 'Игры', link: 'games' },
    { text: 'Фильмы', link: 'movies' },
    { text: 'Сериалы', link: 'shows' },
    { text: 'Книги', link: 'books' },
  ];

  return (
    <div className={classes.container}>
      <Link to='/' className={classes.logo} onClick={() => setCurrentPage(-1)}>
        IMHONET
      </Link>
      <nav className={classes.nav}>
        <ul className={classes.nav__list}>
          <Dropdown username='username' />
          {navArr.map((obj, index) => (
            <li
              key={obj.text}
              className={clsx(classes.nav__item, { [classes.active]: currentPage === index })}
            >
              <Link to={`/${obj.link}`} onClick={() => setCurrentPage(index)}>
                <span className={classes.nav__link}>{obj.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ThemeSwitcher />
        <div className={classes.user}>
          <Link to='/auth' className={classes.user__login}>
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};
