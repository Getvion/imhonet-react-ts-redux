import React from 'react';

import classes from './Auth.module.scss';

export const Auth = () => {
  // Variables
  // const signupButton = document.getElementById('signup-button'),
  // loginButton = document.getElementById('login-button'),
  // signupButtonMb = document.getElementById('signup-button-mb'),
  // loginButtonMb = document.getElementById('login-button-mb'),
  // forgetButton = document.getElementById('forget-button'),
  // userForms = document.getElementById('user_options-forms'),
  // loginForm = document.getElementById('user_forms-login'),
  // signUpForm = document.getElementById('user_forms-signup');

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
                onClick={() =>
                  console.log(` // Add event listener to the "Sign Up" button
  // signupButton.addEventListener('click', () => {
  // userForms.classList.remove('show-forgotPass');
  // userForms.classList.remove('bounceRight');
  // userForms.classList.add('bounceLeft');
  // }, false)`)
                }
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
                onClick={() => `// Add event listener to the "Login" button
  // loginButton.addEventListener('click', () => {
  // userForms.classList.remove('show-forgotPass');
  // userForms.classList.remove('bounceLeft');
  // userForms.classList.add('bounceRight');
  // }, false)`}
              >
                Login
              </button>
            </div>
          </div>

          <div className={classes.user__options_forms} id='user_options-forms'>
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
                    onClick={() =>
                      console.log(`// Add event listener to the "Forget Password" button
                    // forgetButton.addEventListener('click', () => {
                    // userForms.classList.add('show-forgotPass');
                    // userForms.classList.add('bounceRight');
                    // userForms.classList.remove('bounceLeft');
                    // userForms.classList.remove('show-login');
                    // userForms.classList.remove('show-signup');
                    // }, false)`)
                    }
                  >
                    Forgot password?
                  </button>
                  <button type='submit' className={classes.forms__buttons_action}>
                    Login
                  </button>
                  <a
                    className={classes.forms__buttons_mb_button}
                    id='signup-button-mb'
                    href='https://google.com'
                    onClick={() =>
                      console.log(` // Add event listener to the "Signup" button mobile
                    // signupButtonMb.addEventListener('click', () => {
                    // userForms.classList.remove('show-forgotPass');
                    // userForms.classList.remove('show-login');
                    // userForms.classList.add('show-signup');
                    // }, false)`)
                    }
                  >
                    Sign up
                  </a>
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
                  <a
                    className={classes.forms__buttons_mb_button}
                    id='login-button-mb'
                    href='https://google.com'
                    onClick={() =>
                      console.log(`
                    // Add event listener to the "Login" button mobile
                    // loginButtonMb.addEventListener('click', () => {
                    // userForms.classList.remove('show-forgotPass');
                    // userForms.classList.add('show-login');
                    // userForms.classList.remove('show-signup');
                    // }, false)`)
                    }
                  >
                    Login
                  </a>
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
