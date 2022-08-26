import React from 'react';
import { Link, Theme } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles: Function = createUseStyles((theme: Theme) => ({
  root: {
    '& > * + *': {
      marginLeft: 16,
    },
  },
}));

export default function Links(): JSX.Element {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent): void => event.preventDefault();

  return (
    <div className={classes.root}>
      <Link
        href='https://github.com/ShaggyRobot'
        onClick={preventDefault}
        underline='none'
        color='white'
      >
        ShaggyRobot
      </Link>
      <Link
        href='https://github.com/AnatoliyIliev'
        onClick={preventDefault}
        underline='none'
        color='white'
      >
        AnatoliyIliev
      </Link>
      <Link
        href='https://github.com/shishel-zaitcevich'
        onClick={preventDefault}
        variant='body1'
        underline='none'
        color='white'
      >
        Shishel-Zaitcevich
      </Link>
    </div>
  );
}
