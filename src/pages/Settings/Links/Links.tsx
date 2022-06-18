import React from 'react';

import { Input } from '../../../components';

import classes from './Links.module.scss';

export const Links = () => {
  return (
    <section className={classes.links}>
      <label className={classes.link}>
        <span className={classes.link__span}>Twitter</span>
        <Input placeholder='' setValue={() => {}} value={''} />
      </label>
      <label className={classes.link}>
        <span className={classes.link__span}>Facebook</span>
        <Input placeholder='' setValue={() => {}} value={''} />
      </label>
      <label className={classes.link}>
        <span className={classes.link__span}>Google</span>
        <Input placeholder='' setValue={() => {}} value={''} />
      </label>
      <label className={classes.link}>
        <span className={classes.link__span}>VK</span>
        <Input placeholder='' setValue={() => {}} value={''} />
      </label>
      <label className={classes.link}>
        <span className={classes.link__span}>Instagram</span>
        <Input placeholder='' setValue={() => {}} value={''} />
      </label>
    </section>
  );
};
