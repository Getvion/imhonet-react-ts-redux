import React from 'react';

// import classes from './Stats.module.scss';

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
// ];

// export const Stats = () => (
//   <div>
//     <LineChart
//       width={500}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5
//       }}
//     >
//       <CartesianGrid strokeDasharray='3 3' />
//       <XAxis dataKey='name' />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
//       <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
//     </LineChart>
//   </div>
// );

import pie from './pie.png';
import graph from './stats-graph.png';
import year from './stats-2.png';

const StatsGraph = ({ title }: { title: string }) => (
  <div>
    <div>{title}</div>
    <span>(line in procent for each span)</span>
    <p>all: *line* a</p>
    <p>completed: *line* b</p>
    <p>later: *line* c</p>
    <p>favorite *line* : d</p>
  </div>
);

const StatsYear = ({ title }: { title: string }) => <div>{title}</div>;

const StatsGenres = ({ title }: { title: string }) => <div>{title}</div>;

export const Stats = () => (
  <>
    <img src={graph} alt='' />
    <div className='graph' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StatsGraph title='all' />
      <StatsGraph title='games' />
      <StatsGraph title='movies' />
      <StatsGraph title='shows' />
      <StatsGraph title='books' />
    </div>
    <hr />
    <div className='years'>
      <p> releas by year (bar charts)</p>
      <img src={year} alt='' />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <StatsYear title='all' />
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <StatsYear title='games' />
          <StatsYear title='movies' />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <StatsYear title='shows' />
          <StatsYear title='books' />
        </div>
      </div>
    </div>
    <hr />
    <div className='genres'>
      <p>genres (PieChart)</p>
      <img src={pie} alt='' />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StatsGenres title='all' />
        <StatsGenres title='games' />
        <StatsGenres title='movies' />
        <StatsGenres title='shows' />
        <StatsGenres title='books' />
      </div>
    </div>
  </>
);
