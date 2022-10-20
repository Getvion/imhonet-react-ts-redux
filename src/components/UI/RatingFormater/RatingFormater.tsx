import React from 'react';
import clsx from 'clsx';

import classes from './RatingFormater.module.scss';

interface IProps {
  rating: number;
}

export const RatingFormater: React.FC<IProps> = ({ rating }) => (
  <div>
    {rating && (
      <span
        className={clsx(classes.grade, {
          [classes.green]: rating >= 7,
          [classes.yellow]: rating >= 4 && rating < 7,
          [classes.red]: rating < 4
        })}
      >
        {rating}
      </span>
    )}
  </div>
);
