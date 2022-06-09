import React, { useState } from 'react';

import { Button, EmptyList, SectionCard, ListPopup } from '../../../components';

import classes from './FavAndWait.module.scss';

interface Props {
  items: { games: IItem[]; movies: IItem[]; shows: any; books: any };
}

interface IItem {
  id: number;
  name: string;
  nameOrig: string;
  bgImg: string;
  section?: string;
}

export const FavAndWait: React.FC<Props> = ({ items }) => {
  const { games, movies, shows, books } = items;

  // const sectionsArray = Object.entries(items);
  // const sectionsTitle = ['Сериалы', 'Игры', 'Фильмы', 'Книги'];

  const [showPopup, setShowPopup] = useState('');

  return (
    <>
      {/* {sectionsArray.map((section, index) => (
        // концепт, надо менять структуру всего документа на такую:
        // items: [{title: "Игры", items: [], section: "games"}, {title: "Фильмы", items: [], section: "movies"}]
        // тогда не надо будет ничего переводить в другие типы данных и просто двойным циклом отобразить все
        <section className={classes.section} key={section[0]}>
          <div className={classes.section__top}>
            <h3 className={classes.section__title}>{sectionsTitle[index]} </h3>
            {section[1].length ? (
              <Button onClick={() => setShowPopup(section[0])} text='Показать все' />
            ) : null}
          </div>
          {section[1].length ? (
            <ul className={classes.section__list}>
              {section[1].slice(0, 4).map(({ id, bgImg, name }: IItem) => (
                <li key={id} className={classes.section__item}>
                  <SectionCard id={id} bgImage={bgImg} name={name} section={section[0]} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyList />
          )}
        </section>
      ))} */}

      <section className={classes.section}>
        <div className={classes.section__top}>
          <h3 className={classes.section__title}>Игры </h3>
          {games.length ? <Button onClick={() => setShowPopup('games')} text='Показать все' /> : null}
        </div>
        {games.length ? (
          <ul className={classes.section__list}>
            {games.slice(0, 4).map(({ id, bgImg, name }: IItem) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={bgImg} name={name} section={'games'} />
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
            {movies.slice(0, 4).map(({ id, nameOrig, name, bgImg }: IItem) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={bgImg} name={name || nameOrig} section={'movies'} />
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
            {shows.slice(0, 4).map(({ id, bgImg, name }: IItem) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={bgImg} name={name} section={'games'} />
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
            {books.slice(0, 4).map(({ id, bgImg, name }: IItem) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={bgImg} name={name} section={'games'} />
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
