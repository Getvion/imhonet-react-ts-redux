import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginOffer } from './loginOfferSlice';

import classes from './LoginPopupOffer.module.scss';

export const LoginPopupOffer = () => {
  const dispatch = useDispatch();

  const isPopupShow = useSelector((state: any) => state.showLoginPopup);

  const onCloseModal = () => {
    dispatch(setLoginOffer(false));
  };

  return (
    <div className={clsx(classes.modal, { [classes.open]: isPopupShow })}>
      <div className={classes.modal__dialog}>
        <div className={classes.modal__content}>
          <p className={classes.modal__text}>
            Чтобы оставить оценку необходимо войти в акканут <br />
            <span>Хотите войти?</span>
          </p>
          <div className={classes.modal__buttons}>
            <Link to={'/auth'} onClick={onCloseModal} className={classes.modal__login}>
              Войти
            </Link>
            <button onClick={onCloseModal} className={classes.modal__reject}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
