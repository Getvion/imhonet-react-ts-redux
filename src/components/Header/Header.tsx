import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

export const Header = () => {
  const [currentPage, setCurrentPage] = useState(10);

  const navArr = [
    { text: 'USERNAME', link: 'profile' },
    { text: 'Игры', link: 'games' },
    { text: 'Фильмы', link: 'movies' },
    { text: 'Сериалы', link: 'shows' },
    { text: 'Книги', link: 'books' },
    { text: 'Музыка', link: 'music' },
  ];

  return (
    <div className={classes.container}>
      <Link to='/' className={classes.logo} onClick={() => setCurrentPage(-1)}>
        IMHONET
      </Link>
      <nav className={classes.nav}>
        <ul className={classes.nav__list}>
          {navArr.map((obj, index) => (
            <li
              key={obj.text}
              onClick={() => setCurrentPage(index)}
              className={clsx(classes.nav__item, { [classes.active]: currentPage === index })}
            >
              <Link className={classes.nav__link} to={`/${obj.link}`}>
                {obj.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
