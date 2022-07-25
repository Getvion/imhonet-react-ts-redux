import React from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  state?: string;
}

export const Button: React.FC<IProps> = ({ onClick, type = 'button', text, state }) => (
  <button
    className={clsx(classes.button, {
      [classes.accept]: state === 'accept',
      [classes.reject]: state === 'reject'
    })}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);
