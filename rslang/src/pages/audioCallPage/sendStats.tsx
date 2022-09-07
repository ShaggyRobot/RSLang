import { IGameResult } from './AudioCallGame';

interface IGameStatsDTO {
  game: string,
  date: number;
  combo: number;
  learned: number;
  notLearned: number;
}

const sendStats = (
  game: string,
  gameStats: IGameResult,
  userWords: { id: string; difficulty: string; wordId: string }[],
): IGameStatsDTO => {
  const date = Date.now();
  // const userWords = useSelector((state: RootState) => state.userWordsSlice.words);
  const combo = gameStats.comboLongest;
  const wordsLearnedNew = gameStats.correct.filter(word =>
    userWords.every(userWord => userWord.id !== word.id),
  );
  const wordsNotLearned = gameStats.wrong;

  return {
    game,
    date,
    combo,
    learned: wordsLearnedNew.length,
    notLearned: wordsNotLearned.length,
  };
};

export { sendStats, type IGameStatsDTO };
