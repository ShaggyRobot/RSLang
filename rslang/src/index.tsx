import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'react-jss';

import store from './RTK/store';

import App from './components/App/App';

import './index.scss';

const theme = {
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#80d8ff',
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
