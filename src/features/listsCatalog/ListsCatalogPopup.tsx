import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setListCatalog } from './listsCatalogSlice';

import classes from './ListsCatalogPopup.module.scss';
import { AuthInput, Button } from '../../components';

interface ILists {
  user: {
    lists: {
      title: string;
      items: {}[];
    }[];
  };
}

export const ListsCatalogPopup = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const isPopupShow = useSelector((state: { listsCatalog: boolean }) => state.listsCatalog);
  const lists = useSelector((state: ILists) => state.user.lists);

  const onClosePopup = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      dispatch(setListCatalog(false));
    }
  };

  const onFomrSubmit = (e: any) => {
    e.preventDefault();

    console.log(inputValue);
  };

  return (
    <div className={clsx(classes.modal, { [classes.open]: isPopupShow })} onClick={onClosePopup}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__content}>
          {lists.length ? (
            <ul className={classes.modal__catalog}>
              {lists.map(({ title }) => (
                <li key={title} className={classes.modal__catalog__item}>
                  <p className={classes.modal__title}>{title}</p>
                  <div className={classes.modal__buttons}>
                    <Button onClick={() => {}} text='Добавить' state='accept' />
                    <Button onClick={() => {}} text='Удалить' state='reject' />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes.modal__empty}>
              Вы пока еще не создали ни одного списка <br />
              Cкорее сделайте это с помощью формы ниже!
            </p>
          )}
          <form className={classes.modal__form} onSubmit={onFomrSubmit}>
            <AuthInput onChange={(value: string) => setInputValue(value)} placeholder={'Название списка'} />
            <Button text='Cоздать' onClick={onFomrSubmit} type={'submit'} />
          </form>
        </div>
      </div>
    </div>
  );
};
