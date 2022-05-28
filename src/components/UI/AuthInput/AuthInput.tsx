import React, { useState } from 'react';

import classes from './AuthInput.module.scss';

interface InputProps {
  type?: string;
  placeholder: string;
  onChange: Function;
}

export const AuthInput: React.FC<InputProps> = ({ type, placeholder, onChange }) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <input
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      required
      type={type ? type : 'text'}
      className={classes.input}
      placeholder={placeholder}
    />
  );
};
