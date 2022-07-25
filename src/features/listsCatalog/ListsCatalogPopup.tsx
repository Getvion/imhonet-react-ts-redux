/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { setCatalogListOpen } from './listsCatalogSlice';

import classes from './ListsCatalogPopup.module.scss';
import { Input, Button } from '../../components';
import { IItem } from '../../intefaces';

import { db } from '../../firebase';
import { setNotification } from '../notification/notificationSlice';
import { updateLists } from '../auth/userSlice';

interface IUserData {
  user: {
    userData: { email: string };
    lists: ILists[];
  };
}

interface ILists {
  title: string;
  items: IItem[];
}

interface IListsCatalog {
  listsCatalog: {
    isOpen: boolean;
    name: string;
    bgImg: string;
    id: number;
    nameOrig: string;
    section: string;
  };
}

export const ListsCatalogPopup = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const { userData, lists } = useSelector(({ user }: IUserData) => user);
  const listsCatalog = useSelector((state: IListsCatalog) => state.listsCatalog);
  const { isOpen, name, bgImg, id, nameOrig, section } = listsCatalog;

  const onClosePopup = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      dispatch(setCatalogListOpen(false));
      setInputValue('');
    }
  };

  const onAddElementToList = async (title: string) => {
    const newArr = lists.map((list: ILists) => {
      if (list.title === title) {
        const isAlreadyAdded = list.items.find((item) => item.name === name);

        if (isAlreadyAdded) {
          dispatch(
            setNotification({ type: 'warning', text: 'Уже был добавлен ранее в этот список' })
          );
        } else {
          dispatch(setNotification({ type: 'success', text: 'Успешно добавлено в список' }));
          return { ...list, items: [...list.items, { id, name, nameOrig, bgImg, section }] };
        }
      }

      return list;
    });

    dispatch(updateLists(newArr));
    await updateDoc(doc(db, 'users', userData.email), {
      lists: newArr
    }).catch(() =>
      dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' }))
    );
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    if (inputValue === '') {
      return dispatch(setNotification({ type: 'warning', text: 'Сначала дайте название списку' }));
    }

    const docRef = doc(db, 'users', userData.email);

    await updateDoc(doc(db, 'users', userData.email), {
      lists: [...lists, { title: inputValue, items: [] }]
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно создан' })))
      .then(() => setInputValue(''))
      .then(async () => {
        const docSnap = await getDoc(docRef);
        const fetchData = docSnap.data();
        dispatch(updateLists(fetchData?.lists));
      })
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' }))
      );
  };

  return (
    <div className={clsx(classes.modal, { [classes.open]: isOpen })} onClick={onClosePopup}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__content}>
          {lists.length ? (
            <ul className={classes.modal__catalog}>
              {lists.map(({ title }) => (
                <li key={title} className={classes.modal__catalog__item}>
                  <p className={classes.modal__title}>{title}</p>
                  <Button
                    onClick={() => onAddElementToList(title)}
                    text='Добавить'
                    state='accept'
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes.modal__empty}>
              Вы пока еще не создали ни одного списка <br />
              Cкорее сделайте это с помощью формы ниже!
            </p>
          )}
          <form className={classes.modal__form} onSubmit={onFormSubmit}>
            <Input setValue={setInputValue} placeholder='Название списка...' value={inputValue} />
            <Button text='Cоздать' onClick={onFormSubmit} type='submit' />
          </form>
        </div>
      </div>
    </div>
  );
};
