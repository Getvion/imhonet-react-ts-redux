import React from 'react';
import clsx from 'clsx';

import classes from './Button.module.scss';

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  state?: string;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({ onClick, type = 'button', text, state, disabled }) => (
  <button
    className={clsx(classes.button, {
      [classes.accept]: state === 'accept',
      [classes.reject]: state === 'reject',
      [classes.active]: state === 'active'
    })}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {text}
  </button>
);
