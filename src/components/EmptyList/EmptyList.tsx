import React from 'react';

import classes from './EmptyList.module.scss';

export const EmptyList = () => {
  return (
    <div className={classes.section__empty}>
      <span className={classes.section__empty__icon}>😞</span>
      <div>
        <span className={classes.section__empty__text}>Вы пока ничего не добавили в список.</span>
        <span className={classes.section__empty__text}>
          Добавьте что-нибудь, так другие пользователи <br /> смогут узнать ваши предпочтения
        </span>
      </div>
    </div>
  );
};
