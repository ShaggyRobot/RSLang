import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../RTK/store';

import { AudioCallGame } from './AudioCallGame';
import { DifficultySelect } from './difficultySelect';
import { getRandomArr } from '../../components/utils/getGandomArr';
import Preloader from '../../components/preloader/preloader';

function AudioCallPage(): JSX.Element {
  const wordsSlice = useSelector((state: RootState) => state.wordsSlice);

  return (
    <div className='page'>
      <div className='game' style={{ height: '100%' }}>
        {wordsSlice.status === 'loading' ? (
          <Preloader />
        ) : wordsSlice.status === 'resolved' ? (
          <AudioCallGame words={getRandomArr(wordsSlice.words)} />
        ) : (
          <DifficultySelect />
        )}
      </div>
    </div>
  );
}

export { AudioCallPage };
