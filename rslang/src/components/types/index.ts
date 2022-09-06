import { IGameStatsDTO } from '../../pages/audioCallPage/sendStats';

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

export interface ModalChildrenProps {
  basename?: string;
  children?: React.ReactNode;
  window?: Window;
  nameOption?: string;
}

export interface returnDataOptions {
  fulldate: string;
  time: string;
  new: number;
  correct: number;
  wrong: number;
  percent: number;
  total: number;
}

export interface DataOptions {
  learnedWords: number;
  optional: {};
  status: null | string;
}

export interface dataDate {
  date: number;
  new: number;
  wrong: number;
  correct: number;
  quantity?: number;
  learn?: number;
}

export interface StatisticOptional {
  combo: number;
  date: number;
  game: string;
  learned: number;
  notLearned: number;
}

export interface putOptionsThunk {
  [key: string]: IGameStatsDTO;
}

export interface putGameOptions {
  AudioChallenge: putOptionsThunk;
}
