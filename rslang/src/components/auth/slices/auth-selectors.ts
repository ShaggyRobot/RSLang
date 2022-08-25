import { State } from '../../types';

const getIsAuthrnticated = (state: State): null | string => state.auth.token;

const getUsername = (state: State): null | string => state.auth.name;

const authSelectors = {
  getUsername,
  getIsAuthrnticated,
};

export default authSelectors;
