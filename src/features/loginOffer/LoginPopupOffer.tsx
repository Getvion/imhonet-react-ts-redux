import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { setLoginOffer } from './loginOfferSlice';

import classes from './LoginPopupOffer.module.scss';

export const LoginPopupOffer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isPopupShow = useSelector((state: { showLoginPopup: boolean }) => state.showLoginPopup);

  const onCloseModal = (isNavigate: boolean) => {
    dispatch(setLoginOffer(false));

    return isNavigate ? navigate('/auth') : null;
  };

  return (
    <div className={clsx(classes.modal, { [classes.open]: isPopupShow })}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__content}>
          <p className={classes.modal__text}>
            Чтобы соверить это действие необходимо войти в акканут <br />
            <span>Хотите войти?</span>
          </p>
          <div className={classes.modal__buttons}>
            <Button onClick={() => onCloseModal(true)} state='accept' text='Войти' />
            <Button onClick={() => onCloseModal(false)} state='reject' text='Отмена' />
          </div>
        </div>
      </div>
    </div>
  );
};
