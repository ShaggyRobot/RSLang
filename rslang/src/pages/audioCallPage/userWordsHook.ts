import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserWordsThunk,
  postUserWordsThunk,
  updateUserWordTrunk,
} from '../../RTK/slices/userWords/userWordsSlice';
import { AppDispatch, RootState } from '../../RTK/store';
import { IGameResult } from './AudioCallGame';

const useUserWords = (results: IGameResult): void => {
  const dispatch = useDispatch<AppDispatch>();
  const userWords = useSelector((state: RootState) => state.userWordsSlice.words);

  useEffect(() => {
    dispatch(getUserWordsThunk());
    return () => {
      console.log('unmount');
      dispatch(getUserWordsThunk());
    };
  }, []);

  results.correct.forEach(word => {
    if (!userWords.some(userWord => userWord.wordId === word.id)) {
      console.log('posting correct', word.id);
      dispatch(postUserWordsThunk({ id: word.id, difficulty: 'learned' }));
    } else if (
      userWords.find(
        userWord => userWord.wordId === word.id && userWord.difficulty === 'notLearned',
      )
    ) {
      console.log('notLearned --> learned', word.id, word.word);
      dispatch(updateUserWordTrunk({ id: word.id, difficulty: 'learned' }));
    }
  });

  results.wrong.forEach(word => {
    if (!userWords.some(userWord => userWord.wordId === word.id)) {
      console.log('posting incorrect', word.id);
      dispatch(postUserWordsThunk({ id: word.id, difficulty: 'notLearned' }));
    } else if (
      userWords.find(userWord => userWord.wordId === word.id && userWord.difficulty === 'learned')
    ) {
      console.log('learned --> notLearned', word.id, word.word);
      dispatch(updateUserWordTrunk({ id: word.id, difficulty: 'notLearned' }));
    }
  });
};

export { useUserWords };
