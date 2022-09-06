import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Button } from '@mui/material';

import { IWord } from '../../API/words';
import { IAudio } from '../../components/Interfaces/Iaudio';
import { AnswerElem } from './AnswerElem';
import { GameResultsElement } from './GameResultsElement';

import './audio-call.scss';

import { AppDispatch, RootState } from '../../RTK/store';
import { putStatisticsThunk } from '../../RTK/slices/statistics/statistics-operations';
import {
  deleteUserWordThunk,
  getUserWordsThunk,
  postUserWordsThunk,
  updateUserWordTrunk,
} from '../../RTK/slices/userWords/userWordsSlice';
import { sendStats } from './sendStats';

interface IGameState {
  answer: IWord | null;
  variants: IWord[];
  finished: boolean;
}

interface IGameResult {
  correct: IWord[];
  wrong: IWord[];
  combo: number;
  comboLongest: number;
}

function AudioCallGame({ words }: { words: IWord[] }): JSX.Element {
  const userWords = useSelector((state: RootState) => state.userWordsSlice.words);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch<AppDispatch>();
  const [currentAudio, setCurrentAudio] = useState<IAudio | null>(null);
  const [answerGiven, setAnswerGiven] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const [gameState, setGameState] = useState<IGameState>({
    answer: null,
    variants: [],
    finished: false,
  });

  const stats = useRef<IGameResult>({
    correct: [],
    wrong: [],
    combo: 0,
    comboLongest: 0,
  });

  const wordsInGame = useRef<IWord[]>([...words]);

  useEffect(() => {
    setWord();
  }, []);

  useEffect(() => {
    currentAudio?.audio.play();
  }, [currentAudio]);

  const handlePlay = (): void => {
    if (currentAudio) {
      currentAudio.audio.play();
    }
  };

  const setWord = (): void => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    setAnswerGiven(null);
    const vars = new Set<IWord>();

    const answer = wordsInGame.current.pop();
    if (answer) {
      setAnswer(answer.id);
      setAnswerGiven(null);
      vars.add(answer);
      const audio = new Audio(`${baseUrl}/${answer?.audio}`);
      audio.volume = 0.1;
      setCurrentAudio({ audio, id: answer.id });
      while (vars.size < 5) {
        vars.add(words[Math.floor(Math.random() * words.length)]);
      }
      const varsArr = Array.from(vars);

      const varsShuffled = varsArr
        .map(variant => ({ variant, idx: Math.random() }))
        .sort((a, b) => a.idx - b.idx)
        .map(elem => elem.variant);

      setGameState({ ...gameState, answer, variants: varsShuffled, finished: false });
    } else {
      // ? ----------------------------------------------------------------------------------

      try {
        stats.current.correct.forEach(word => {
          if (!userWords.some(userWord => userWord.wordId === word.id)) {
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

        stats.current.wrong.forEach(word => {
          if (!userWords.some(userWord => userWord.wordId === word.id)) {
            dispatch(postUserWordsThunk({ id: word.id, difficulty: 'notLearned' }));
          } else if (
            userWords.find(
              userWord => userWord.wordId === word.id && userWord.difficulty === 'learned',
            )
          ) {
            console.log('learned --> notLearned', word.id, word.word);
            dispatch(updateUserWordTrunk({ id: word.id, difficulty: 'notLearned' }));
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(getUserWordsThunk()).then(() => {
          dispatch(putStatisticsThunk({ optional: sendStats(stats.current, userWords) }));
        });
      }

      // userWords.forEach(w => {
      //   dispatch(deleteUserWordThunk({id: w.wordId}));
      // });

      setGameState({ ...gameState, finished: true });
      setCurrentAudio(null);
      const optional = JSON.stringify(stats.current);
    }
  };

  const handleAnswer = (id: string): void => {
    if (!answerGiven) {
      setAnswerGiven(id);
      if (gameState.answer) {
        if (id === gameState.answer.id) {
          stats.current.combo += 1;
          if (stats.current.comboLongest < stats.current.combo)
            stats.current.comboLongest = stats.current.combo;
          stats.current.correct.push(gameState.answer);
        } else {
          stats.current.combo = 0;
          stats.current.wrong.push(gameState.answer);
        }
      }
    }
  };

  const handleNext = (): void => {
    if (answerGiven) {
      setWord();
    } else {
      setAnswerGiven(null);
      stats.current.wrong.push(gameState.answer!);
      setWord();
    }
  };

  const handleRestart = (): void => {
    stats.current = {
      correct: [],
      wrong: [],
      combo: 0,
      comboLongest: 0,
    };
    wordsInGame.current = [...words];
    setWord();
  };

  const setStyle = (id: string): 'success' | 'error' | 'primary' => {
    if (answerGiven && id === answer) {
      return 'success';
    }
    if (answerGiven === id && id !== answer) {
      return 'error';
    }
    return 'primary';
  };

  return gameState.finished ? (
    <GameResultsElement stats={stats.current} handleRestart={handleRestart} />
  ) : (
    <div className='game-field'>
      {answerGiven ? (
        <AnswerElem answer={gameState.answer!} handler={handlePlay} />
      ) : (
        <button className='play-audio-btn' onClick={handlePlay}>
          <VolumeUpIcon className='volume-icon' sx={{ fontSize: '3rem' }} />
        </button>
      )}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {gameState.variants.map(v => (
          <Button
            variant='contained'
            color={setStyle(v.id)}
            key={v.id}
            onClick={(): void => handleAnswer(v.id)}
          >
            {v.wordTranslate}
          </Button>
        ))}
      </div>
      <div>
        <Button
          sx={{ width: '15rem', height: '3rem', borderRadius: '3rem' }}
          variant='contained'
          color='secondary'
          onClick={handleNext}
        >
          {answerGiven ? <span>&rarr;</span> : 'Не знаю'}
        </Button>
      </div>
    </div>
  );
}

export { AudioCallGame, type IGameResult };
