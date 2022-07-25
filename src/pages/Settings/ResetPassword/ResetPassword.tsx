import React from 'react';
import clsx from 'clsx';

import classes from './ResetPassword.module.scss';

export const ResetPassword = () => (
  <section className={classes.password}>
    <div className={classes.password__container}>
      <span className={classes.password__span}>Старый пароль</span>
      <input type='password' className={clsx(classes.password__input, classes.password__old)} />
    </div>

    <div className={classes.password__container}>
      <span className={classes.password__span}>Новый пароль</span>
      <input type='password' className={clsx(classes.password__input, classes.password__new)} />
    </div>

    <div className={classes.password__container}>
      <span className={classes.password__span}>Повторить новый пароль</span>
      <input type='password' className={clsx(classes.password__input, classes.password__new__repeat)} />
    </div>
  </section>
);
