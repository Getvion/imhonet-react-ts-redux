import React from 'react';

import classes from './EmptyList.module.scss';

export const EmptyList = () => {
  return (
    <div className={classes.section__empty}>
      <span className={classes.section__empty__icon}>😞</span>
      <div>
        <span className={classes.section__empty__text}>
          Вы пока ничего не добавили в избранное в этом разделе.
        </span>
        <span className={classes.section__empty__text}>
          Добавьте что-нибудь, чтобы другие пользователи могли узнать ваши предпочтения
        </span>
      </div>
    </div>
  );
};
