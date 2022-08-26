import { Container, Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getWords, IWord } from '../API/words';
import { WordCard } from '../components/WordCard';

interface IAudio {
  audio: HTMLAudioElement;
  id: string;
}

function WordsPage(): JSX.Element {
  const { group, page } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState<IWord[]>([]);

  const [currentAudio, setCurrentAudio] = useState<IAudio | null>(null);

  useEffect(() => {
    getWords(parseInt(group || '0'), parseInt(page || '0')).then((words) => {
      setWords(words);
    });
  }, [group, page]);

  useEffect(() => {
    currentAudio?.audio.play();
  }, [currentAudio]);

  const play = (id: string): void => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const word = words.find((word) => word.id === id);

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

  const wordList = words.map((word) => <WordCard word={word} play={play} key={word.id} />);

  return (
    <div>
      <h1>{`Group ${group} Page ${page}`}</h1>
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
        <Grid container spacing={2}>
          {wordList}
        </Grid>
      </Container>
    </div>
  );
}

export { WordsPage };
