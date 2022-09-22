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

interface RatingsProps {
  contentId: number;
}

export const Ratings: React.FC<RatingsProps> = ({ contentId }) => {
  const dispatch = useDispatch();
  const [selectedRating, setSelectedRating] = useState(-1);
  const [textareaValue, setTextareaValue] = useState<string>('');

  const { userData } = useSelector(({ user }: IUserData) => user);

  const ratingsData = [
    { img: exceptionalImg, title: 'Великолепно', value: 'excelent' },
    { img: recomendedImg, title: 'Рекомендую', value: 'recomend' },
    { img: mehImg, title: 'Так себе', value: 'meh' },
    { img: skipImg, title: 'Пропуск', value: 'skip' }
  ];

  const onSelectRating = (index: number) => {
    if (!userData.name) return dispatch(setLoginOffer(true));

    setSelectedRating(index);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // const value = { rating: selectedRating, review: textareaValue, contentId };

    setTextareaValue('');
  };

  return (
    <section className={classes.ratings}>
      <div className={classes.ratings__container}>
        {ratingsData.map(({ title, img }, index) => (
          <button
            key={title}
            className={clsx(classes.ratings__item, { [classes.active]: selectedRating === index })}
            onClick={() => onSelectRating(index)}
          >
            <img className={classes.ratings__icon} src={img} alt={title} />
            <span className={classes.buttons__label}>
              <span className={classes.buttons__text}>{title}</span>
            </span>
          </button>
        ))}
      </div>

      <div>
        <form className={classes.review} onSubmit={onFormSubmit}>
          <textarea
            className={classes.review__field}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <button disabled={!textareaValue} className={classes.review__button} onClick={onFormSubmit}>
            сохранить
          </button>
        </form>
      </div>
    </section>
  );
};
