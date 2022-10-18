import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { IUserData } from '../../@types/intefaces';
import { setLoginOffer } from '../../features/loginOffer/loginOfferSlice';

import exceptionalImg from './img/exceptional.png';
import recomendedImg from './img/recomended.png';
import mehImg from './img/meh.png';
import skipImg from './img/skip.png';

import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';
import classes from './Ratings.module.scss';

export const Ratings = () => {
  const dispatch = useDispatch();
  const [selectedRating, setSelectedRating] = useState(-1);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [isReviewShow, setIsReviewShow] = useState(true);

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
    setIsReviewShow(false);
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
        {isReviewShow ? (
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
        ) : (
          <div className={classes.review__text__container}>
            <button className={classes.review__text__button} onClick={() => setIsReviewShow(true)}>
              <GlobalSvgSelector id='edit' />
            </button>
            <p className={classes.review__text}> {textareaValue}</p>
          </div>
        )}
      </div>
    </section>
  );
};
