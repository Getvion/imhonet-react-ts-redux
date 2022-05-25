import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SectionCard.module.scss';

interface SectionCardProps {
  name: string;
  bgImage: string;
  id: number;
  nameRu?: string;
  section: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({ name, bgImage, id, nameRu, section }) => {
  return (
    <Link to={`/${section}/${id}`} className={classes.card}>
      <div className={classes.card__img__wrapper}>
        <img className={classes.card__img} src={bgImage} alt={nameRu ? nameRu : name} />
      </div>
      <h3 className={classes.card__title}>{nameRu ? nameRu : name}</h3>
    </Link>
  );
};
