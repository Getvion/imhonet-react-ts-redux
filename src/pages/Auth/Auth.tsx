import clsx from 'clsx';
import React, { useRef } from 'react';

import classes from './Auth.module.scss';
import { Form } from './Form';

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
    <section className={clsx(classes.user, classes.user__authentication)}>
      <div className={classes.user__options_container}>
        <div className={classes.user__options_text}>
          <div className={classes.user__options_unregistered}>
            <h2 className={classes.user__unregistered_title}>Нет аккаунта?</h2>
            <button className={classes.user__unregistered_signup} id='signup-button' onClick={onSignUpClick}>
              Зарегистрироваться
            </button>
          </div>

          <div className={classes.user__options_registered}>
            <h2 className={classes.user__registered_title}>Уже есть аккаунт?</h2>
            <button className={classes.user__registered_login} id='login-button' onClick={onLoginClick}>
              Войти
            </button>
          </div>
        </div>

        <div className={classes.user__options_forms} id='user_options-forms' ref={UserForms}>
          <div className={classes.user__forms_login}>
            <h2 className={classes.forms__title}>Вход</h2>
            <Form
              onMobileButtonClick={() => onMobileSignUpClick()}
              text='Зарегистрироваться'
              buttonText='Войти'
            />
          </div>
          <div className={classes.user__forms_signup}>
            <h2 className={classes.forms__title}>Регистрация</h2>
            <Form
              onMobileButtonClick={() => onMobileLoginClick()}
              text='Войти'
              buttonText='Зарегистрироваться'
              isRegistration={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
