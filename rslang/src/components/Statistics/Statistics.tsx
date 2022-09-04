import * as React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Bar, ComposedChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { dataDate } from '../types';
import handlingData from './handlingData';

function Statistics(props: { data: dataDate[]; option: boolean }): JSX.Element {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    setDate(event.target.value as string);
  };

  const currentDate = handlingData(props.data);

  const filterDate = currentDate
    .map(item => item.fulldate)
    .filter((item, index: number, array) => array.indexOf(item) === index && item);

  const lastDate = filterDate[filterDate.length - 1];

  const [date, setDate] = React.useState(lastDate);

  const filterData = currentDate.filter(item => item.fulldate === date);
  return (
    <Box sx={{ color: 'text.primary', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl sx={{ width: 150 }} fullWidth>
        <InputLabel id='demo-simple-select-label'>Date</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={date}
          label='Date'
          onChange={handleChange}
        >
          {filterDate.map(item => (
            <MenuItem key={uuidv4()} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ComposedChart width={730} height={250} data={filterData}>
        <XAxis dataKey='time' />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign={'top'} />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar name='new words' dataKey='new' barSize={20} fill='#FFD700' />
        <Bar name='correct words' dataKey='correct' barSize={20} fill='#008000' />
        <Bar name='wrong words' dataKey='wrong' barSize={20} fill='#FF0000' />
        {!props.option && <Bar name='quantity' dataKey='quantity' barSize={20} fill='#ff7300' />}
        {props.option && <Bar name='percent' dataKey='percent' barSize={20} fill='#ff7300' />}
      </ComposedChart>
    </Box>
  );
}

export default Statistics;
