import React, { useState } from 'react';
import clsx from 'clsx';

import { Button } from '../index';

import classes from './ListButtons.module.scss';

interface IProps {
  title: string;
  deleteButtonText: string;
  onDelete: Function;
  openFrom?: string;
}

export const ListButtons: React.FC<IProps> = ({ title, deleteButtonText, onDelete, openFrom }) => {
  const [confirmShowPopup, setConfirmShowPopup] = useState(false);

  return (
    <div className={clsx(classes.delete__container, { [classes.open__from__popup]: openFrom === 'popup' })}>
      <Button onClick={() => setConfirmShowPopup(true)} text={deleteButtonText} state='reject' />
      {confirmShowPopup && (
        <div className={classes.delete}>
          <span className={classes.delete__text}>
            Вы уверены, что хотите удалить? Отменить это дейсвтие будет <span>нельзя</span>
          </span>
          <div className={classes.delete__buttons}>
            <Button onClick={() => onDelete(title)} text='Да' state='reject' />
            <Button onClick={() => setConfirmShowPopup(false)} text='Нет' state='accept' />
          </div>
        </div>
      )}
    </div>
  );
};
