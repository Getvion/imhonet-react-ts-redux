import React, { useState } from 'react';

import { Button, EmptyList, SectionCard } from '../../../components';

import classes from './FavAndWait.module.scss';

interface Props {
  items: { games: IGame[]; movies: IMovie[]; shows: any; books: any };
}

interface IGame {
  id: number;
  name: string;
  background_image: string;
}

interface IMovie {
  filmId: number;
  nameRu: string;
  nameEn: string;
  posterUrlPreview: string;
}

export const FavAndWait: React.FC<Props> = ({ items }) => {
  const { games, movies, shows, books } = items;

  const [showAll, setShowAll] = useState('');
  console.log(showAll);

  return (
    <>
      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Игры </h3>
          {games.length && <Button onClick={() => setShowAll('games')} text='Показать все' state='default' />}
        </div>
        {games.length ? (
          <ul className={classes.section__list}>
            {games.slice(0, 4).map(({ id, background_image, name }: IGame) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={background_image} name={name} section={'games'} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Фильмы </h3>
          {movies.length ? (
            <Button onClick={() => setShowAll('movies')} text='Показать все' state='default' />
          ) : null}
        </div>
        {movies.length ? (
          <ul className={classes.section__list}>
            {movies.slice(0, 4).map(({ filmId, nameRu, nameEn, posterUrlPreview }: IMovie) => (
              <li key={filmId} className={classes.section__item}>
                <SectionCard
                  id={filmId}
                  bgImage={posterUrlPreview}
                  name={nameRu || nameEn}
                  section={'movies'}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Сериалы </h3>
          {shows.length ? (
            <Button onClick={() => setShowAll('shows')} text='Показать все' state='default' />
          ) : null}
        </div>
        {shows.length ? (
          <ul className={classes.section__list}>
            {shows.slice(0, 4).map(({ id, background_image, name }: IGame) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={background_image} name={name} section={'games'} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Книги </h3>
          {books.length ? (
            <Button onClick={() => setShowAll('books')} text='Показать все' state='default' />
          ) : null}
        </div>
        {books.length ? (
          <ul className={classes.section__list}>
            {books.slice(0, 4).map(({ id, background_image, name }: IGame) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={background_image} name={name} section={'games'} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
    </>
  );
};
