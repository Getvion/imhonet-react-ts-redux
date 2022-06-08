import React from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  state?: string;
}

export const Button: React.FC<IButton> = ({ onClick, type, text, state = 'default' }) => {
  return (
    <button
      className={clsx(classes.button, {
        [classes.default]: state === 'default',
        [classes.accept]: state === 'accept',
        [classes.reject]: state === 'reject',
      })}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
