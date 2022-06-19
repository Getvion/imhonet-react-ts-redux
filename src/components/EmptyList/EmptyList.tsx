import React from 'react';

import classes from './EmptyList.module.scss';

interface IProps {
  text: string;
}

export const EmptyList: React.FC<IProps> = ({ text }) => {
  return (
    <div className={classes.empty}>
      <span className={classes.empty__icon}>😞</span>
      <div className={classes.empty__container}>
        <span className={classes.empty__text}>{text}</span>
        <span className={classes.empty__text}>
          Добавьте что-нибудь, так другие пользователи <br /> смогут узнать ваши предпочтения
        </span>
      </div>
    </div>
  );
};
