import React from 'react';
import { Button, SectionCard } from '../../../components';

import classes from './Lists.module.scss';

export const Lists = () => {
  const lists = [
    {
      listName: 'Top 10',
      listItems: [
        {
          id: 11,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName',
        },
        {
          id: 12,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName2',
        },
      ],
    },
    {
      listName: 'Top 20',
      listItems: [
        {
          id: 13,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName3',
        },
        {
          id: 14,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName4',
        },
        {
          id: 15,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName3',
        },
        {
          id: 16,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName4',
        },
        {
          id: 17,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName3',
        },
        {
          id: 18,
          bgImage: 'https://static.wikia.nocookie.net/batman/images/9/9a/The_Batman_poster_10.jpg',
          section: 'movies',
          sectoinCardName: 'movieName4',
        },
      ],
    },
  ];
  return (
    <div className={classes.lists}>
      {lists.map(({ listItems, listName }) => (
        <section key={listName} className={classes.section}>
          <div className={classes.section__top}>
            <h3 className={classes.section__title}>{listName} </h3>
            <Button onClick={() => console.log('hi')} text='Показать все' />
          </div>
          <ul className={classes.section__list}>
            {listItems.slice(0, 3).map(({ id, bgImage, sectoinCardName, section }) => (
              <li key={id} className={classes.section__item}>
                <SectionCard id={id} bgImage={bgImage} name={sectoinCardName} section={section} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
