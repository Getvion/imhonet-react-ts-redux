import React from 'react';

import classes from './Game.module.scss';

interface IProps {
  description: string;
  content: string | number | string[];
}

export const GameListItem: React.FC<IProps> = ({ description, content }) => {
  return (
    <li className={classes.game__list_item}>
      <span className={classes.game__list_descr}>{description}</span>
      <span className={classes.game__list_content}>{content}</span>
    </li>
  );
};
