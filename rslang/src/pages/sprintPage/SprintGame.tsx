import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';

import { AppDispatch, RootState } from '../../RTK/store';

import { IWord } from '../../API/words';
import { Timer } from './CountDownTimer';
import { getRandomIndex } from '../../components/utils/getRandomIndex';
import { GameResultsElement, IGameStats } from '../audioCallPage/GameResultsElement';
import { useUserWords } from '../audioCallPage/userWordsHook';
import { sendStats } from '../audioCallPage/sendStats';
import { putStatisticsThunk } from '../../RTK/slices/statistics/statistics-operations';

function SprintGame({ words }: { words: IWord[] }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthrnticated = useSelector((state: RootState) => state.auth?.token);
  const getStatistics = useSelector((state: RootState) => state.statsSlice);
  const userWords = useSelector((state: RootState) => state.userWordsSlice.words);

  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<IGameStats>({
    correct: [],
    wrong: [],
    combo: 0,
    comboLongest: 0,
  });

  const [statistic, setStatistic] = useState<IGameStats>({
    correct: [],
    wrong: [],
    combo: 0,
    comboLongest: 0,
  });

  const [openResult, setOpenResult] = useState(false);

  useUserWords(result);

  const currentWord = useMemo(() => {
    return words[index].word.toUpperCase();
  }, [words, index]);

  const wordTranslateArr = useMemo(() => {
    return words.map(word => {
      return word.wordTranslate;
    });
  }, [words]);

  const checkAnswer = (word: IWord, translate: string, type: boolean): void => {
    const isCorrect = word.wordTranslate === translate;

    if (isCorrect === type) {
      setStatistic(prevStatistic => {
        prevStatistic.correct.push(word);
        return {
          ...prevStatistic,
          combo: (prevStatistic.combo += 1),
          comboLongest:
            prevStatistic.comboLongest < prevStatistic.combo
              ? (prevStatistic.comboLongest = prevStatistic.combo)
              : prevStatistic.comboLongest,
        };
      });
    } else {
      setStatistic(prevStatistic => {
        prevStatistic.wrong.push(word);
        return {
          ...prevStatistic,
          combo: 0,
        };
      });
    }
    if (index < words.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      setOpenResult(true);
      if (isAuthrnticated) {
        try {
          setResult(statistic);
        } catch (error) {
          throw error;
        } finally {
          const dateNow = Date.now().toString();

          const options = {
            ...getStatistics.optional,
            [dateNow]: { ...sendStats('SprintGame', statistic, userWords) },
          };

          dispatch(
            putStatisticsThunk({
              optional: options,
            }),
          );
        }
      }
    }
  };

  const restart = (): void => {
    setStatistic({
      correct: [],
      wrong: [],
      combo: 0,
      comboLongest: 0,
    });
    setOpenResult(false);
    setIndex(0);
  };

  const translateWord = wordTranslateArr[getRandomIndex(index, wordTranslateArr.length)];
  if (openResult) {
    return <GameResultsElement stats={statistic} handleRestart={restart} />;
  }
  return (
    <div className='sprint'>
      <Timer showResults={(): void => setOpenResult(true)} />
      <div className='games-field'>
        <CardContent className='card-content'>
          <Typography className='word-text'>{`${currentWord}`.toUpperCase()}</Typography>
          <Typography className='word-text'>{`${translateWord}`}</Typography>
        </CardContent>
        <CardActions>
          <Stack direction='row' spacing={2}>
            <Button
              onClick={(): void => checkAnswer(words[index], translateWord, true)}
              variant='contained'
              startIcon={<ArrowCircleLeftSharpIcon />}
            >
              Верно
            </Button>
            <Button
              onClick={(): void => checkAnswer(words[index], translateWord, false)}
              variant='contained'
              endIcon={<ArrowCircleRightSharpIcon />}
            >
              Неверно
            </Button>
          </Stack>
        </CardActions>
      </div>
    </div>
  );
}

export { SprintGame };
