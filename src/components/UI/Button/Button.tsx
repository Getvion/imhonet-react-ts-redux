import React from 'react';

import classes from './Button.module.scss';

interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  text: string;
}

export const Button: React.FC<IButton> = ({ onClick, type, text }) => {
  return (
    <button className={classes.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};
