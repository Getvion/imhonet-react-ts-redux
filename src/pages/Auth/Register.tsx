import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

import { setUser } from '../../features/auth/userSlice';

import { RegistrationForm } from './RegistrationForm';

import classes from './Auth.module.scss';

interface IProps {
  onMobileButtonClick: () => void;
}

export const Register: React.FC<IProps> = ({ onMobileButtonClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (nickname: string, regEmail: string, regPassword: string) => {
    await createUserWithEmailAndPassword(auth, regEmail, regPassword).then(() => {
      if (!auth.currentUser) return;

      const userTemplate = {
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
        reviews: [
          { sectionName: 'games', items: [] },
          { sectionName: 'movies', items: [] },
          { sectionName: 'shows', items: [] },
          { sectionName: 'books', items: [] }
        ],
        lists: []
      };

      setDoc(doc(db, 'users', regEmail), userTemplate);

      updateProfile(auth.currentUser, { displayName: nickname });
      navigate('/');

      dispatch(setUser(userTemplate));
    });
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
