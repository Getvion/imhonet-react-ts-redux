import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ThemeSwitcher } from '../../features/theme/ThemeSwitcher';

import { Dropdown } from '../UI/Dropdown/Dropdown';
import { Search } from '../UI/Search/Search';

import classes from './Header.module.scss';

export const Header = () => {
  const [currentPage, setCurrentPage] = useState(10);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const navArr = [
    { text: 'Игры', link: 'games' },
    { text: 'Фильмы', link: 'movies' },
    { text: 'Сериалы', link: 'shows' },
    { text: 'Книги', link: 'books' },
  ];

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to='/' className={classes.logo} onClick={() => setCurrentPage(-1)}>
          IMHONET
        </Link>
        <Search onClick={(value: string) => console.log(value)} />

        <Dropdown username='username' />
        <div className={classes.burger__button} onClick={() => setIsMenuVisible(!isMenuVisible)}>
          <span></span>
        </div>

        <nav className={clsx(classes.nav, { [classes.visible]: isMenuVisible })}>
          <div className={clsx(classes.nav__fade, { [classes.visible]: isMenuVisible })}></div>
          <ul className={classes.nav__list}>
            {navArr.map((obj, index) => (
              <li
                key={obj.text}
                className={clsx(classes.nav__item, { [classes.active]: currentPage === index })}
              >
                <Link
                  to={`/${obj.link}`}
                  onClick={() => {
                    setCurrentPage(index);
                    setIsMenuVisible(false);
                  }}
                >
                  <span className={classes.nav__link}>{obj.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};
