import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { doc, updateDoc } from 'firebase/firestore';
import { updateLists } from '../../features/auth/userSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import { db } from '../../firebase';

import { ListButtons, SectionCard } from '../index';

import classes from './ListPopup.module.scss';

interface IProps {
  showPopup: string;
  setShowPopup: Function;
  itemsArr: any;
  title: string;
  descr?: string;
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

interface ILists {
  lists: { items: IItem[]; title: string; description: string }[];
}

interface IUserData {
  user: {
    userData: { email: string };
    lists: ILists[];
  };
}

export const ListPopup: React.FC<IProps> = ({ itemsArr, setShowPopup, showPopup, title, descr }) => {
  const dispatch = useDispatch();

  const [filteredArr, setFilteredArr] = useState(itemsArr);
  const { userData, lists } = useSelector(({ user }: IUserData) => user);

  const onPopupClose = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      setShowPopup('');
    }
  };

  const onDeleteItemFromList = (nameToDelete: string) => {
    const filteredArrByName = itemsArr.filter((item: IItem) => item.name !== nameToDelete);
    console.log(filteredArrByName);
    console.log(lists);
  };

  const onDeleteLIst = async (titleToRemove: string) => {
    // const filteredArr = lists.filter((list) => list.title !== titleToRemove);
    // setIsConfirmPopupShow(false);
    // await updateDoc(doc(db, 'users', userData.email), {
    // lists: filteredArr,
    // })
    // .then(() => dispatch(setNotification({ type: 'success', text: 'Список успешно удален' })))
    // .then(() => dispatch(updateLists(filteredArr)))
    // .catch(() => dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка, попробуйте снова' })));
  };

  return (
    <div className={classes.modal} onClick={onPopupClose}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__text}>
          <h3 className={classes.modal__title}>{title}</h3>
          {descr ? <span className={classes.modal__descr}>{descr}</span> : null}
        </div>
        <div className={classes.modal__content}>
          {itemsArr.map(({ id, bgImg, name, nameOrig, section }: IItem) => (
            <div className={classes.modal__element} key={id}>
              <SectionCard id={id} bgImage={bgImg} name={name || nameOrig} section={section || showPopup} />

              <div className={classes.modal__delete}>
                <ListButtons
                  title={name}
                  deleteButtonText='Удалить'
                  onDelete={onDeleteItemFromList}
                  openFrom={'popup'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
