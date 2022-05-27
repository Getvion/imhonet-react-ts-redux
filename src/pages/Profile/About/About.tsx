import React from 'react';

import { Button, SectionCard } from '../../../components';

import classes from './About.module.scss';

export const About = () => {
  const sections = [
    {
      title: 'Игры',
      items: [
        {
          id: 11,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'games',
          sectoinCardName: 'GameName2',
        },
        {
          id: 10,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'games',
          sectoinCardName: 'GameName',
        },
        {
          id: 9,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'games',
          sectoinCardName: 'GameName2',
        },
        {
          id: 8,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'games',
          sectoinCardName: 'GameName',
        },
      ],
    },
    {
      title: 'Фильмы',
      items: [
        {
          id: 12,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'MovieName2',
        },
        {
          id: 13,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'MovieName',
        },
      ],
    },
    {
      title: 'Сериалы',
      items: [],
    },
  ];

  return (
    <div className={classes.about}>
      <section className={classes.favorited}>
        {sections.map(({ title, items }) => (
          <div key={title} className={classes.section}>
            <div className={classes.section__top}>
              <h3 className={classes.section__title}>{title} </h3>
              {items.length ? <Button onClick={() => console.log('hi')} text='Показать все' /> : null}
            </div>
            <ul className={classes.section__list}>
              {items.length ? (
                <>
                  {items.map(({ id, bgImage, sectoinCardName, section }) => (
                    <li key={id} className={classes.section__item}>
                      <SectionCard id={id} bgImage={bgImage} name={sectoinCardName} section={section} />
                    </li>
                  ))}
                </>
              ) : (
                <li className={classes.section__empty}>
                  <i className={classes.section__empty__icon}>😞</i>
                  <div>
                    <span className={classes.section__empty__text}>
                      Вы пока ничего не добавили в избранное в этом разделе.
                    </span>
                    <span className={classes.section__empty__text}>
                      Добавьте что-нибудь, чтобы другие пользователи могли узнать ваши предпочтения
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};
