import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  onMobileButtonClick: () => void;
}

export const Register: React.FC<Props> = ({ onMobileButtonClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const onRegister = (nickname: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            nickname: nickname,
          })
        );
        navigate('/');
      })
      .catch((error) => console.log(error.code, error.message));
  };

  return (
    <div className={classes.user__forms_signup}>
      <h2 className={classes.forms__title}>Регистрация</h2>
      <RegistrationForm
        onMobileButtonClick={onMobileButtonClick}
        text='Войти'
        buttonText='Зарегистрироваться'
        isRegistration={true}
        onSubmitForm={onRegister}
      />
    </div>
  );
};
