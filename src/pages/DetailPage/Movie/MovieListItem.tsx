import React from 'react';

import classes from './Movie.module.scss';

interface IProps {
  description: string;
  content: string | number | string[];
}

export const MovieListItem: React.FC<IProps> = ({ description, content }) => (
  <li className={classes.movie__list_item}>
    <span className={classes.movie__list_descr}>{description}</span>
    <span className={classes.movie__list_content}>{content}</span>
  </li>
);
