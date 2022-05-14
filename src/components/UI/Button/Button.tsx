import React from 'react';

import classes from './Button.module.scss';

interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<IButton> = ({ onClick, type }) => {
  return (
    <button className={classes.button} onClick={onClick} type={type}>
      Поиск
    </button>
  );
};
