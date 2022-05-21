import React, { useState } from 'react';

import classes from './Auth.module.scss';

interface Props {
  onMobileButtonClick: () => void;
  text: string;
  buttonText: string;
  isRegistration?: boolean;
  onSubmitForm: any;
}

export const RegistrationForm: React.FC<Props> = ({
  onMobileButtonClick,
  text,
  buttonText,
  isRegistration,
  onSubmitForm,
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');

  const onSubmitButtonClick = (e: any) => {
    e.preventDefault();

    onSubmitForm(nicknameValue, emailValue, passwordValue);
  };

  return (
    <form className={classes.forms__form} onSubmit={(e) => onSubmitButtonClick(e)}>
      <fieldset className={classes.forms__fieldset}>
        {isRegistration && (
          <div className={classes.forms__field}>
            <input
              value={nicknameValue}
              onChange={(e) => setNicknameValue(e.target.value)}
              className={classes.forms__field_input}
              type='text'
              placeholder='Никнейм'
              required
            />
          </div>
        )}
        <div className={classes.forms__field}>
          <input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className={classes.forms__field_input}
            type='email'
            placeholder='Емейл'
            required
          />
        </div>
        <div className={classes.forms__field}>
          <input
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            className={classes.forms__field_input}
            type='password'
            placeholder='Пароль'
            required
          />
        </div>
      </fieldset>
      <div className={classes.forms__buttons}>
        <button
          className={classes.forms__buttons_action}
          type='submit'
          onClick={(e) => onSubmitButtonClick(e)}
        >
          {buttonText}
        </button>
        <button className={classes.forms__buttons_mb_button} onClick={onMobileButtonClick} type='button'>
          {text}
        </button>
      </div>
    </form>
  );
};
