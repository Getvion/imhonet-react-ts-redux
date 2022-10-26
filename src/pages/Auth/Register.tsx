import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

import { setUser } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';
import { setNotification } from '../../features/notification/notificationSlice';

interface IProps {
  onMobileButtonClick: () => void;
}

export const Register: React.FC<IProps> = ({ onMobileButtonClick }) => {
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
            country: '',
            imageUrl:
              'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
            socialMedia: []
          },
          favoriteContent: [
            { sectionName: 'games', title: 'Игры', items: [] },
            { sectionName: 'movies', title: 'Фильмы', items: [] },
            { sectionName: 'shows', title: 'Серилы', items: [] },
            { sectionName: 'books', title: 'Книги', items: [] }
          ],
          waitingContent: [
            { sectionName: 'games', title: 'Игры', items: [] },
            { sectionName: 'movies', title: 'Фильмы', items: [] },
            { sectionName: 'shows', title: 'Серилы', items: [] },
            { sectionName: 'books', title: 'Книги', items: [] }
          ],
          lists: []
        });

        updateProfile(auth.currentUser, { displayName: nickname });
        navigate('/');

        dispatch(
          setUser({
            userData: {
              name: nickname,
              email: regEmail,
              description: '',
              country: '',
              imageUrl:
                'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
              socialMedia: []
            },
            favoriteContent: { games: [], movies: [], shows: [], books: [] },
            waitingContent: { games: [], movies: [], shows: [], books: [] },
            lists: []
          })
        );
      })
      .catch(() =>
        dispatch(
          setNotification({
            type: 'reject',
            text: 'Произошла ошибка, попробуйте снова, а так же проверьте правильность введенный данных'
          })
        )
      );
  };

  return (
    <div className={classes.user__forms_signup}>
      <h2 className={classes.forms__title}>Регистрация</h2>
      <RegistrationForm
        onMobileButtonClick={onMobileButtonClick}
        text='Войти'
        buttonText='Зарегистрироваться'
        isRegistration
        onSubmitForm={onRegister}
      />
    </div>
  );
};
