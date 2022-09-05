interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

const getWords = async (group = 0, page = 0): Promise<Array<IWord>> => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const response = await fetch(`${baseUrl}/words?group=${group}&page=${page}`);
  const words = await response.json();

  return words;
};

const getWordsWithoutPage = async (group = 0): Promise<Array<IWord>> => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const response = await fetch(`${baseUrl}/words?group=${group}`);
  const words = await response.json();

  return words;
};


export { getWords, type IWord, getWordsWithoutPage};
