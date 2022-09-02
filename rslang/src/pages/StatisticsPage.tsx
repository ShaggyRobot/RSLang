import React from 'react';
import { Button, Stack } from '@mui/material';

// import { authOperations } from '../RTK/';
import styles from './PagesStyle.module.scss';
// <div className={stules.statisticsPage}></div>

function StatisticsPage(): JSX.Element {
  // const logOutHandler = () => dispatch(authOperations.logOut());
  return (
    <div className='page'>
      <h1>Statistics Page</h1>
      <div className={styles.statisticsPage}>
        <Stack spacing={2} direction='row'>
          <Button
            type='button'
            // onClick={logOutHandler}
            color='success'
            variant='contained'
            size='small'
          >
            Daily
          </Button>
          <Button
            type='button'
            // onClick={logOutHandler}
            color='success'
            variant='contained'
            size='small'
          >
            All
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export { StatisticsPage };
