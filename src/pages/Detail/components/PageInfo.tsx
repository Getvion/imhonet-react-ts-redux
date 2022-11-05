import React from 'react';

import { ListItem } from './ListItem';

import { IItemInfo } from '../../../@types/state';

import classes from '../Detail.module.scss';

interface IProps {
  pageDetails: IItemInfo;
  sectionName: string;
}

export const PageInfo: React.FC<IProps> = ({ pageDetails, sectionName }) => {
  const {
    year,
    genres,
    ageRating,
    developers,
    achievementsCount,
    publishers,
    show,
    book,
    countries,
    filmLength
  } = pageDetails;

  const ratingAgeLimits = () => {
    if (ageRating === 'r' || ageRating === 'Mature') return '18+';
    if (ageRating === 'age16' || ageRating === 'Teen') return '16+';
    if (ageRating === 'pg13' || ageRating === 'Everyone 10+') return '12+';
    return '0+';
  };

  const contentTypeCheck = () => {
    if (sectionName === 'games') return 'игре';
    if (sectionName === 'movies') return 'фильме';
    if (sectionName === 'shows') return 'сериале';
    return 'книге';
  };

  return (
    <div className={classes.page__info}>
      <h3 className={classes.page__about}>О {contentTypeCheck()}</h3>
      <ul className={classes.page__list}>
        {year && <ListItem description='Год выхода' content={year} />}
        {genres && <ListItem description='Жанр' content={genres} />}
        {ageRating && <ListItem description='Возраст' content={ratingAgeLimits()} />}
        {achievementsCount && <ListItem description='Достижения' content={achievementsCount} />}
        {developers?.length && (
          <ListItem description='Разработчики' content={developers.map((elem) => elem.name)} />
        )}
        {publishers?.length && (
          <ListItem description='Издатели' content={publishers.map((elem) => elem.name)} />
        )}
        {countries?.length && <ListItem description='Страны' content={countries} />}
        {filmLength && <ListItem description='Длина' content={`${filmLength} мин`} />}
        {show?.seasons && <ListItem description='Сезонов' content={show?.seasons} />}
        {book?.author && <ListItem description='Автор' content={book?.author} />}
        {book?.publisher && <ListItem description='Издатель' content={book?.publisher} />}
      </ul>
    </div>
  );
};
