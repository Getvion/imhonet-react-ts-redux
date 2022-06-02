import React, { useState } from 'react';
import clsx from 'clsx';

import exceptionalImg from './img/exceptional.png';
import recomendedImg from './img/recomended.png';
import mehImg from './img/meh.png';
import skipImg from './img/skip.png';

import classes from './Ratings.module.scss';

export const Ratings = () => {
  const [selectedRating, setSelectedRating] = useState(-1);

  const ratingsData = [
    { img: exceptionalImg, title: 'Великолепно', count: 0 },
    { img: recomendedImg, title: 'Рекомендую', count: 0 },
    { img: mehImg, title: 'Так себе', count: 0 },
    { img: skipImg, title: 'Пропуск', count: 0 },
  ];

  const onSelectRating = (index: number) => {
    setSelectedRating(index);
  };

  return (
    <section className={classes.stat}>
      {ratingsData.map((obj, index) => (
        <div
          key={obj.title}
          className={clsx(classes.stat__item, { [classes.active]: selectedRating === index })}
          onClick={() => onSelectRating(index)}
        >
          <img className={classes.stat__icon} src={obj.img} alt={obj.title} />
          <div className={classes.buttons__label}>
            <span className={classes.buttons__text}>{obj.title}</span>
            <span className={classes.buttons__count}>{obj.count}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
