import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearStateAction, getWordsThunk } from '../../RTK/slices/words/wordsSlice';

import { AppDispatch } from '../../RTK/store';
import './style.scss';

function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearStateAction());
  }, []);

  return (
    <div className='page home-page'>
      <div className='home-content'>
        <div className='new-words'>
          <img src='../../../../public/images/progress.png' alt='' />
          <h2>Изучение новых слов и выражений</h2>
          <p>
            В учебнике собраны 3600 наиболее используемых в повседневной жизни слов, которые
            озвучены, переведены на русский язык и имеют реальный пример использования.
          </p>
        </div>
        <div className='vocabulary'>
          <h2>Повторение</h2>
          <p>
            Все изученные слова попадают в словарь. Можно отметить сложные для запоминания слова,
            чтобы знать, на что нужно чаще обращать внимание!
          </p>
        </div>
        <div className='statistics'>
          <h2>Отслеживание прогресса</h2>
          <p>
            В личном кабинете можно следить за своим прогрессом: сколько слов уже изучено всего и за
            каждый день.
          </p>
        </div>
      </div>
    </div>
  );
}

export { HomePage };
