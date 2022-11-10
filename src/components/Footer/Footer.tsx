import React from 'react';

import classes from './Footer.module.scss';

interface IProps {
  isShow: boolean;
}
export const Footer: React.FC<IProps> = ({ isShow }) => (
  <footer className={classes.footer}>
    {isShow && (
      <div className={classes.footer__container}>
        <a
          className={classes.footer__link}
          href='https://github.com/Getvion/imhonet-react-ts-redux'
        >
          Github Repo
        </a>
        <ul className={classes.footer__list}>
          <li className={classes.footer__item}>
            <a className={classes.footer__link} href='https://t.me/getvion'>
              Telegram
            </a>
          </li>
          <li className={classes.footer__item}>
            <a className={classes.footer__link} href='https://github.com/getvion'>
              Github
            </a>
          </li>
          <li className={classes.footer__item}>
            <a className={classes.footer__link} href='mailto:somovolegdev@gmail.com'>
              Email
            </a>
          </li>
        </ul>
      </div>
    )}
  </footer>
);
