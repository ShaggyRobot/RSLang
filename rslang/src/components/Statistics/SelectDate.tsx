import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { dataOptions, reternDataOptions } from '../types';
import handlingData from './handlingData';

export default function SelectDate(): JSX.Element {
  const [date, setDate] = React.useState('');

  const handleChange = (event: SelectChangeEvent<string>): void => {
    setDate(event.target.value as string);
  };

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
          {handlingData.map((item: reternDataOptions) => {
            return <MenuItem value={item.fulldate}>{item.fulldate}</MenuItem>;
          })}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
