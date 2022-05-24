import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../';
import { setSearch } from '../../../features/search/searchSlice';

import classes from './Search.module.scss';

interface ISearch {
  onClick: Function;
}

export const Search: React.FC<ISearch> = ({ onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleSumbit = (event: any) => {
    event.preventDefault();
    if (inputValue) {
      dispatch(setSearch(inputValue));
      navigate('/search');
      setInputValue('');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSumbit}>
      <input
        className={classes.input}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder={'Grand Theft Auto 5'}
      />
      <Button text='Поиск' onClick={handleSumbit} type='submit' />
    </form>
  );
};
