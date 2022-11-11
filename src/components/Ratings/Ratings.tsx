import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import clsx from 'clsx';

import { db } from '../../firebase';

import { selectPageDetails } from '../../features/details/pageDetailsSlice';
import { setLoginOffer } from '../../features/loginOffer/loginOfferSlice';
import { setNotification } from '../../features';

import exceptionalImg from './img/exceptional.png';
import recomendedImg from './img/recomended.png';
import mehImg from './img/meh.png';
import skipImg from './img/skip.png';

import { GlobalSvgSelector } from '../../assets/icons/GlobalSvgSelector';

import { SubmitFormType } from '../../@types/types';
import { IAddReview } from '../../@types/intefaces';

import { useFetchUser } from '../../hooks';

import classes from './Ratings.module.scss';

interface IProps {
  section: string;
}

export const Ratings: React.FC<IProps> = ({ section }) => {
  const dispatch = useDispatch();

  const { reviews, userData } = useFetchUser();
  const { id, name } = useSelector(selectPageDetails);

  const findReviewObj = reviews
    .find((elem) => elem.sectionName === section)
    ?.items.find((elem) => elem.id === id) ;

  const [selectedRating, setSelectedRating] = useState<number>(-1);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [isFormShow, setIsFormShow] = useState(!!textareaValue);

  useEffect(() => {
    setSelectedRating(findReviewObj?.reviewRating ?? -1);
    setTextareaValue(findReviewObj?.reviewText ?? '');
  }, [reviews.length]);

  const ratingsData = [
    { img: exceptionalImg, title: 'Великолепно' },
    { img: recomendedImg, title: 'Рекомендую' },
    { img: mehImg, title: 'Так себе' },
    { img: skipImg, title: 'Пропуск' }
  ];

  const reviewContent = (reviewsArr: IAddReview[], rating: number): IAddReview[] => {
    const newObj = { id, section, reviewText: textareaValue, reviewRating: rating, name };

    return reviewsArr.map((element) =>
      element.sectionName === section
        ? {
            ...element,
            items: [...element.items.filter((item) => item.id !== id), newObj]
          }
        : element
    );
  };

  const onSelectRating = async (index: number) => {
    if (!userData.name) return dispatch(setLoginOffer(true));

    setSelectedRating(index);

    await updateDoc(doc(db, 'users', userData.email), {
      reviews: reviewContent(reviews, index)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Отзыв записан' })))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' }))
      );
  };

  const onFormSubmit = async (e: SubmitFormType) => {
    e.preventDefault();
    setIsFormShow(false);

    await updateDoc(doc(db, 'users', userData.email), {
      reviews: reviewContent(reviews, selectedRating)
    })
      .then(() => dispatch(setNotification({ type: 'success', text: 'Отзыв записан' })))
      .catch(() =>
        dispatch(setNotification({ type: 'reject', text: 'Произошла ошибка попробуйте снова' }))
      );
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
            <span className={classes.buttons__label}>{title} </span>
          </button>
        ))}
      </div>

      <div>
        {isFormShow ? (
          <form className={classes.review} onSubmit={onFormSubmit}>
            <textarea
              className={classes.review__field}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
            <button
              disabled={!textareaValue}
              className={classes.review__button}
              onClick={onFormSubmit}
            >
              сохранить
            </button>
          </form>
        ) : (
          <div className={classes.review__text__container}>
            <button className={classes.review__text__button} onClick={() => setIsFormShow(true)}>
              <GlobalSvgSelector id='edit' />
            </button>
            <div>
              {textareaValue
                .split('')
                // eslint-disable-next-line react/no-array-index-key
                .map((letter, index) => (letter === '\n' ? <br key={index} /> : letter))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
