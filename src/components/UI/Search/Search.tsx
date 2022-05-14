import React, { useState } from 'react';

import { Button } from '../../';

import classes from './Search.module.scss';

interface ISearch {
  onClick: Function;
}

export const Search: React.FC<ISearch> = ({ onClick }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSumbit = (event: any) => {
    event.preventDefault();
    onClick(inputValue);
  };

  return (
    <form className={classes.form} onSubmit={handleSumbit}>
      <input
        className={classes.input}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <Button onClick={handleSumbit} type='submit' />
    </form>
  );
};
