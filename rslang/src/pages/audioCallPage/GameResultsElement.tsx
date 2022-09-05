import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IWord } from '../../API/words';

interface IGameStats {
  correct: IWord[];
  wrong: IWord[];
  combo: number;
  comboLongest: number;
}

function GameResultsElement({
  stats,
  handleRestart,
}: {
  stats: IGameStats;
  handleRestart: Function;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <Paper className='game-results' elevation={5}>
      <Typography variant='h5'>{`Комбо: ${stats.comboLongest} слов подряд.`}</Typography>
      <Typography variant='h6'>Изучено:</Typography>
      <ul>
        {stats.correct.map(word => {
          return <li key={word.id}>{word.word}</li>;
        })}
      </ul>
      <Typography variant='h6'>Не изучено:</Typography>
      <ul>
        {stats.wrong.map(word => {
          return <li key={word.id}>{word.word}</li>;
        })}
      </ul>
      <div>
        <Button onClick={(): void => handleRestart()}>Ешё раз</Button>
        <Button onClick={(): void => navigate('/')}>Выйти</Button>
      </div>
    </Paper>
  );
}

export { GameResultsElement };
