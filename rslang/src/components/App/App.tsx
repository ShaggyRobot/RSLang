import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from '../../RTK/store';
import './App.scss';

import { ToastContainer } from 'react-toastify';

import { HomePage } from '../../pages/homePage/HomePage';
import { AboutPage } from '../../pages/aboutPage/AboutPage';
// import { SprintPage } from '../../pages/sprintPage/SprintPage';
import { TextbookPage } from '../../pages/TextbookPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
// import { AudioCallPage } from '../../pages/audioCallPage/AudioCallPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Layout } from '../Layout/Layout';
import { WordsPage } from '../../pages/WordsPage';

function App(): JSX.Element {
  // const authorized = useSelector((state: RootState) => state.authorized);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='textbook' element={<TextbookPage />} />
          <Route path='textbook/words/group=:group&page=:page' element={<WordsPage />} />
          <Route path='statistics' element={<StatisticsPage />} />

          {/* <Route path='sprint' element={<SprintPage />} />
          <Route path='audiocall' element={<AudioCallPage />} /> */}

          <Route path='signin' element={<SignIn />} />
          <Route path='singup' element={<SignUp />} />
          {/* <Route path="audiocall" element={<AudioCallPage />} /> */}

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
