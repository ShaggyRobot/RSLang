// import { useSelector } from 'react-redux';

// import { IWord } from '../../API/words';
// import Preloader from '../../components/preloader/preloader';

// import { RootState } from '../../RTK/store';
// import { DifficultySelect } from '../audioCallPage/difficultySelect';
// import { SprintGame } from './SprintGame';
import './style.scss';

// function SprintPage(): JSX.Element {
//   const wordsSlice = useSelector((state: RootState) => state.wordsSlice);

//   const getRandomWords = (): Array<IWord> => {
//     const words = wordsSlice.words;
//     const rndWords: Set<IWord> = new Set();
//     while (rndWords.size < words.length) {
//       rndWords.add(words[Math.floor(Math.random() * 20)]);
//     }
//     return Array.from(rndWords);
//   };

//   return (
//     <div className='page sprintPages'>
//       <div className='game' style={{ height: '100%' }}>
//         {wordsSlice.status === 'loading' ? (
//           <Preloader />
//         ) : wordsSlice.status === 'resolved' ? (
//           <SprintGame words={getRandomWords()} />
//         ) : (
//           <DifficultySelect />
//         )}
//       </div>
//     </div>
//   );
// }

// export { SprintPage };

export {};
