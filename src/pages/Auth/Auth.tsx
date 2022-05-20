import React, { useRef } from 'react';

import classes from './Auth.module.scss';

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
    <div className={classes.user}>
      <section className={classes.user__authentication}>
        <div className={classes.user__options_container}>
          <div className={classes.user__options_text}>
            <div className={classes.user__options_unregistered}>
              <h2 className={classes.user__unregistered_title}>Нет аккаунта?</h2>
              <button
                className={classes.user__unregistered_signup}
                id='signup-button'
                onClick={onSignUpClick}
              >
                Зарегистрироваться
              </button>
            </div>

            <div className={classes.user__options_registered}>
              <h2 className={classes.user__registered_title}>Уже есть аккаунт?</h2>
              <button
                className={classes.user__registered_login}
                id='login-button'
                onClick={onLoginClick}
              >
                Войти
              </button>
            </div>
          </div>

          <div className={classes.user__options_forms} id='user_options-forms' ref={UserForms}>
            <div className={classes.user__forms_login}>
              <h2 className={classes.forms__title}>Вход</h2>
              <form className='forms_form'>
                <fieldset className={classes.forms__fieldset}>
                  <div className={classes.forms__field}>
                    <input
                      type='email'
                      placeholder='Емейл'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='password'
                      placeholder='Пароль'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                </fieldset>
                <div className={classes.forms__buttons}>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Войти
                  </button>
                  <button
                    className={classes.forms__buttons_mb_button}
                    id='signup-button-mb'
                    onClick={onMobileSignUpClick}
                    type='button'
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>
            <div className={classes.user__forms_signup}>
              <h2 className={classes.forms__title}>Регистрация</h2>
              <form className='forms_form'>
                <fieldset className={classes.forms__fieldset}>
                  <div className={classes.forms__field}>
                    <input
                      type='text'
                      placeholder='Никнейм'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='email'
                      placeholder='Емейл'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='password'
                      placeholder='Пароль'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                </fieldset>
                <div className={classes.forms__buttons}>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Зарегистрироваться
                  </button>
                  <button
                    className={classes.forms__buttons_mb_button}
                    id='login-button-mb'
                    onClick={onMobileLoginClick}
                    type='button'
                  >
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
