import React from 'react';

import classes from './Input.module.scss';

interface IProps {
  type?: string;
  placeholder: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IProps> = ({
  type = 'text',
  placeholder,
  setValue,
  value,
  name,
  onBlur
}) => (
  <input
    value={value}
    onChange={setValue}
    required
    type={type}
    className={classes.input}
    placeholder={placeholder}
    name={name}
    onBlur={onBlur}
  />
);
