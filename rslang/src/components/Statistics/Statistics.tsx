import { Bar, ComposedChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';

import handlingData from './handlingData';
import data from './db.json';

function Statistics(): JSX.Element {
  return (
    <ComposedChart width={730} height={250} data={handlingData(data.statistics.sprint)}>
      <XAxis dataKey='time' />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign={'top'} />
      <CartesianGrid stroke='#f5f5f5' />
      {/* <Area type='monotone' dataKey='new' fill='#8884d8' stroke='#8884d8' /> */}
      {/* <Bar dataKey='total' barSize={20} fill='#0000FF' /> */}
      <Bar name='new words' dataKey='new' barSize={20} fill='#FFD700' />
      <Bar name='correct words' dataKey='correct' barSize={20} fill='#008000' />
      <Bar name='wrong words' dataKey='wrong' barSize={20} fill='#FF0000' />
      {/* <Bar name='percent' dataKey='percent' barSize={20} fill='#ff7300' /> */}

      {/* <Line type='monotone' dataKey='wrong' stroke='#ff7300' /> */}
    </ComposedChart>
  );
}

export default Statistics;
