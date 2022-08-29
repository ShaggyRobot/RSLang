import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../components/Hooks/hook';
import { authOperations } from '../RTK/slices/auth';

import { SignInCredentials } from '../components/types';

const theme = createTheme();

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;

    switch (target.name) {
    case 'email':
      return setEmail(target.value);
    case 'password':
      return setPassword(target.value);
    default:
      return;
    }
  };

  const onSubmit = (): void => {
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              value={email}
              {...register('email', {
                required: 'Required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email, for example name@example.com',
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email ? errors?.email.message : null}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              {...register('password', {
                required: 'Required field',
                minLength: {
                  value: 10,
                  message: 'Password must be at least 10 characters',
                },
                pattern: {
                  value: /[0-9a-zA-Z!@#$%^&*]/,
                  message: 'Invalid characters for password',
                },
              })}
              error={!!errors?.password?.message}
              helperText={errors?.password ? errors?.password.message : null}
              onChange={handleChange}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export { SignIn };
