import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

import { setUser } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';

interface Props {
  onMobileButtonClick: () => void;
}

export const Register: React.FC<Props> = ({ onMobileButtonClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (nickname: string, regEmail: string, regPassword: string) => {
    await createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(({ user }) => {
        if (!auth.currentUser) return;

        setDoc(doc(db, 'users', regEmail), {
          name: nickname,
          email: regEmail,
          token: user.refreshToken,
        });

        updateProfile(auth.currentUser, { displayName: nickname });

        dispatch(
          setUser({
            email: user.email,
            name: nickname,
            token: user.refreshToken,
          })
        );
        navigate(-1);
      })
      .catch((error) => console.log(error.message));
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
