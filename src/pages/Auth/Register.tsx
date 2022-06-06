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
      .then(() => {
        if (!auth.currentUser) return;

        setDoc(doc(db, 'users', regEmail), {
          userData: {
            name: nickname,
            email: regEmail,
            description: '',
            birthday: '',
            country: '',
            imageUrl:
              'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
            socialMedia: [],
          },
          favoriteContent: { games: [], movies: [], shows: [], books: [] },
          waitingContent: { games: [], movies: [], shows: [], books: [] },
          lists: { movies: [], games: [], shows: [], books: [] },
        });

        updateProfile(auth.currentUser, { displayName: nickname });
        navigate(-1);

        dispatch(
          setUser({
            userData: {
              name: nickname,
              email: regEmail,
              description: '',
              birthday: '',
              country: '',
              imageUrl:
                'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
              socialMedia: [],
            },
            favoriteContent: { games: [], movies: [], shows: [], books: [] },
            waitingContent: { games: [], movies: [], shows: [], books: [] },
            lists: { movies: [], games: [], shows: [], books: [] },
          })
        );
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
