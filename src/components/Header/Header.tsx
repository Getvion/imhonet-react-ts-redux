import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { ThemeSwitcher } from '../../features/theme/ThemeSwitcher';
import { emptyGameState } from '../../features/games/loadGameInfoSlice';
import { emptyMovieState } from '../../features/movies/loadMovieInfoSlice';

import { useWindowDimensions } from '../../hooks';

import { Dropdown } from '../UI/Dropdown/Dropdown';
import { Search } from '../UI/Search/Search';

import classes from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(10);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { windowWidth } = useWindowDimensions();

  const navArr = [
    { text: 'Игры', link: 'games' },
    { text: 'Фильмы', link: 'movies' },
    // { text: 'Сериалы', link: 'shows' },
    // { text: 'Книги', link: 'books' },
  ];

  const onLinkClick = (index: number) => {
    setCurrentPage(index);
    setIsMenuVisible(false);
  };

  const onLogoClick = () => {
    setCurrentPage(-1);
    dispatch(emptyMovieState());
    dispatch(emptyGameState());
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to='/' className={classes.logo} onClick={onLogoClick}>
          IMHONET
        </Link>
        {windowWidth > 600 ? <Search /> : null}
        <Dropdown />
        <div
          className={clsx(classes.burger__button, { [classes.visible]: isMenuVisible })}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          <span className={classes.burger__line}></span>
          <span className={classes.burger__line}></span>
          <span className={classes.burger__line}></span>
        </div>
        <div
          onClick={() => setIsMenuVisible(!isMenuVisible)}
          className={clsx(classes.nav__fade, { [classes.visible]: isMenuVisible })}
        ></div>
        <nav className={clsx(classes.nav, { [classes.visible]: isMenuVisible })}>
          {windowWidth < 600 ? <Search /> : null}
          <ul className={classes.nav__list}>
            {navArr.map((obj, index) => (
              <li
                key={obj.text}
                className={clsx(classes.nav__item, { [classes.active]: currentPage === index })}
              >
                <Link to={`/${obj.link}`} onClick={() => onLinkClick(index)} className={classes.nav__link}>
                  {obj.text}
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
