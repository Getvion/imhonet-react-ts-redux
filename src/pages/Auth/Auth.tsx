import React, { useRef } from 'react';

import classes from './Auth.module.scss';

// todo добавить кнопку возврата при переходе в раздел "забыли пароль", в мобильном режиме при переходе в режим "забыли пароль" некоректно переходит

export const Auth = () => {
  const UserForms: any = useRef(null);
  // Variables
  // const signupButton = document.getElementById('signup-button'),
  // loginButton = document.getElementById('login-button'),
  // signupButtonMb = document.getElementById('signup-button-mb'),
  // loginButtonMb = document.getElementById('login-button-mb'),
  // forgetButton = document.getElementById('forget-button'),
  // userForms = document.getElementById('user_options-forms'),
  // loginForm = document.getElementById('user_forms-login'),
  // signUpForm = document.getElementById('user_forms-signup');

  const onLoginClick = () => {
    // loginButton.addEventListener('click', () => {
    UserForms.current.classList.remove(classes.bounceLeft, classes.show_forgotPass);
    UserForms.current.classList.add(classes.bounceRight);
    // }, false);
  };

  const onSignUpClick = () => {
    // signupButton.addEventListener('click', () => {
    UserForms.current.classList.remove(classes.bounceRight, classes.show_forgotPass);
    UserForms.current.classList.add(classes.bounceLeft);
    // }, false)
  };

  const onForgetButtonClick = () => {
    // Add event listener to the "Forget Password" button
    // forgetButton.addEventListener('click', () => {
    UserForms.current.classList.remove(classes.bounceLeft, classes.show_login, classes.show_signup);
    UserForms.current.classList.add(classes.show_forgotPass, classes.bounceRight);
    // }, false)
  };

  const onMobileSignUpClick = () => {
    // Add event listener to the "Signup" button mobile
    // signupButtonMb.addEventListener('click', () => {
    UserForms.current.classList.remove(classes.show_login, classes.show_forgotPass);
    UserForms.current.classList.add(classes.show_signup);
    // }, false)
  };

  const onMobileLoginClick = () => {
    // Add event listener to the "Login" button mobile
    // loginButtonMb.addEventListener('click', () => {
    UserForms.current.classList.remove(classes.show_signup, classes.show_forgotPass);
    UserForms.current.classList.add(classes.show_login);
    // }, false)
  };

  return (
    <div className={classes.user}>
      <section className={classes.user__authentication}>
        <div className={classes.user__options_container}>
          <div className={classes.user__options_text}>
            <div className={classes.user__options_unregistered}>
              <h2 className={classes.user__unregistered_title}>Don't have an account?</h2>
              {/* <p className={classes.user__unregistered_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis nibh in leolacinia blandit et quis lorem.</p> */}
              <button
                className={classes.user__unregistered_signup}
                id='signup-button'
                onClick={onSignUpClick}
              >
                Sign up
              </button>
            </div>

            <div className={classes.user__options_registered}>
              <h2 className={classes.user__registered_title}>Have an account?</h2>
              {/* <p className={classes.user__registered_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis nibh in leolacinia blandit et quis lorem. </p> */}
              <button
                className={classes.user__registered_login}
                id='login-button'
                onClick={onLoginClick}
              >
                Login
              </button>
            </div>
          </div>

          <div className={classes.user__options_forms} id='user_options-forms' ref={UserForms}>
            <div className={classes.user__forms_login}>
              <h2 className={classes.forms__title}>Login</h2>
              <form className='forms_form'>
                <fieldset className={classes.forms__fieldset}>
                  <div className={classes.forms__field}>
                    <input
                      type='email'
                      placeholder='Email'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='password'
                      placeholder='Password'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                </fieldset>
                <div className={classes.forms__buttons}>
                  <button
                    type='button'
                    className={classes.forms__buttons_forgot}
                    id='forget-button'
                    onClick={onForgetButtonClick}
                  >
                    Forgot password?
                  </button>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Login
                  </button>
                  <span
                    className={classes.forms__buttons_mb_button}
                    id='signup-button-mb'
                    onClick={onMobileSignUpClick}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </div>
            <div className={classes.user__forms_signup}>
              <h2 className={classes.forms__title}>Sign Up</h2>
              <form className='forms_form'>
                <fieldset className={classes.forms__fieldset}>
                  <div className={classes.forms__field}>
                    <input
                      type='text'
                      placeholder='Full Name'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='email'
                      placeholder='Email'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                  <div className={classes.forms__field}>
                    <input
                      type='password'
                      placeholder='Password'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                </fieldset>
                <div className={classes.forms__buttons}>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Sign up
                  </button>
                  <span
                    className={classes.forms__buttons_mb_button}
                    id='login-button-mb'
                    onClick={onMobileLoginClick}
                  >
                    Login
                  </span>
                </div>
              </form>
            </div>
            <div className={classes.user__forms_forgot}>
              <h2 className={classes.forms__title}>Forgot Password</h2>
              <form className='forms_form'>
                <fieldset className={classes.forms__fieldset}>
                  <div className={classes.forms__field}>
                    <input
                      type='email'
                      placeholder='Email'
                      className={classes.forms__field_input}
                      required
                    />
                  </div>
                </fieldset>
                <div className={classes.forms__buttons}>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Send reset link
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
