import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '../../';
import { setSearch } from '../../../features/search/searchSlice';

import classes from './Search.module.scss';

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleSumbit = (event: any) => {
    event.preventDefault();
    if (inputValue) {
      dispatch(setSearch(inputValue));
      navigate('/search/games');
      setInputValue('');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSumbit}>
      <Input
        placeholder={'Grand Theft Auto 5'}
        value={inputValue}
        setValue={(value: string) => setInputValue(value)}
      />
      <Button text='Поиск' onClick={handleSumbit} type='submit' />
    </form>
  );
};
