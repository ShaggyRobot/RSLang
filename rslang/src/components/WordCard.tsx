import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';

import { IWord } from '../API/words';

function WordCard({ word, play }: { word: IWord; play: Function }): JSX.Element {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return (
    <Grid item xs={12}>
      <Paper elevation={4}>
        <Card sx={{ display: 'flex' }}>
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
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}

export { WordCard };
