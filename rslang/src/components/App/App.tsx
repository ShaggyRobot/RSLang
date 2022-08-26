import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from '../../RTK/store';
import './App.scss';

import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { SprintPage } from '../../pages/SprintPage';
import { TextbookPage } from '../../pages/TextbookPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AudioCallPage } from '../../pages/AudioCallPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { Layout } from '../Layout/Layout';
import { WordsPage } from '../../pages/WordsPage';

function App(): JSX.Element {
  const authorized = useSelector((state: RootState) => state.authorized);

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

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
