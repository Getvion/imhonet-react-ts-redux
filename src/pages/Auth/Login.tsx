import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  onMobileButtonClick: () => void;
}

export const Login: React.FC<Props> = ({ onMobileButtonClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const onLogin = (nickname: string, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
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
      .catch(() => alert('Invalid user!'));
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
