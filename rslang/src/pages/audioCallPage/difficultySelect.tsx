// import { Box, Button } from '@mui/material';
// import React from 'react';
// import { useDispatch } from 'react-redux';

// import { getWordsThunk } from '../../RTK/slices/words/wordsSlice';
// import { AppDispatch } from '../../RTK/store';

// function DifficultySelect(): JSX.Element {
//   const dispatch = useDispatch<AppDispatch>();

//   const getWords = (group: number): void => {
//     dispatch(getWordsThunk({ group, page: Math.floor(Math.random() * 29) }));
//   };

//   return (
//     <div>
//       <h1>Select Difficulty lvl:</h1>
//       <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
//         <Button variant='contained' onClick={(): void => getWords(0)}>
//           Easy 1
//         </Button>
//         <Button variant='contained' onClick={(): void => getWords(1)}>
//           Easy 2
//         </Button>
//         <Button variant='contained' onClick={(): void => getWords(2)}>
//           Medium 1
//         </Button>
//         <Button variant='contained' onClick={(): void => getWords(3)}>
//           Medium 2
//         </Button>
//         <Button variant='contained' onClick={(): void => getWords(4)}>
//           Hard 1
//         </Button>
//         <Button variant='contained' onClick={(): void => getWords(5)}>
//           Hard 2
//         </Button>
//       </Box>
//     </div>
//   );
// }

// export { DifficultySelect };

export {};
