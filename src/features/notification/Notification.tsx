import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { closeNotification } from './notificationSlice';

import classes from './Notification.module.scss';

interface INotification {
  notification: { isShown: boolean; text: string; type: string };
}

export const Notification = () => {
  const dispatch = useDispatch();

  const { isShown, type, text } = useSelector(({ notification }: INotification) => notification);

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeNotification());
    }, 4000);
  }, [dispatch, isShown]);

  return (
    <div
      className={clsx(classes.message, classes.animate, {
        [classes.active]: isShown,
        [classes.message__success]: type === 'success',
        [classes.message__danger]: type === 'reject',
        [classes.message__warning]: type === 'warning',
      })}
    >
      {text}
    </div>
  );
};
