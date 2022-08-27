export interface IError {
  message: string;
  code: string;
  response: {
    status: number;
  };
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

export interface StateOptions {
  token: null | string;
  message: null | string;
  userId: null | string;
  name: null | string;
  refreshToken: null | string;
  email: null | string;
}

export interface ActionOptions {
  payload: StateOptions;
}

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export interface SignUpAction {
  payload: {
    name: string;
    email: string;
    userId: string;
  };
}

export type SignInCredentials = {
  email: string;
  password: string;
};

// export interface DataWords {
//   id: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   textExampleTranslate: string;
//   textMeaningTranslate: string;
//   wordTranslate: string;
// }
