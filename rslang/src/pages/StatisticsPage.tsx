import React, { useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../RTK/store';
import Statistics from '../components/Statistics';
import styles from './PagesStyle.module.scss';

// import data from '../components/Statistics/db.json';
import { getStatisticsThunk } from '../RTK/slices/statistics/statistics-operations';

function StatisticsPage(): JSX.Element {
  const data = useSelector((state: RootState) => state.statsSlice);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(getStatisticsThunk());
  // });

  console.log(data);

  // const optionsData = data.statistics;
  const noData = 'No data';

  return (
    <div className={styles.statisticsPage}>
      <h1>Statistics Page</h1>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component='h2' variant='h5'>
            Sprint
          </Typography>
          <Box>
            {/* {data.statistics.sprint.length ? (
              <Statistics data={[]} option={false} />
            ) : (
              <div>{noData}</div>
            )} */}
          </Box>
          <Typography component='h2' variant='h5'>
            Audio Call
          </Typography>
          <Box>
            {/* {data.statistics.sprint.length ? (
              <Statistics data={[]} option={false} />
            ) : (
              <div>{noData}</div>
            )} */}
          </Box>
          <Typography component='h2' variant='h5'>
            Words
          </Typography>
          <Box>
            {/* {data.statistics.sprint.length ? (
              <Statistics data={[]} option={true} />
            ) : (
              <div>{noData}</div>
            )} */}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export { StatisticsPage };
