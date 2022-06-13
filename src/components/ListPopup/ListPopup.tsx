import React, { useState } from 'react';

import { SectionCard } from '../SectionCard/SectionCard';
import { Button } from '../UI/Button/Button';

import classes from './ListPopup.module.scss';

interface PopupProps {
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

export const ListPopup: React.FC<PopupProps> = ({ itemsArr, setShowPopup, showPopup, title, descr }) => {
  // const [filteredArr, setFilteredArr] = useState(itemsArr);

  const onPopupClose = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      setShowPopup('');
    }
  };

  // const onDeleteItemFromList = (nameToDelete: string) => {
  //   const filteredArr = itemsArr.filter((item: IItem) => item.name !== nameToDelete);

  //   setFilteredArr(filteredArr);
  //   // после удаления надо пушить все обратно в lists
  // };

  return (
    <div className={classes.modal} onClick={onPopupClose}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__text}>
          <h3 className={classes.modal__title}>{title}</h3>
          {descr ? <span className={classes.modal__descr}>{descr}</span> : null}
        </div>
        <div className={classes.modal__content}>
          {itemsArr.map(({ id, bgImg, name, nameOrig, section }: IItem) => (
            <div className={classes.modal__element}>
              <SectionCard
                key={id}
                id={id}
                bgImage={bgImg}
                name={name || nameOrig}
                section={section || showPopup}
              />
              {/* <div className={classes.modal__delete}>
                <Button onClick={() => onDeleteItemFromList(name)} text='Удалить' state='reject' />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
