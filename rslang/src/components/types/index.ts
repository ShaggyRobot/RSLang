export interface DataWords {
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
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface State {
  auth: {
    token: null | string;
    message: null | string;
    userId: null | string;
    name: null | string;
    refreshToken: null | string;
  };
}

export interface DataUser {
  id: string;
  name: string;
  email: string;
}

export type Credentials = {
  email: string;
  password: string;
};

export interface InitialStateOptions {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
}

export interface AuthSlise {
  name: string;
  initialState: InitialStateOptions;
  extraReducers: {};
}
