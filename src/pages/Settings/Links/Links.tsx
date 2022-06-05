import React from 'react';

import classes from './Links.module.scss';

export const Links = () => {
  return (
    <section className={classes.links}>
      <div className={classes.link}>
        <span className={classes.link__span}>Twitter</span>
        <input type='text' className={classes.link__input} />
      </div>
      <div className={classes.link}>
        <span className={classes.link__span}>Facebook</span>
        <input type='text' className={classes.link__input} />
      </div>
      <div className={classes.link}>
        <span className={classes.link__span}>Google</span>
        <input type='text' className={classes.link__input} />
      </div>
      <div className={classes.link}>
        <span className={classes.link__span}>VK</span>
        <input type='text' className={classes.link__input} />
      </div>
      <div className={classes.link}>
        <span className={classes.link__span}>Instagram</span>
        <input type='text' className={classes.link__input} />
      </div>
    </section>
  );
};
