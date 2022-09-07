import { SprintGame } from './SprintGame';
import { IWord } from '../../API/words';

export const sprintRestart = (): void => {
  SprintGame({ words: [] });
};
