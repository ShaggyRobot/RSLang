import React from 'react';
import { Card, CardContent, CardMedia, Chip, Grid, Paper, Typography } from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';

import { useDispatch, useSelector } from 'react-redux';

import { IWord } from '../../API/words';
import { AppDispatch, RootState } from '../../RTK/store';
import { IUserWord, updateUserWordTrunk } from '../../RTK/slices/userWords/userWordsSlice';

function WordCard({ word, play }: { word: IWord; play: Function }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userWords = useSelector((state: RootState) => state.userWordsSlice.words);

  const isUserWord = (): IUserWord | undefined => {
    return userWords.find(userWord => userWord.wordId === word.id);
  };

  const setStyle = (): React.CSSProperties => {
    if (isUserWord()) {
      if (isUserWord()?.difficulty === 'notLearned') {
        return { display: 'flex', boxShadow: 'red 15px 6px 14px 0px inset' };
      }
      if (isUserWord()?.difficulty === 'learned') {
        return { display: 'flex', boxShadow: 'green 15px 6px 14px 0px inset' };
      }
    }
    return { display: 'flex' };
  };

  const moveToDifficult = (): void => {
    dispatch(updateUserWordTrunk({ id: word.id, difficulty: 'notLearned' }));
  };
  const moveToLearned = (): void => {
    dispatch(updateUserWordTrunk({ id: word.id, difficulty: 'learned' }));
  };

  const cardControls = (): JSX.Element => {
    if (isUserWord()) {
      if (isUserWord()?.difficulty === 'notLearned') {
        return (
          <div style={{ display: 'flex', paddingTop: '1rem', gap: '1rem' }}>
            <Chip label='в изученные' color='success' clickable onClick={moveToLearned} />
          </div>
        );
      }
      if (isUserWord()?.difficulty === 'learned') {
        return (
          <div style={{ display: 'flex', paddingTop: '1rem', gap: '1rem' }}>
            <Chip label='в сложные' color='error' clickable onClick={moveToDifficult} />
          </div>
        );
      }
    }
    return (
      <div style={{ display: 'flex', paddingTop: '1rem', gap: '1rem' }}>
        <Chip label='в сложные' color='error' clickable />
        <Chip label='в изученные' color='success' clickable />
      </div>
    );
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={4}>
        <Card sx={setStyle()}>
          <CardMedia
            component='div'
            style={{
              backgroundImage: `url(${baseUrl}/${word.image})`,
              minWidth: 200,
            }}
          />
          <CardContent>
            <Typography variant='h5' component='div' align='left' display='flex'>
              {`${word.word} : ${word.transcription}`}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                }}
                onClick={(): void => play(word.id)}
              >
                <HeadsetIcon color='info' />
              </div>
            </Typography>
            <Typography variant='body1' component='div' align='left' gutterBottom>
              <div dangerouslySetInnerHTML={{ __html: word.wordTranslate }} />
            </Typography>
            <Typography variant='body1' component='div' align='left'>
              <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            </Typography>
            <Typography variant='body2' color='GrayText' component='div' align='left' gutterBottom>
              {word.textMeaningTranslate}
            </Typography>
            <Typography variant='body1' component='div' align='left'>
              <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
            </Typography>
            <Typography variant='body2' color='GrayText' component='div' align='left'>
              {word.textExampleTranslate}
            </Typography>
            {cardControls()}
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}

export { WordCard };
