import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { Button, SectionCard, ListPopup, EmptyList } from '../../../../components';

import { IItem } from '../../../../@types/intefaces';

import {
  selectUser,
  updateFavoriteContent,
  updateWaitingContent
} from '../../../../features/auth/userSlice';
import { setNotification } from '../../../../features/notification/notificationSlice';

import { db } from '../../../../firebase';

import classes from './FavAndWait.module.scss';

interface IProps {
  itemsArr: { title: string; items: IItem[] }[];
  dbSection: string;
}

export const FavAndWait: React.FC<IProps> = ({ itemsArr, dbSection }) => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState('');
  const [popupArray, setPopupArray] = useState<IItem[]>([]);
  const [popupTitle, setPopupTitle] = useState('');

  const { userData, favoriteContent, waitingContent } = useSelector(selectUser);

  const onShowList = (title: string) => {
    const foundArray = itemsArr.find((list) => list.title === title)?.items;
    setPopupArray(foundArray || []);
    setPopupTitle(title);
    setShowPopup(title);
  };

  const onDeleteContent = (
    contentType: { title: string }[],
    listTitle: string,
    filteredArr: IItem[]
  ) =>
    contentType.map((element) =>
      element.title === listTitle ? { ...element, items: filteredArr } : element
    );

  const onDeleteItem = async (filteredArr: IItem[], listTitle: string) => {
    if (dbSection === 'favorite') {
      const newList = onDeleteContent(favoriteContent, listTitle, filteredArr);

      await updateDoc(doc(db, 'users', userData.email), { favoriteContent: newList })
        .then(() => dispatch(setNotification({ type: 'success', text: 'Элемент успешно удален' })))
        .then(() => dispatch(updateFavoriteContent(newList)));
    } else {
      const newList = onDeleteContent(waitingContent, listTitle, filteredArr);

      await updateDoc(doc(db, 'users', userData.email), { waitingContent: newList })
        .then(() => dispatch(setNotification({ type: 'success', text: 'Элемент успешно удален' })))
        .then(() => dispatch(updateWaitingContent(newList)));
    }
  };

  return (
    <>
      {itemsArr.map(({ title, items }) => (
        <div key={title}>
          {items.length ? (
            <section className={classes.section} key={title}>
              <div className={classes.section__top}>
                <h3 className={classes.section__title}>{title}</h3>
                <Button onClick={() => onShowList(title)} text='Все' />
              </div>
              <ul className={classes.section__list}>
                {items.slice(0, 4).map(({ id, bgImg, name, section }: IItem) => (
                  <li key={id} className={classes.section__item}>
                    <SectionCard id={id} bgImage={bgImg} name={name} section={section} />
                  </li>
                ))}
              </ul>
              {showPopup === title && (
                <ListPopup
                  itemsArr={popupArray}
                  title={popupTitle}
                  setShowPopup={setShowPopup}
                  onDeleteItem={onDeleteItem}
                />
              )}
            </section>
          ) : (
            <EmptyList text='Вы пока ничего не добавили в список' />
          )}
        </div>
      ))}
    </>
  );
};
