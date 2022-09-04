import * as React from 'react';

import { Bar, ComposedChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { dataDate, reternDataOptions } from '../types';
import handlingData from './handlingData';

function Statistics(props: { data: dataDate[]; option: boolean }): JSX.Element {
  const [date, setDate] = React.useState('');

  const handleChange = (event: SelectChangeEvent<string>): void => {
    setDate(event.target.value as string);
  };

  const currentDate = handlingData(props.data);

  return (
    <Box sx={{ width: 150, color: 'text.primary', alignItems: 'center' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Date</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={date}
          label='Date'
          onChange={handleChange}
        >
          {currentDate.map((item: reternDataOptions) => {
            return <MenuItem value={item.fulldate}>{item.fulldate}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <ComposedChart width={730} height={250} data={currentDate}>
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
        {!props.option && <Bar name='quantity' dataKey='quantity' barSize={20} fill='#ff7300' />}
        {props.option && <Bar name='percent' dataKey='percent' barSize={20} fill='#ff7300' />}

        {/* <Line type='monotone' dataKey='wrong' stroke='#ff7300' /> */}
      </ComposedChart>
    </Box>
  );
}
/*
 To Do


 3. Придумать отправку данных и их получение.

 */

export default Statistics;
