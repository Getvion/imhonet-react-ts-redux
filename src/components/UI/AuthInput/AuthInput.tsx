import React from 'react';

import classes from './AuthInput.module.scss';

interface InputProps {
  type?: string;
  placeholder: string;
  setValue: Function;
  value: string;
}

export const AuthInput: React.FC<InputProps> = ({ type, placeholder, setValue, value }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      type={type ? type : 'text'}
      className={classes.input}
      placeholder={placeholder}
    />
  );
};
