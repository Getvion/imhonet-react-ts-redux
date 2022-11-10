import React, { useState } from 'react';
import { Button } from '../UI/Button/Button';

import classes from './Pagination.module.scss';

interface IProps {
  onClick?: any;
}

export const Pagination: React.FC<IProps> = ({ onClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onButtonClick = (pageNubmer: number) => {
    onClick(pageNubmer);
    setCurrentPage(pageNubmer);
  };

  return (
    <div className={classes.pagination}>
      <Button onClick={() => onButtonClick(currentPage - 1)} text='←' disabled={currentPage < 2} />
      {currentPage > 1 && (
        <Button onClick={() => onButtonClick(currentPage - 1)} text={String(currentPage - 1)} />
      )}
      <Button onClick={() => {}} text={String(currentPage)} state='active' />
      <Button onClick={() => onButtonClick(currentPage + 1)} text={String(currentPage + 1)} />
      {currentPage < 2 && (
        <Button onClick={() => onButtonClick(currentPage + 2)} text={String(currentPage + 2)} />
      )}
      <Button onClick={() => onButtonClick(currentPage + 1)} text='→' />
    </div>
  );
};
