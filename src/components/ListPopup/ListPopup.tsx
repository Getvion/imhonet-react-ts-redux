import React from 'react';

import { SectionCard } from '../SectionCard/SectionCard';

import classes from './ListPopup.module.scss';

interface PopupProps {
  showPopup: string;
  setShowPopup: Function;
  itemsArr: any;
}

interface IGame {
  itemsArr: { id: number; name: string; background_image: string }[];
}

interface IMovie {
  itemsArr: { filmId: number; nameRu: string; nameEn: string; posterUrlPreview: string }[];
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
        {showPopup === 'games' && <GamesContent itemsArr={itemsArr} />}
        {showPopup === 'movies' && <MoviesContent itemsArr={itemsArr} />}
      </div>
    </div>
  );
};

const MoviesContent: React.FC<IMovie> = ({ itemsArr }) => {
  return (
    <div className={classes.modal__content}>
      {itemsArr.map((obj: any) => (
        <SectionCard
          key={obj.filmId}
          id={obj.filmId}
          bgImage={obj.posterUrlPreview}
          name={obj.nameRu || obj.nameEn}
          section={'movies'}
        />
      ))}
    </div>
  );
};

const GamesContent: React.FC<IGame> = ({ itemsArr }) => {
  return (
    <div className={classes.modal__content}>
      {itemsArr.map((obj: any) => (
        <SectionCard
          key={obj.id}
          id={obj.id}
          bgImage={obj.background_image}
          name={obj.name}
          section={'games'}
        />
      ))}
    </div>
  );
};
