import React from 'react';
import clsx from 'clsx';

import classes from './General.module.scss';

export const General = () => {
  return (
    <section className={classes.general}>
      <div className={classes.general__img__wrapper}>
        <img
          src='https://bootdey.com/img/Content/avatar/avatar1.png'
          alt='username'
          className={classes.general__img}
        />
        <label className={classes.general__upload}>
          Загрузить фото
          <input type='file' className={classes.general__upload__field} />
        </label>
      </div>

      <div className={classes.general__content}>
        <div className={classes.general__form}>
          <div className={classes.general__form__container}>
            <span className={classes.general__form__span}>Никнейм</span>
            <input type='text' className={classes.general__form__input} />
          </div>
          <div className={classes.general__form__container}>
            <span className={classes.general__form__span}>Описание</span>
            <textarea
              className={clsx(classes.general__form__input, classes.general__form__textarea)}
              onChange={() => {}}
              value={
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, sint ab! Pariatur vel explicabo, dolore molestias laboriosam error sit ut commodi itaque est quidem libero rem expedita dignissimos architecto officiis.'
              }
            />
          </div>
          <div className={classes.general__form__container}>
            <span className={classes.general__form__span}>День рождения</span>
            <input type='date' className={classes.general__form__input} />
          </div>
          <div className={classes.general__form__container}>
            <span className={classes.general__form__span}>Страна</span>
            <input type='text' className={classes.general__form__input} />
          </div>
        </div>
      </div>
    </section>
  );
};
