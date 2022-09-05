import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

import { ToastContainer } from 'react-toastify';

import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { SprintPage } from '../../pages/SprintPage';
import { TextbookPage } from '../../pages/TextbookPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AudioCallPage } from '../../pages/audioCallPage/AudioCallPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Layout } from '../Layout/Layout';
import { WordsPage } from '../../pages/WordsPage';

function App(): JSX.Element {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='textbook' element={<TextbookPage />} />
          <Route path='textbook/words/group=:group&page=:page' element={<WordsPage />} />
          <Route path='statistics' element={<StatisticsPage />} />

          <Route path='sprint' element={<SprintPage />} />
          <Route path='audiocall' element={<AudioCallPage />} />

          <Route path='signin' element={<SignIn />} />
          <Route path='singup' element={<SignUp />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
