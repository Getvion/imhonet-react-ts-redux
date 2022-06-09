import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setListCatalog } from './listsCatalogSlice';

import classes from './ListsCatalogPopup.module.scss';
import { AuthInput, Button } from '../../components';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { setNotification } from '../notification/notificationSlice';
import { updateLists } from '../auth/userSlice';

interface IUserData {
  user: {
    userData: {
      email: string;
    };
    lists: {
      title: string;
      items: any;
    }[];
  };
}

export const ListsCatalogPopup = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const { userData, lists } = useSelector(({ user }: IUserData) => user);
  const isPopupShow = useSelector((state: { listsCatalog: boolean }) => state.listsCatalog);

  const onClosePopup = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      dispatch(setListCatalog(false));
    }
  };

  const onFomrSubmit = async (e: any) => {
    e.preventDefault();

    const docRef = doc(db, 'users', userData.email);
    const docSnap = await getDoc(docRef);
    const fetchData = docSnap.data();
    if (!fetchData) return null;

    await updateDoc(doc(db, 'users', userData.email), {
      lists: [...lists, { title: inputValue, items: [] }],
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно создан' })))
      .then(async () => {
        const docSnap = await getDoc(docRef);
        const fetchData = docSnap.data();
        dispatch(updateLists(fetchData?.lists));
      })
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));

    setInputValue('');
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
                  <Button onClick={() => {}} text='Добавить' state='accept' />
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
            <AuthInput setValue={setInputValue} placeholder={'Название списка...'} value={inputValue} />
            <Button text='Cоздать' onClick={onFomrSubmit} type={'submit'} />
          </form>
        </div>
      </div>
    </div>
  );
};