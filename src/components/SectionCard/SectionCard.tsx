import React from 'react';
import { Link } from 'react-router-dom';

import { SectionType } from '../../@types/intefaces';

import classes from './SectionCard.module.scss';

interface IProps {
  name: string;
  bgImage: string;
  id: number;
  section: SectionType;
}

export const SectionCard: React.FC<IProps> = ({ name, bgImage, id, section }) => (
  <Link to={`/${section}/${id}`} className={classes.card}>
    <div className={classes.card__img__wrapper}>
      <img className={classes.card__img} src={bgImage} alt={name} />
    </div>
    <h3 className={classes.card__title}>{name}</h3>
  </Link>
);
