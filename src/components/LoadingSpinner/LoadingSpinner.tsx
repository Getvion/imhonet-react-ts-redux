import React from 'react';

import classes from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
  return (
    <div className={classes.section}>
      <span className={classes.loader}> </span>
    </div>
  );
};
