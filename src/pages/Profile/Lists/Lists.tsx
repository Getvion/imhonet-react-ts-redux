import React from 'react';
import { Button, EmptyList, SectionCard } from '../../../components';

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
  return (
    <div className={classes.lists}>
      {lists.map(({ items, title }) => (
        <section key={title} className={classes.section}>
          <div className={classes.section__top}>
            <h3 className={classes.section__title}>{title} </h3>
            <Button onClick={() => {}} text='Показать все' />
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
            <EmptyList />
          )}
        </section>
      ))}
    </div>
  );
};
