import React, { useState } from 'react';

import { ListButtons, SectionCard } from '../index';
import { IItem } from '../../@types/intefaces';

import classes from './ListPopup.module.scss';

interface IProps {
  setShowPopup: (value: string) => void;
  itemsArr: IItem[];
  title: string;
  onDeleteItem: (filteredArr: IItem[], listTitle: string) => Promise<void>;
}

export const ListPopup: React.FC<IProps> = ({ itemsArr, setShowPopup, title, onDeleteItem }) => {
  const [filteredArr, setFilteredArr] = useState(itemsArr);

  const onDeleteItemFromList = async (nameToDelete: string) => {
    const filteredArrByName = itemsArr.filter((item: IItem) => item.name !== nameToDelete);
    onDeleteItem(filteredArrByName, title);
    setFilteredArr(filteredArrByName);
    setShowPopup('');
  };

  const onClosePopup = () => {
    setShowPopup('');
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modal__dialog}>
        <button onClick={onClosePopup} className={classes.modal__close}>
          x
        </button>
        <h3 className={classes.modal__title}>{title}</h3>
        <div className={classes.modal__content}>
          {filteredArr.map(({ id, bgImg, name, nameOrig, section }: IItem) => (
            <div className={classes.modal__element} key={id}>
              <SectionCard id={id} bgImage={bgImg} name={name || nameOrig} section={section} />
              <div className={classes.modal__delete}>
                <ListButtons
                  title={name}
                  deleteButtonText='Удалить'
                  onDelete={onDeleteItemFromList}
                  openFrom='popup'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
