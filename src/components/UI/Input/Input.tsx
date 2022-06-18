import React from 'react';

import classes from './Input.module.scss';

interface IProps {
  type?: string;
  placeholder: string;
  setValue: Function;
  value: string;
}

export const Input: React.FC<IProps> = ({ type = 'text', placeholder, setValue, value }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      type={type}
      className={classes.input}
      placeholder={placeholder}
    />
  );
};
