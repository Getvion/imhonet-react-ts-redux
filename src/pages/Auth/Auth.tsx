import React, { useRef } from 'react';

import { Login } from './Login';
import { Register } from './Register';

import classes from './Auth.module.scss';

// todo bag: при переходе из мобильного режима в десктопный, ломается переключение формы
// todo bag: при переходе из десктопного режима в мобильный ломается переключение формы

export const Auth = () => {
  const UserForms: any = useRef(null);
  const onLoginClick = () => {
    UserForms.current.classList.remove(classes.bounceLeft);
    UserForms.current.classList.add(classes.bounceRight);
  };

  const onSignUpClick = () => {
    UserForms.current.classList.remove(classes.bounceRight);
    UserForms.current.classList.add(classes.bounceLeft);
  };

  const onMobileSignUpClick = () => {
    UserForms.current.classList.remove(classes.show_login);
    UserForms.current.classList.add(classes.show_signup);
  };

  const onMobileLoginClick = () => {
    UserForms.current.classList.remove(classes.show_signup);
    UserForms.current.classList.add(classes.show_login);
  };

  return (
    <section className={classes.user}>
      <div className={classes.user__options}>
        <div className={classes.user__options_text}>
          <div className={classes.user__options_container}>
            <h2 className={classes.user__options_title}>Нет аккаунта?</h2>
            <button className={classes.user__options_button} onClick={onSignUpClick}>
              Зарегистрироваться
            </button>
          </div>

          <div className={classes.user__options_container}>
            <h2 className={classes.user__options_title}>Уже есть аккаунт?</h2>
            <button className={classes.user__options_button} onClick={onLoginClick}>
              Войти
            </button>
          </div>
        </div>

        <div className={classes.user__options_forms} ref={UserForms}>
          <Login onMobileButtonClick={() => onMobileSignUpClick()} />
          <Register onMobileButtonClick={() => onMobileLoginClick()} />
        </div>
      </div>
    </section>
  );
};
