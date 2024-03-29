import React, { useEffect } from 'react';

import { SectionType } from '../../../@types/intefaces';

import classes from '../Detail.module.scss';

interface IProps {
  sectionName: SectionType;
  id: number;
}

export const MoviesPlayer: React.FC<IProps> = ({ sectionName, id }) => {
  // load yohoho movie
  useEffect(() => {
    if (sectionName === 'movies') {
      const script = document.createElement('script');
      script.src = 'https://yohoho.cc/yo.js';
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  });

  return (
    <div className={classes.player__container}>
      <div id='yohoho' data-kinopoisk={id} />
      <p className={classes.player__text}>К сожалению фильм не нейдейн</p>
    </div>
  );
};

export const MoviePlayer = React.memo(MoviesPlayer);
