import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import Links from './Links';

export default function Footer(): JSX.Element {
  return (
    <footer className='footer'>
      <Container maxWidth='lg'>
        <Links />
        <Typography variant='body2' color='textSecondary'>
          © {new Date().getFullYear()} All rights reserved
        </Typography>
        <Box component='a' m={1} href='https://rs.school/js/'>
          <img
            src='https://app.rs.school/static/images/logo-rsschool3.png'
            alt='logo'
            className='logo'
          />
        </Box>
      </Container>
    </footer>
  );
}
