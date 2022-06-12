import React, { useState } from 'react';
import { EmptyList, ListButtons, ListPopup, SectionCard } from '../../../components';

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

export const Lists: React.FC<ILists> = ({ lists }) => {
  const [showPopup, setShowPopup] = useState('');
  const [popupArray, setPopupArray] = useState<any>([]);

  return (
    <div className={classes.lists}>
      {lists.length ? (
        <>
          {lists.map(({ items, title }) => (
            <section key={title} className={classes.section}>
              <div className={classes.section__top}>
                <h3 className={classes.section__title}>{title} </h3>
                <ListButtons title={title} setPopupArray={setPopupArray} setShowPopup={setShowPopup} />
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
                <ListPopup itemsArr={popupArray} setShowPopup={setShowPopup} showPopup={showPopup} />
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
