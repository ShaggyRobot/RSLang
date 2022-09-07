import React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';

import { SignUpCredentials } from '../components/types';

import { useAppDispatch } from '../components/Hooks/hook';
import { authOperations } from '../RTK/slices/auth';

const theme = createTheme();

function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        return setName(target.value);
      case 'email':
        return setEmail(target.value);
      case 'password':
        return setPassword(target.value);
      default:
        return;
    }
  };

  const onSubmit = (): void => {
    dispatch(authOperations.logUp({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpCredentials>();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>

          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                  value={name}
                  {...register('name', {
                    required: 'Required field',
                    min: {
                      value: 1,
                      message: 'Enter your name',
                    },
                  })}
                  error={!!errors?.name?.message}
                  helperText={errors?.name ? errors?.name?.message : null}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  type='email'
                  label='Email Address'
                  autoComplete='email'
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
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
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export { SignUp };
