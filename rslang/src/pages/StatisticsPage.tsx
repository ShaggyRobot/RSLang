import React, { useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../RTK/store';
import Statistics from '../components/Statistics';

import { getStatisticsThunk } from '../RTK/slices/statistics/statistics-operations';
import { StatisticOptional } from '../components/types';

function StatisticsPage(): JSX.Element {
  const dataStatsSlice = useSelector((state: RootState) => state.statsSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStatisticsThunk());
  }, [dispatch]);

  const data = dataStatsSlice.optional
    ? (Object.values(dataStatsSlice.optional) as StatisticOptional[])
    : [];
  const dataAudioChallenge = data.filter(item => item.game === 'AudioChallenge');
  const dataSprintGame = data.filter(item => item.game === 'SprintGame');
  const dataLernWords = data.filter(item => item.game === 'LernWords');

  const noData = 'No data';

  return (
    <div className='page'>
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
            Audio Call
          </Typography>
          <Box>
            {dataAudioChallenge.length ? (
              <Statistics data={dataAudioChallenge} option={false} />
            ) : (
              <div>{noData}</div>
            )}
          </Box>
          <Typography component='h2' variant='h5'>
            Sprint
          </Typography>
          <Box>
            {dataSprintGame.length ? (
              <Statistics data={dataSprintGame} option={false} />
            ) : (
              <div>{noData}</div>
            )}
          </Box>
          <Typography component='h2' variant='h5'>
            Words
          </Typography>
          <Box>
            {dataLernWords.length ? (
              <Statistics data={dataLernWords} option={true} />
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
