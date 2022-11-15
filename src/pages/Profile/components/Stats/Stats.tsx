import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis } from 'recharts';

import { IItem, IReview, SectionType } from '../../../../@types/intefaces';

import { selectUser } from '../../../../features/auth/userSlice';

import { useWindowDimensions } from '../../../../hooks';

import classes from './Stats.module.scss';

interface IStatsService {
  title: string;
  content: { favorite: number; waiting: number; completed: number };
}

const StatsGraph: React.FC<IStatsService> = ({ content, title }) => {
  const { completed, favorite, waiting } = content;

  const all = completed + favorite + waiting;

  const calcBarWidth = (part: number) => `${(part / all) * 100}%`;

  return (
    <div className={classes.graph}>
      <h2 className={classes.graph__title}>
        {title}
        <span className={classes.graph__title__number}> {all}</span>
      </h2>
      <div className={classes.graph__item}>
        <span className={classes.graph__item__text}>Оценено</span>
        <div className={classes.graph__line}>
          <span className={classes.graph__line__full} />
          <span className={classes.graph__line__part} style={{ width: calcBarWidth(completed) }} />
        </div>
        <span className={classes.graph__item__number}>{completed}</span>
      </div>

      <div className={classes.graph__item}>
        <span className={classes.graph__item__text}>Позже</span>
        <div className={classes.graph__line}>
          <span className={classes.graph__line__full} />
          <span className={classes.graph__line__part} style={{ width: calcBarWidth(favorite) }} />
        </div>
        <span className={classes.graph__item__number}>{favorite}</span>
      </div>

      <div className={classes.graph__item}>
        <span className={classes.graph__item__text}>Любимое</span>
        <div className={classes.graph__line}>
          <span className={classes.graph__line__full} />
          <span className={classes.graph__line__part} style={{ width: calcBarWidth(waiting) }} />
        </div>
        <span className={classes.graph__item__number}>{waiting}</span>
      </div>
    </div>
  );
};

interface IStatsYear {
  title: string;
  section: keyof IYearsStateData;
  data: IYearsStateData[];
}

interface IYearsStateData {
  year: number;
  games: number;
  shows: number;
  books: number;
  movies: number;
  all: number;
}

const StatsYear: React.FC<IStatsYear> = ({ title, data, section }) => {
  const { windowWidth } = useWindowDimensions();
  const [width, setWidth] = useState(windowWidth / 2);

  const sortedData = data.sort((a, b) => a.year - b.year);

  const screenOffset = 100;
  useEffect(() => {
    if (windowWidth < 800) setWidth(windowWidth - screenOffset);
    if (windowWidth > 1200) setWidth(windowWidth / 2);
  }, [windowWidth]);

  return (
    <div style={{ width }}>
      <h2>{title}</h2>
      <BarChart width={width} height={150} data={sortedData}>
        <YAxis dataKey='all' />
        <XAxis dataKey='year' />
        <Bar dataKey={section} fill='rgb(67, 84, 186)' />
        <Tooltip />
      </BarChart>
    </div>
  );
};

interface IStatsGenresProps {
  title: string;
}

const StatsGenres: React.FC<IStatsGenresProps> = ({ title }) => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
  ];
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: 20 }}>{title}</h2>
      <PieChart width={200} height={200}>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={data}
          outerRadius={99}
          fill='#8884d8'
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export const Stats = () => {
  // const [genresData, setGenresData] = useState([]);

  const { favoriteContent, reviews, waitingContent } = useSelector(selectUser);

  const allContent: IItem[] & IReview[] = [];

  favoriteContent.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));
  waitingContent.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));
  reviews.forEach((elem) => elem.items.forEach((obj) => allContent.push(obj)));

  const arrWithoutDublicates = allContent.filter(
    (elem, index, self) => index === self.findIndex((t) => t.id === elem.id)
  );

  // years stats
  let yearData: IYearsStateData[] = [];

  arrWithoutDublicates.forEach(({ section, year }) => {
    const baseYear: IYearsStateData = { year: 0, games: 0, shows: 0, books: 0, movies: 0, all: 0 };
    const yearsAdded = yearData.find((elem) => elem.year === Number(year));
    const yearsWithoutAdded = yearData.filter((elem) => Number(elem.year) !== Number(year));

    if (yearsAdded) {
      yearData = [
        ...yearsWithoutAdded,
        { ...yearsAdded, [section]: yearsAdded[section] + 1, all: yearsAdded.all + 1 }
      ];
    } else {
      yearData = [...yearsWithoutAdded, { ...baseYear, year: Number(year), [section]: 1, all: 1 }];
    }
  });

  // stats graph
  const allCompleted = [...reviews.map((elem) => elem.items)].length;
  const allWaiting = [...waitingContent.map((elem) => elem.items)].length;
  const allFavorite = [...favoriteContent.map((elem) => elem.items)].length;

  const allObj = { completed: allCompleted, favorite: allFavorite, waiting: allWaiting };

  type ContentType = { sectionName: SectionType; items: IReview[] | IItem[] };

  const getContentLength = (content: ContentType[], sectionName: SectionType): number =>
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
        <StatsYear section='all' data={yearData} title='Все' />
        <div className={classes.stats__row}>
          <StatsYear section='games' data={yearData} title='Игры' />
          <StatsYear section='movies' data={yearData} title='Фильмы' />
        </div>
        <div className={classes.stats__row}>
          <StatsYear section='shows' data={yearData} title='Сериалы' />
          <StatsYear section='books' data={yearData} title='Книги' />
        </div>
      </div>

      <div className={classes.pie__container}>
        <StatsGenres title='all' />
        <StatsGenres title='games' />
        <StatsGenres title='movies' />
        <StatsGenres title='shows' />
        <StatsGenres title='books' />
      </div>
    </div>
  );
};
