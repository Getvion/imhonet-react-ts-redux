import React from 'react';

import classes from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
  return (
    <section className={classes.section}>
      <span className={classes.loader}> </span>
    </section>
  );
};
