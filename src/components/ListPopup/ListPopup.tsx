import React from 'react';

import { SectionCard } from '../SectionCard/SectionCard';

import classes from './ListPopup.module.scss';

interface PopupProps {
  showPopup: string;
  setShowPopup: Function;
  itemsArr: any;
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section: string;
}

export const ListPopup: React.FC<PopupProps> = ({ itemsArr, setShowPopup, showPopup }) => {
  const onPopupClose = (e: any) => {
    const isOutsideClick = e.target.classList.contains(classes.modal);
    if (isOutsideClick) {
      setShowPopup('');
    }
  };

  return (
    <div className={classes.modal} onClick={onPopupClose}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__content}>
          {itemsArr.map(({ id, bgImg, name, nameOrig, section }: IItem) => (
            <SectionCard
              key={id}
              id={id}
              bgImage={bgImg}
              name={name || nameOrig}
              section={section || showPopup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
