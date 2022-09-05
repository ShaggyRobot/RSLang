import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearStateAction } from '../RTK/slices/words/wordsSlice';

function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearStateAction());
  }, []);

  return (
    <div className='page'>
      <h1>Home Page</h1>
      <p>This is home page</p>
    </div>
  );
}

export { HomePage };
