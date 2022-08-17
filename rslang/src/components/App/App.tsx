import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../RTK/store';
import './App.scss';

function App(): JSX.Element {
  const authorized = useSelector((state: RootState) => state.authorized);

  return <div className='App'>App {authorized.toString()}</div>;
}

export default App;
