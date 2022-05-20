import React from 'react';

import classes from './Movie.module.scss';

interface IMovieListItem {
  description: string;
  content: string | number | string[];
}

export const MovieListItem: React.FC<IMovieListItem> = ({ description, content }) => {
  return (
    <li className={classes.movie__list_item}>
      <span className={classes.movie__list_descr}>{description}</span>
      <span className={classes.movie__list_content}>{content}</span>
    </li>
  );
};
