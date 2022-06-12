import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { updateLists } from '../../features/auth/userSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import { db } from '../../firebase';

import { Button } from '../UI/Button/Button';

import classes from './ListButtons.module.scss';

interface IProps {
  title: string;
  setShowPopup: Function;
  setPopupArray: Function;
}

interface IUserData {
  user: {
    userData: { email: string };
    lists: ILists[];
  };
}

interface ILists {
  title: string;
  items: { name: string; bgImg: string; id: number; nameOrig: string; section: string }[];
}

export const ListButtons: React.FC<IProps> = ({ title, setShowPopup, setPopupArray }) => {
  const dispatch = useDispatch();
  const [isConfirmPopupShow, setIsConfirmPopupShow] = useState(false);

  const { userData, lists } = useSelector(({ user }: IUserData) => user);

  const onShowList = (title: string) => {
    const foundArray = lists.find((list) => list.title === title)?.items;
    setPopupArray(foundArray);
    setShowPopup(true);
  };

  const onDeleteLIst = async (titleToRemove: string) => {
    const filteredArr = lists.filter((list) => list.title !== titleToRemove);
    setIsConfirmPopupShow(false);

    await updateDoc(doc(db, 'users', userData.email), {
      lists: filteredArr,
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно удален' })))
      .then(() => dispatch(updateLists(filteredArr)))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  return (
    <div className={classes.section}>
      <Button onClick={() => setIsConfirmPopupShow(true)} text='Удалить список' state='reject' />
      <Button onClick={() => onShowList(title)} text='Показать все' />
      {isConfirmPopupShow && (
        <div className={classes.delete}>
          <span className={classes.delete__text}>
            Вы уверены, что хотите удалить список? Отменить это дейсвтие будет <span>нельзя</span>
          </span>
          <div className={classes.delete__buttons}>
            <Button onClick={() => onDeleteLIst(title)} text='Да' state='reject' />
            <Button onClick={() => setIsConfirmPopupShow(false)} text='Нет' state='accept' />
          </div>
        </div>
      )}
    </div>
  );
};
