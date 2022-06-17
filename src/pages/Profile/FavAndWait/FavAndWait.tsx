import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { Button, EmptyList, SectionCard, ListPopup } from '../../../components';
import { IItem, IUserData } from '../../../intefaces';
import { updateFavoriteContent, updateWaitingContent } from '../../../features/auth/userSlice';
import { setNotification } from '../../../features/notification/notificationSlice';
import { db } from '../../../firebase';

import classes from './FavAndWait.module.scss';

interface IProps {
  itemsArr: { title: string; items: IItem[] }[];
  dbSection: string;
}

export const FavAndWait: React.FC<IProps> = ({ itemsArr, dbSection }) => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [popupArray, setPopupArray] = useState<any>([]);
  const [popupTitle, setPopupTitle] = useState('');

  const { userData, favoriteContent, waitingContent } = useSelector(({ user }: IUserData) => user);

  const onShowList = (title: string) => {
    const foundArray = itemsArr.find((item) => item.title === title)?.items;
    setPopupArray(foundArray);
    setPopupTitle(title);
    setShowPopup(true);
  };

  const onDeleteContent = (contentType: { title: string }[], listTitle: string, filteredArr: IItem[]) => {
    return contentType.map((element) => {
      if (element.title === listTitle) {
        return { ...element, items: filteredArr };
      }
      return element;
    });
  };

  const onDeleteItem = async (filteredArr: IItem[], listTitle: string) => {
    if (dbSection === 'favoriteContent') {
      const newList = onDeleteContent(favoriteContent, listTitle, filteredArr);

      await updateDoc(doc(db, 'users', userData.email), {
        favoriteContent: newList,
      })
        .then(() => dispatch(setNotification({ type: 'success', text: 'Элемент успешно удален' })))
        .then(() => dispatch(updateFavoriteContent(newList)));
    } else {
      const newList = onDeleteContent(waitingContent, listTitle, filteredArr);

      await updateDoc(doc(db, 'users', userData.email), {
        waitingContent: newList,
      })
        .then(() => dispatch(setNotification({ type: 'success', text: 'Элемент успешно удален' })))
        .then(() => dispatch(updateWaitingContent(newList)));
    }
  };

  return (
    <>
      {itemsArr.map(({ title, items }) => (
        <section className={classes.section} key={title}>
          <div className={classes.section__top}>
            <h3 className={classes.section__title}>{title}</h3>
            {items.length ? <Button onClick={() => onShowList(title)} text='Показать все' /> : null}
          </div>
          {items.length ? (
            <ul className={classes.section__list}>
              {items.slice(0, 4).map(({ id, bgImg, name, section }: IItem) => (
                <li key={id} className={classes.section__item}>
                  <SectionCard id={id} bgImage={bgImg} name={name} section={section} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyList text={'Вы не добавили ничего в список'} />
          )}
          {showPopup && (
            <ListPopup
              setShowPopup={setShowPopup}
              itemsArr={popupArray}
              title={popupTitle}
              onDeleteItem={onDeleteItem}
            />
          )}
        </section>
      ))}
    </>
  );
};
