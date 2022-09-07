import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Grid, Pagination } from '@mui/material';

import { AppDispatch, RootState } from '../../RTK/store';
import { getWordsThunk } from '../../RTK/slices/words/wordsSlice';

import Preloader from '../../components/preloader/preloader';
import { WordCard } from './WordCard';
import { IAudio } from '../../components/Interfaces/Iaudio';
import { getUserWordsThunk } from '../../RTK/slices/userWords/userWordsSlice';

function WordsPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { words, status } = useSelector((state: RootState) => state.wordsSlice);
  const { group, page } = useParams();
  const navigate = useNavigate();

  const [currentAudio, setCurrentAudio] = useState<IAudio | null>(null);

  useEffect(() => {
    const groupNum = parseInt(group || '0');
    const pageNum = parseInt(page || '0');
    dispatch(getWordsThunk({ group: groupNum, page: pageNum }));
  }, [group, page, dispatch]);

  useEffect(() => {
    currentAudio?.audio.play();
  }, [currentAudio]);

  const play = (id: string): void => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const word = words.find(word => word.id === id);

    const audioWord = new Audio(`${baseUrl}/${word!.audio}`);
    const audioMeaning = new Audio(`${baseUrl}/${word!.audioMeaning}`);
    const audioExample = new Audio(`${baseUrl}/${word!.audioExample}`);

    if (!currentAudio || !(currentAudio.id === id)) {
      currentAudio?.audio.pause();
      setCurrentAudio({ audio: audioWord, id });
      audioWord.onended = (): void => {
        setCurrentAudio({ audio: audioMeaning, id });
      };
      audioMeaning.onended = (): void => {
        setCurrentAudio({ audio: audioExample, id });
      };
      audioExample.onended = (): void => {
        setCurrentAudio(null);
      };
    } else if (currentAudio.id === id) {
      currentAudio.audio.pause();
      setCurrentAudio(null);
    }
  };

  const handleChange = (_: React.ChangeEvent<unknown>, page: number): void => {
    navigate(`/textbook/words/group=${group}&page=${page - 1}`);
  };

  const wordList = words.map(word => <WordCard word={word} play={play} key={word.id} />);

  return (
    <div className='page words-page'>
      <h1>{`Group ${Number(group) + 1} Page ${Number(page) + 1}`}</h1>
      <Container>
        <Pagination
          count={30}
          page={Number(page) + 1}
          variant='outlined'
          shape='rounded'
          onChange={handleChange}
          showFirstButton
          showLastButton
          sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
        />

        {status === 'resolved' ? (
          <Grid container spacing={2}>
            {wordList}
          </Grid>
        ) : (
          <Preloader />
        )}
      </Container>
    </div>
  );
}

export { WordsPage };
