import React, { useEffect } from 'react';

import classes from '../DetailPage.module.scss';

export const MoviesPlayer = ({ sectionName, id }: { sectionName: string; id: number }) => {
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
