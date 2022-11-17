/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import React from 'react';
import { useSelector } from 'react-redux';

import { IItem, IReview, SectionType } from '../../../../@types/intefaces';

import { selectUser } from '../../../../features/auth/userSlice';

import { StatsGenres, StatsGraph, StatsYear } from './StatsCompoents';

import classes from './Stats.module.scss';

export type YearsDataType = {
  [key in 'year' | 'games' | 'shows' | 'books' | 'movies' | 'all']: number;
};

export interface IGenreData {
  name: string;
  count: number;
}

export const Stats = () => {
  const { favoriteContent, reviews, waitingContent } = useSelector(selectUser);

  const allContent: IItem[] & IReview[] = [];

  favoriteContent.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));
  waitingContent.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));
  reviews.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));

  const arrWithoutDublicates = allContent.filter(
    (elem, index, self) => index === self.findIndex((t) => t.id === elem.id)
  );

  // stats graph
  const allObj = { completed: 0, favorite: 0, waiting: 0 };

  favoriteContent.forEach(({ items }) => items.forEach(() => (allObj.favorite += 1)));
  waitingContent.forEach(({ items }) => items.forEach(() => (allObj.waiting += 1)));
  reviews.forEach(({ items }) => items.forEach(() => (allObj.completed += 1)));

  interface IContent {
    sectionName: SectionType;
    items: IReview[] | IItem[];
  }

  const getContentLength = (content: IContent[], sectionName: SectionType): number =>
    content.find((elem) => elem.sectionName === sectionName)?.items.length as number;

  const gamesObj = {
    completed: getContentLength(reviews, 'games'),
    waiting: getContentLength(waitingContent, 'games'),
    favorite: getContentLength(favoriteContent, 'games')
  };

  const showsObj = {
    completed: getContentLength(reviews, 'shows'),
    waiting: getContentLength(waitingContent, 'shows'),
    favorite: getContentLength(favoriteContent, 'shows')
  };

  const moviesObj = {
    completed: getContentLength(reviews, 'movies'),
    waiting: getContentLength(waitingContent, 'movies'),
    favorite: getContentLength(favoriteContent, 'movies')
  };

  const booksObj = {
    completed: getContentLength(reviews, 'books'),
    waiting: getContentLength(waitingContent, 'books'),
    favorite: getContentLength(favoriteContent, 'books')
  };

  // years stats
  let yearsData: YearsDataType[] = [];

  arrWithoutDublicates.forEach(({ section, year }) => {
    const yearAdded = yearsData.find((elem) => elem.year === Number(year));
    const yearsWithoutAdded = yearsData.filter((elem) => Number(elem.year) !== Number(year));

    if (yearAdded) {
      yearsData = [
        ...yearsWithoutAdded,
        { ...yearAdded, [section]: yearAdded[section] + 1, all: yearAdded.all + 1 }
      ];
    } else {
      const baseYear: YearsDataType = { year: 0, games: 0, shows: 0, books: 0, movies: 0, all: 1 };
      yearsData = [...yearsWithoutAdded, { ...baseYear, year: Number(year), [section]: 1 }];
    }
  });

  // stats genres
  type GenresDataType = {
    [key in 'all' | 'games' | 'books' | 'shows' | 'movies']: IGenreData[];
  };

  const addGenreContent = (
    withoutAdded: GenresDataType,
    newContent: IGenreData,
    section: SectionType
  ) => ({
    ...withoutAdded,
    all: [...withoutAdded.all, newContent],
    [section]: [...withoutAdded[section], newContent]
  });

  let genresData: GenresDataType = { all: [], games: [], movies: [], shows: [], books: [] };

  arrWithoutDublicates.forEach(({ genres, section }) => {
    genres.forEach((genre) => {
      const genreAdded = genresData[section].find((elem) => genre === elem.name);
      const genresWithoutAdded = {
        ...genresData,
        all: [...genresData.all.filter((elem) => genre !== elem.name)],
        [section]: genresData[section].filter((elem) => genre !== elem.name)
      };

      if (genreAdded) {
        const baseAddedGenre: IGenreData = { ...genreAdded, count: genreAdded.count + 1 };
        genresData = addGenreContent(genresWithoutAdded, baseAddedGenre, section);
      } else {
        const baseGenre: IGenreData = { name: genre, count: 1 };
        genresData = addGenreContent(genresWithoutAdded, baseGenre, section);
      }
    });
  });

  return (
    <div className={classes.stats}>
      <div className={classes.graph__container}>
        <StatsGraph content={allObj} title='Все' />
        <div className={classes.stats__row}>
          <StatsGraph content={gamesObj} title='Игры' />
          <StatsGraph content={moviesObj} title='Фильмы' />
          <StatsGraph content={showsObj} title='Сериалы' />
          <StatsGraph content={booksObj} title='Книги' />
        </div>
      </div>

      <div className={classes.stats__container}>
        <StatsYear section='all' data={yearsData} title='Все' />
        <div className={classes.stats__row}>
          <StatsYear section='games' data={yearsData} title='Игры' />
          <StatsYear section='movies' data={yearsData} title='Фильмы' />
        </div>
        <div className={classes.stats__row}>
          <StatsYear section='shows' data={yearsData} title='Сериалы' />
          <StatsYear section='books' data={yearsData} title='Книги' />
        </div>
      </div>

      <div className={classes.pie__container}>
        {genresData.all.length ? <StatsGenres title='Все' data={genresData.all} /> : null}
        {genresData.games.length ? <StatsGenres title='Игры' data={genresData.games} /> : null}
        {genresData.movies.length ? <StatsGenres title='Фильмы' data={genresData.movies} /> : null}
        {genresData.shows.length ? <StatsGenres title='Сериалы' data={genresData.shows} /> : null}
        {genresData.books.length ? <StatsGenres title='Книги' data={genresData.books} /> : null}
      </div>
    </div>
  );
};
