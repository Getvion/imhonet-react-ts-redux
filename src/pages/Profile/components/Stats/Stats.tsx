import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis } from 'recharts';

import { IItem, IReview } from '../../../../@types/intefaces';

import { selectUser } from '../../../../features/auth/userSlice';

import { useWindowDimensions } from '../../../../hooks';

import classes from './Stats.module.scss';

interface IStatsService {
  title: string;
}

const StatsGraph: React.FC<IStatsService> = ({ title }) => (
  <div className={classes.graph}>
    <h2 className={classes.graph__title}>
      {title}
      <span className={classes.graph__title__number}> a</span>
    </h2>
    <div className={classes.graph__item}>
      <span className={classes.graph__item__text}>completed</span>
      <div className={classes.graph__line}>
        <span className={classes.graph__line__full} />
        <span className={classes.graph__line__part} />
      </div>
      <span className={classes.graph__item__number}> b</span>
    </div>

    <div className={classes.graph__item}>
      <span className={classes.graph__item__text}>later</span>
      <div className={classes.graph__line}>
        <span className={classes.graph__line__full} />
        <span className={classes.graph__line__part} />
      </div>
      <span className={classes.graph__item__number}> c</span>
    </div>

    <div className={classes.graph__item}>
      <span className={classes.graph__item__text}>favorite</span>
      <div className={classes.graph__line}>
        <span className={classes.graph__line__full} />
        <span className={classes.graph__line__part} />
      </div>
      <span className={classes.graph__item__number}> d</span>
    </div>
  </div>
);

interface IStatsYear {
  title: string;
  section: keyof IYearsStateData;
  data: IYearsStateData[];
}

const StatsYear: React.FC<IStatsYear> = ({ title, data, section }) => {
  const { windowWidth } = useWindowDimensions();

  const statsYearWidth = Math.floor(windowWidth / 2);

  const sortedData = data.sort((a, b) => a.year - b.year);

  return (
    <div>
      <h2>{title}</h2>
      <BarChart width={statsYearWidth} height={150} data={sortedData}>
        <YAxis dataKey='all' />
        <XAxis dataKey='year' />
        <Bar dataKey={section} fill='#8884d8' />
        <Tooltip />
      </BarChart>
    </div>
  );
};

const StatsGenres: React.FC<IStatsService> = ({ title }) => {
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

interface IYearsStateData {
  year: number;
  games: number;
  shows: number;
  books: number;
  movies: number;
  all: number;
}

export const Stats = () => {
  // const [genresData, setGenresData] = useState([]);
  // const [graphData, setGraphData] = useState([]);

  const { favoriteContent, reviews, waitingContent } = useSelector(selectUser);

  // years stats
  const allYearsContent: IItem[] & IReview[] = [];

  favoriteContent.forEach((elem) => elem.items.forEach((obj) => allYearsContent.push(obj)));
  waitingContent.forEach((elem) => elem.items.forEach((obj) => allYearsContent.push(obj)));
  reviews.forEach((elem) => elem.items.forEach((obj) => allYearsContent.push(obj)));

  const yearsArrWithoutDublicates = allYearsContent.filter(
    (elem, index, self) => index === self.findIndex((t) => t.id === elem.id)
  );

  let yearData: IYearsStateData[] = [];

  yearsArrWithoutDublicates.forEach(({ section, year }) => {
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

  return (
    <div className={classes.stats}>
      <div className={classes.stats__container}>
        <StatsGraph title='all' />
        <div className={classes.stats__row}>
          <StatsGraph title='games' />
          <StatsGraph title='movies' />
        </div>
        <div className={classes.stats__row}>
          <StatsGraph title='shows' />
          <StatsGraph title='books' />
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
