import React from 'react';

import classes from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => (
  <div className={classes.section}>
    <span className={classes.loader}> </span>
  </div>
);
