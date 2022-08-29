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
