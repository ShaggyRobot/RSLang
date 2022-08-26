import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getWords, type IWord } from '../API/words';

function TextbookPage(): JSX.Element {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    getWords().then((words) => {
      setWords(words);
    });
  }, []);

  return (
    <div>
      <h1>Textbook Page</h1>
      <Box display='flex' gap={2} justifyContent='center' flexWrap='wrap'>
        <Button variant='contained' size='large' color='success'>
          <NavLink to='/textbook/words/group=0&page=0'>CATEGORY 1</NavLink>
        </Button>
        <Button variant='contained' size='large' color='success'>
          <NavLink to='/textbook/words/group=1&page=0'>CATEGORY 2</NavLink>
        </Button>
        <Button variant='contained' size='large' color='warning'>
          <NavLink to='/textbook/words/group=2&page=0'>CATEGORY 3</NavLink>
        </Button>
        <Button variant='contained' size='large' color='warning'>
          <NavLink to='/textbook/words/group=3&page=0'>CATEGORY 4</NavLink>
        </Button>
        <Button variant='contained' size='large' color='error'>
          <NavLink to='/textbook/words/group=4&page=0'>CATEGORY 5</NavLink>
        </Button>
        <Button variant='contained' size='large' color='error'>
          <NavLink to='/textbook/words/group=5&page=0'>CATEGORY 6</NavLink>
        </Button>
      </Box>
    </div>
  );
}

export { TextbookPage };
