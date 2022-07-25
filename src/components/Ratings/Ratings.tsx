import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { IUserData } from '../../intefaces';
import { setLoginOffer } from '../../features/loginOffer/loginOfferSlice';

import exceptionalImg from './img/exceptional.png';
import recomendedImg from './img/recomended.png';
import mehImg from './img/meh.png';
import skipImg from './img/skip.png';

import classes from './Ratings.module.scss';

export const Ratings = () => {
  const dispatch = useDispatch();
  const [selectedRating, setSelectedRating] = useState(-1);

  const { userData } = useSelector(({ user }: IUserData) => user);

  const ratingsData = [
    { img: exceptionalImg, title: 'Великолепно', count: 0 },
    { img: recomendedImg, title: 'Рекомендую', count: 0 },
    { img: mehImg, title: 'Так себе', count: 0 },
    { img: skipImg, title: 'Пропуск', count: 0 }
  ];

  const onSelectRating = (index: number) => {
    if (!userData.name) return dispatch(setLoginOffer(true));

    setSelectedRating(index);
  };

  return (
    <section className={classes.stat}>
      {ratingsData.map(({ title, count, img }, index) => (
        <button
          key={title}
          className={clsx(classes.stat__item, { [classes.active]: selectedRating === index })}
          onClick={() => onSelectRating(index)}
        >
          <img className={classes.stat__icon} src={img} alt={title} />
          <span className={classes.buttons__label}>
            <span className={classes.buttons__text}>{title}</span>
            <span className={classes.buttons__count}>{count}</span>
          </span>
        </button>
      ))}
    </section>
  );
};
