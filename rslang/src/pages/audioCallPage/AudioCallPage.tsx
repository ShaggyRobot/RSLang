import React from 'react';
import { useSelector } from 'react-redux';

import { IWord } from '../../API/words';

import { RootState } from '../../RTK/store';

import { AudioCallGame } from './AudioCallGame';
import { DifficultySelect } from './difficultySelect';
import Preloader from '../../components/preloader/preloader';

function AudioCallPage(): JSX.Element {
  const wordsSlice = useSelector((state: RootState) => state.wordsSlice);

  const getRandomWords = (): Array<IWord> => {
    const words = wordsSlice.words;
    const rndWords: Set<IWord> = new Set();
    while (rndWords.size < words.length) {
      rndWords.add(words[Math.floor(Math.random() * 20)]);
    }
    return Array.from(rndWords);
  };

  return (
    <div className='page'>
      <div className='game' style={{ height: '100%' }}>
        {wordsSlice.status === 'loading' ? (
          <Preloader />
        ) : wordsSlice.status === 'resolved' ? (
          <AudioCallGame words={getRandomWords()} />
        ) : (
          <DifficultySelect />
        )}
      </div>
    </div>
  );
}

export { AudioCallPage };
