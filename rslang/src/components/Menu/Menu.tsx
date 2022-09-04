/* eslint-disable react/jsx-no-undef */
import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createUseStyles } from 'react-jss';

import { NavLink } from 'react-router-dom';

import { navMenu } from '../../constants/menu';

import './style.scss';

const drawerWidth = 240;

const useStyles: Function = createUseStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: 'all 225ms linear',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: 'all 225ms linear',
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    transition: 'all 225ms linear',
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: 'all 225ms linear',
    marginRight: 0,
  },
}));

export default function PersistentDrawerRight(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            RS Lang
          </Typography>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {navMenu.map(({ name, path, icon }, index) => {
          return (
            <MenuItem key={name}>
              {icon}
              <NavLink to={path}>{name}</NavLink>
            </MenuItem>
          );
        })}
        <Divider />
      </Drawer>
    </div>
  );
}
