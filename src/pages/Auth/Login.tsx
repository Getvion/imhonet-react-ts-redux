import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import { setEmailAndName } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';

interface IProps {
  onMobileButtonClick: () => void;
}

export const Login: React.FC<IProps> = ({ onMobileButtonClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (nickname: string, loginEmail: string, loginPassword: string) => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(({ user }) => {
        dispatch(setEmailAndName({ name: user.displayName, email: user.email }));

        navigate(-1);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={classes.user__forms_login}>
      <h2 className={classes.forms__title}>Вход</h2>
      <RegistrationForm
        onMobileButtonClick={onMobileButtonClick}
        text='Зарегистрироваться'
        buttonText='Войти'
        isRegistration={false}
        onSubmitForm={onLogin}
      />
    </div>
  );
};
