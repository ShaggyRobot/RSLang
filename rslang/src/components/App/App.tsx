import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

import { ToastContainer } from 'react-toastify';

import { HomePage } from '../../pages/homePage/HomePage';
import { AboutPage } from '../../pages/aboutPage/AboutPage';
import { SprintPage } from '../../pages/sprintPage/SprintPage';
import { TextbookPage } from '../../pages/TextbookPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AudioCallPage } from '../../pages/audioCallPage/AudioCallPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Layout } from '../Layout/Layout';
import { WordsPage } from '../../pages/wordsPage/WordsPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../RTK/store';
import { getUserWordsThunk } from '../../RTK/slices/userWords/userWordsSlice';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserWordsThunk());
  }, [dispatch]);
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
