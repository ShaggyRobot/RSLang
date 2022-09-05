import React, { useMemo } from 'react';
import { useEffect, useRef, useState } from 'react';

import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';

import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';

import { Button, Stack } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import CountDownTimer from './CountDownTimer';
import { getRandomIndex } from '../../components/utils/getRandomIndex';
import { IWord } from '../../API/words';
import OpenModal from '../../components/Modal';

function SprintGame({ words }: { words: IWord[] }): JSX.Element {
  const [index, setIndex] = useState(0);
  const [statistic, setStatistic] = useState<{
    correctAnswers: IWord[];
    incorrectAnswers: IWord[];
    combo: number;
  }>({
    correctAnswers: [],
    incorrectAnswers: [],
    combo: 0,
  });

  const currentWord = useMemo(() => {
    return words[index].word.toLocaleUpperCase();
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
        return {
          ...prevStatistic,
          corretAnswers: prevStatistic.correctAnswers.push(word),
          combo: prevStatistic.combo + 1,
        };
      });
    } else {
      setStatistic(prevStatistic => {
        return {
          ...prevStatistic,
          incorretAnswers: prevStatistic.incorrectAnswers.push(word),
          combo: 0,
        };
      });
    }
    if (index < words.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('end');
    }
  };

  const translateWord = wordTranslateArr[getRandomIndex(index, wordTranslateArr.length)];
  console.log(statistic, translateWord, index);
  return (
    <div className='sprint'>
      <CountDownTimer seconds={30} />
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

//1. ф-я, когда игра закончилась
//2. ф-я, кот будет чистить statistic, при запуске игры заново
//3. ф-я, кот запускать игру заново при нажатии на кнопку играть еще
//4. разделить на компоненты
//5. изменить checkanswer
// 6/ useEffect - как только комбо = 3, сделать анимацию + прибавление очков
//7. таймер через сетинтервал - переменную , кот будет уменьшаться каждую секунду + ее обнуление
