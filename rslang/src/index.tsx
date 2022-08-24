import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import './components/Menu/style.css';

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
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
