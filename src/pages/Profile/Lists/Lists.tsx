import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { Button, EmptyList, ListButtons, ListPopup, SectionCard } from '../../../components';

import { updateLists } from '../../../features/auth/userSlice';
import { setNotification } from '../../../features/notification/notificationSlice';

import { db } from '../../../firebase';

import { IItem } from '../../../@types/intefaces';
import { IState } from '../../../@types/state';

import classes from './Lists.module.scss';

interface IProps {
  lists: { items: IItem[]; title: string; description: string }[];
}

export const Lists: React.FC<IProps> = ({ lists }) => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [popupArray, setPopupArray] = useState<IItem[]>([]);
  const [popupTitle, setPopupTitle] = useState('');

  const { userData } = useSelector((state: IState) => state.user);

  const onShowList = (title: string) => {
    const foundArray = lists.find((list) => list.title === title)?.items;
    setPopupArray(foundArray || []);
    setPopupTitle(title);
    setShowPopup(true);
  };

  const onDeleteList = async (titleToRemove: string) => {
    const filteredArr = lists.filter((list) => list.title !== titleToRemove);

    await updateDoc(doc(db, 'users', userData.email), {
      lists: filteredArr
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно удален' })))
      .then(() => dispatch(updateLists(filteredArr)))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' }))
      );
  };

  const onDeleteItem = async (filteredArr: IItem[], listTitle: string) => {
    const newList = lists.map((list) => {
      if (list.title === listTitle) {
        return { ...list, items: filteredArr };
      }
      return list;
    });

    await updateDoc(doc(db, 'users', userData.email), {
      lists: newList
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Элемент успешно удален' })))
      .then(() => dispatch(updateLists(newList)))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' }))
      );
  };

  return (
    <div className={classes.lists}>
      {lists.length ? (
        <>
          {lists.map(({ items, title }) => (
            <section key={title} className={classes.section}>
              <div className={classes.section__top}>
                <h3 className={classes.section__title}>{title} </h3>
                {items.length ? (
                  <div className={classes.section__buttons}>
                    <ListButtons title={title} deleteButtonText='Удалить' onDelete={onDeleteList} />
                    <Button onClick={() => onShowList(title)} text='Все' />
                  </div>
                ) : null}
              </div>
              {items.length ? (
                <ul className={classes.section__list}>
                  {items.slice(0, 3).map(({ id, bgImg, name, nameOrig, section }) => (
                    <li key={id} className={classes.section__item}>
                      <SectionCard
                        id={id}
                        bgImage={bgImg}
                        name={name || nameOrig}
                        section={section}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyList text='Вы пока ничего не добавили в список' />
              )}
              {showPopup && (
                <ListPopup
                  itemsArr={popupArray}
                  title={popupTitle}
                  setShowPopup={setShowPopup}
                  onDeleteItem={onDeleteItem}
                />
              )}
            </section>
          ))}
        </>
      ) : (
        <EmptyList text='Вы пока не создали ни одного списка' />
      )}
    </div>
  );
};
