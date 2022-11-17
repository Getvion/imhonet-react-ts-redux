import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis } from 'recharts';

import { useWindowDimensions } from '../../../../hooks';

// eslint-disable-next-line import/no-cycle
import { IGenreData, YearsDataType } from './Stats';

import classes from './Stats.module.scss';

interface IStatsGraph {
  title: string;
  content: { favorite: number; waiting: number; completed: number };
}

export const StatsGraph: React.FC<IStatsGraph> = ({ content, title }) => {
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
          <span className={classes.graph__line__part} style={{ width: calcBarWidth(waiting) }} />
        </div>
        <span className={classes.graph__item__number}>{waiting}</span>
      </div>

      <div className={classes.graph__item}>
        <span className={classes.graph__item__text}>Любимое</span>
        <div className={classes.graph__line}>
          <span className={classes.graph__line__full} />
          <span className={classes.graph__line__part} style={{ width: calcBarWidth(favorite) }} />
        </div>
        <span className={classes.graph__item__number}>{favorite}</span>
      </div>
    </div>
  );
};

interface IStatsGenresProps {
  title: string;
  data: IGenreData[];
}

export const StatsGenres: React.FC<IStatsGenresProps> = ({ title, data }) => (
  <div style={{ textAlign: 'center' }}>
    <h2 style={{ marginBottom: 20 }}>{title}</h2>
    <PieChart width={200} height={200}>
      <Pie dataKey='count' isAnimationActive={false} data={data} outerRadius={99} fill='#4354ba' />
      <Tooltip />
    </PieChart>
  </div>
);

interface IStatsYear {
  title: string;
  section: keyof YearsDataType;
  data: YearsDataType[];
}

export const StatsYear: React.FC<IStatsYear> = ({ title, data, section }) => {
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
        <Bar dataKey={section} fill='#4354ba' />
        <Tooltip />
      </BarChart>
    </div>
  );
};
