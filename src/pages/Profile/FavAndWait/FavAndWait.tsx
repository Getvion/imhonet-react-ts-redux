import React, { useState } from 'react';

import { Button, EmptyList, SectionCard, ListPopup } from '../../../components';

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

  const [showPopup, setShowPopup] = useState('');

  return (
    <>
      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Игры </h3>
          {games.length ? <Button onClick={() => setShowPopup('games')} text='Показать все' /> : null}
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
          {movies.length ? <Button onClick={() => setShowPopup('movies')} text='Показать все' /> : null}
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
          {shows.length ? <Button onClick={() => setShowPopup('shows')} text='Показать все' /> : null}
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
          {books.length ? <Button onClick={() => setShowPopup('games')} text='Показать все' /> : null}
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

      {showPopup === 'games' && (
        <ListPopup itemsArr={games} setShowPopup={setShowPopup} showPopup={'games'} />
      )}
      {showPopup === 'movies' && (
        <ListPopup itemsArr={movies} setShowPopup={setShowPopup} showPopup={'movies'} />
      )}
    </>
  );
};
