import React from 'react';
// import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// import { RootState } from '../../RTK/store';
import './App.scss';

import { ToastContainer } from 'react-toastify';

import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { SprintPage } from '../../pages/SprintPage';
import { TextbookPage } from '../../pages/TextbookPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AudioCallPage } from '../../pages/AudioCallPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { SignIn } from '../../pages/SignIn';
import { SignUp } from '../../pages/SignUp';
import { Layout } from '../Layout/Layout';
import { WordsPage } from '../../pages/WordsPage';

// import data from '../../pages/db.json';

// const data = {
//   statistics: {
//     sprint: [
//       {
//         date: 34534534534554,
//         new: 6,
//         quantity: 3,
//         wrong: 6,
//         correct: 12,
//       },
//     ],
//   },
// };

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
          <Route
            path='statistics'
            element={
              <StatisticsPage
              // date={data.statistics.sprint}
              />
            }
          />

          <Route path='sprint' element={<SprintPage />} />
          <Route path='audiocall' element={<AudioCallPage />} />

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
