import React, { useState } from 'react';
import { AuthInput } from '../../components';

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
          <AuthInput placeholder='Никнейм' onChange={(value: string) => setNicknameValue(value)} />
        )}
        <AuthInput placeholder='Емейл' type='email' onChange={(value: string) => setEmailValue(value)} />
        <AuthInput placeholder='Пароль' type='password' onChange={(val: string) => setPasswordValue(val)} />
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
