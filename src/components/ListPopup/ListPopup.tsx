import React, { useState } from 'react';

import { ListButtons, SectionCard } from '../index';

import classes from './ListPopup.module.scss';

interface IProps {
  setShowPopup: Function;
  itemsArr: IItem[];
  title: string;
  descr?: string;
  onDeleteItem: Function;
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

export const ListPopup: React.FC<IProps> = ({ itemsArr, setShowPopup, title, descr, onDeleteItem }) => {
  const [filteredArr, setFilteredArr] = useState(itemsArr);

  const onPopupClose = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      setShowPopup(false);
    }
  };

  const onDeleteItemFromList = async (nameToDelete: string) => {
    const filteredArrByName = itemsArr.filter((item: IItem) => item.name !== nameToDelete);
    onDeleteItem(filteredArrByName, title);
    setFilteredArr(filteredArrByName);
    setShowPopup(false);
  };

  return (
    <div className={classes.modal} onClick={onPopupClose}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__text}>
          <h3 className={classes.modal__title}>{title}</h3>
          {descr ? <span className={classes.modal__descr}>{descr}</span> : null}
        </div>
        <div className={classes.modal__content}>
          {filteredArr.map(({ id, bgImg, name, nameOrig, section }: IItem) => (
            <div className={classes.modal__element} key={id}>
              <SectionCard id={id} bgImage={bgImg} name={name || nameOrig} section={section} />

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
