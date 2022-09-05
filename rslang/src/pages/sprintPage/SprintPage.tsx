import { useSelector } from 'react-redux';

import { IWord } from '../../API/words';
import Preloader from '../../components/preloader/preloader';
import { getRandomArr } from '../../components/utils/getRandomArr';

import { RootState } from '../../RTK/store';
import { DifficultySelect } from '../audioCallPage/difficultySelect';
import { SprintGame } from './SprintGame';
import './style.scss';

function SprintPage(): JSX.Element {
  const wordsSlice = useSelector((state: RootState) => state.wordsSlice);

  const words = wordsSlice.words;

  return (
    <div className='page sprint-page'>
      <div className='game' style={{ height: '100%' }}>
        {wordsSlice.status === 'loading' ? (
          <Preloader />
        ) : wordsSlice.status === 'resolved' ? (
          <SprintGame words={getRandomArr(words)} />
        ) : (
          <DifficultySelect />
        )}
      </div>
    </div>
  );
}

export { SprintPage };
