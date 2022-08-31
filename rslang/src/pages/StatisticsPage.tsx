import React from 'react';
import { Bar, ComposedChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';

import data from './db.json';

interface dataOptions {
  date: string;
  new: number;
  quantity: number;
  wrong: number;
  correct: number;
}

interface reternDataOptions {
  date: string;
  new: number;
  correct: number;
  wrong: number;
  percent: number;
}

function StatisticsPage(): JSX.Element {
  return (
    <div className='page'>
      <h1>Statistics Page</h1>
      <p>This is Statistics page</p>
      <ComposedChart width={730} height={250} data={handlingData(data.statistics.sprint)}>
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        {/* <Area type='monotone' dataKey='new' fill='#8884d8' stroke='#8884d8' /> */}
        {/* <Bar dataKey='total' barSize={20} fill='#0000FF' /> */}
        <Bar dataKey='new' barSize={20} fill='#FFD700' />
        <Bar dataKey='correct' barSize={20} fill='#008000' />
        <Bar dataKey='wrong' barSize={20} fill='#FF0000' />
        <Bar dataKey='percent' barSize={20} fill='#ff7300' />

        {/* <Line type='monotone' dataKey='wrong' stroke='#ff7300' /> */}
      </ComposedChart>
    </div>
  );
}

function handlingData(dataBase: dataOptions[]): reternDataOptions[] {
  return dataBase.map(item => {
    const newDate = new Date(item.date);
    const num = newDate.getDate();
    const month = newDate.getMonth();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    const fullDate = `${(9 < num ? '' : '0') + num}.${
      (9 < month ? '' : '0') + month
    }.${newDate.getFullYear()}`;
    const fullTime = `${(9 < hour ? '' : '0') + hour}${(9 < minute ? ':' : ':0') + minute}`;

    const date = `${fullDate} ${fullTime}`;
    const total = item.correct + item.wrong;
    const percent = Math.ceil((item.correct / total) * 100);

    return { date, new: item.new, correct: item.correct, wrong: item.wrong, percent };
  });
}

export { StatisticsPage };
