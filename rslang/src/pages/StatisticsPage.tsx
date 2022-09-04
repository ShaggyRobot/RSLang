import React from 'react';
import { Typography, Container, Box } from '@mui/material';

import Statistics from '../components/Statistics';
import styles from './PagesStyle.module.scss';
import data from '../components/Statistics/db.json';

function StatisticsPage(): JSX.Element {
  const optionsData = data.statistics;
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
          }}
        >
          <Typography component='h2' variant='h5'>
            Sprint
          </Typography>
          <Box>
            {data.statistics.sprint.length ? (
              <Statistics data={optionsData.sprint} option={false} />
            ) : (
              <div>{noData}</div>
            )}
          </Box>
          <Typography component='h2' variant='h5'>
            Audio Call
          </Typography>
          <Box>
            {data.statistics.sprint.length ? (
              <Statistics data={optionsData.audio} option={false} />
            ) : (
              <div>{noData}</div>
            )}
          </Box>
          <Typography component='h2' variant='h5'>
            Words
          </Typography>
          <Box>
            {data.statistics.sprint.length ? (
              <Statistics data={optionsData.words} option={true} />
            ) : (
              <div>{noData}</div>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export { StatisticsPage };
