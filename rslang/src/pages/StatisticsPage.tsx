import React from 'react';
import { Bar } from 'react-chartjs-2';

import data from './db.json';

function StatisticsPage(): JSX.Element {
  const dataBase = data.statistics.sprint.map(item => {
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

  return (
    <div className='page'>
      <h1>Statistics Page</h1>
      <p>This is Statistics page</p>
      <Bar
        data={{
          labels: ['date', 'new', 'quantity', 'wrong', 'correct'],
          datasets: [
            {
              label: 'sprint',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={600}
        height={400}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export { StatisticsPage };
