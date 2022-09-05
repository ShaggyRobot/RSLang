import { IWord } from '../../API/words';

export const getRandomArr = (arr: Array<IWord>): Array<IWord> => {
  const rndArr: Set<IWord> = new Set();
  while (rndArr.size < arr.length) {
    rndArr.add(arr[Math.floor(Math.random() * arr.length)]);
  }
  return Array.from(rndArr);
};
