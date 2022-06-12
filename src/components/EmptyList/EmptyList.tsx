import React from 'react';

import classes from './EmptyList.module.scss';

interface IProps {
  text: string;
}

export const EmptyList: React.FC<IProps> = ({ text }) => {
  return (
    <div className={classes.section__empty}>
      <span className={classes.section__empty__icon}>😞</span>
      <div>
        <span className={classes.section__empty__text}>{text}</span>
        <span className={classes.section__empty__text}>
          Добавьте что-нибудь, так другие пользователи <br /> смогут узнать ваши предпочтения
        </span>
      </div>
    </div>
  );
};
