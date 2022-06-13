import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { Button, EmptyList, ListButtons, ListPopup, SectionCard } from '../../../components';
import { updateLists } from '../../../features/auth/userSlice';
import { setNotification } from '../../../features/notification/notificationSlice';
import { db } from '../../../firebase';

import classes from './Lists.module.scss';

interface ILists {
  lists: { items: IItem[]; title: string; description: string }[];
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

interface IUserData {
  user: {
    userData: { email: string };
    lists: ILists[];
  };
}

export const Lists: React.FC<ILists> = ({ lists }) => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState('');
  const [popupArray, setPopupArray] = useState<any>([]);
  const [popupTitle, setPopupTitle] = useState('');

  const { userData } = useSelector(({ user }: IUserData) => user);

  const onShowList = (title: string) => {
    const foundArray = lists.find((list) => list.title === title)?.items;
    setPopupArray(foundArray);
    setPopupTitle(title);
    setShowPopup('true');
  };

  const onDeleteLIst = async (titleToRemove: string) => {
    const filteredArr = lists.filter((list) => list.title !== titleToRemove);

    await updateDoc(doc(db, 'users', userData.email), {
      lists: filteredArr,
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно удален' })))
      .then(() => dispatch(updateLists(filteredArr)))
      .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  return (
    <div className={classes.lists}>
      {lists.length ? (
        <>
          {lists.map(({ items, title, description }) => (
            <section key={title} className={classes.section}>
              <div className={classes.section__top}>
                <h3 className={classes.section__title}>{title} </h3>
                {items.length ? (
                  <div className={classes.section__buttons}>
                    <ListButtons title={title} deleteButtonText='Удалить список' onDelete={onDeleteLIst} />
                    <Button onClick={() => onShowList(title)} text='Показать все' />
                  </div>
                ) : null}
              </div>
              {items.length ? (
                <ul className={classes.section__list}>
                  {items.slice(0, 3).map(({ id, bgImg, name, nameOrig, section }) => (
                    <li key={id} className={classes.section__item}>
                      <SectionCard id={id} bgImage={bgImg} name={name || nameOrig} section={section} />
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
                  descr={description}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
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
