import React from 'react';
import { Typography, Container, Box } from '@mui/material';

import Statistics from '../components/Statistics';
import SelectDate from '../components/Statistics/SelectDate';
import styles from './PagesStyle.module.scss';

function StatisticsPage(): JSX.Element {
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
          <SelectDate />
          <Typography component='h2' variant='h5'>
            Sprint
          </Typography>
          <Box>
            <Statistics />
          </Box>
          <Typography component='h2' variant='h5'>
            Audio Call
          </Typography>
          <Box>
            <Statistics />
          </Box>
          <Typography component='h2' variant='h5'>
            Words
          </Typography>
          <Box>
            <Statistics />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

// function StatisticsPage(): JSX.Element {
//   // const logOutHandler = () => dispatch(authOperations.logOut());
//   return (
//     <div className='page'>
//       <h1>Statistics Page</h1>

//       <div className={styles.statisticsPage}>
//         <Stack spacing={2} direction='row'>
//           <NavLink to='/statistics'>
//             <Button
//               type='button'
//               // onClick={logOutHandler}
//               color='success'
//               variant='contained'
//               size='small'
//             >
//               Daily
//             </Button>
//           </NavLink>
//           <NavLink to='/statistics/all'>
//             <Button
//               type='button'
//               // onClick={logOutHandler}
//               color='success'
//               variant='contained'
//               size='small'
//             >
//               All
//             </Button>
//           </NavLink>
//         </Stack>
//       </div>
//     </div>
//   );
// }

export { StatisticsPage };
