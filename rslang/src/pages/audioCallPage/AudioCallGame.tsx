import React, { useEffect, useRef, useState } from 'react';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { IWord } from '../../API/words';

import './audio-call.scss';

function AudioCallGame({ words }: { words: IWord[] }): JSX.Element {
  const [variants, setVariants] = useState<{ answer: IWord | null; variants: IWord[] }>({
    answer: null,
    variants: [],
  });

  const result = useRef<{ correct: IWord[]; wrong: IWord[] }>({
    correct: [],
    wrong: [],
  });

  const wordsInGame = useRef<IWord[]>([...words]);
  console.log(wordsInGame.current);

  useEffect(() => {
    setGame();
  }, []);

  const uselesCallback = (): void => {
    console.log('useless', variants.answer);
  };

  const setGame = (): void => {
    const vars = new Set<IWord>();
    const answer = wordsInGame.current.pop();
    if (answer) {
      vars.add(answer);
      while (vars.size < 5) {
        vars.add(words[Math.floor(Math.random() * words.length)]);
      }
      console.log(answer.word, words.length, result.current);
      const varsArr = Array.from(vars);

      const varsShuffled = varsArr
        .map(variant => ({ variant, idx: Math.random() }))
        .sort((a, b) => a.idx - b.idx)
        .map(elem => elem.variant);
      setVariants({ answer, variants: varsShuffled });
    } else {
      console.log('DONE');
      wordsInGame.current = [...words];
      setGame();
    }
    console.log(`Answer is: ${answer?.word}`);
  };

  const handleAnswer = (id: string): void => {
    if (variants.answer) {
      if (id === variants.answer.id) {
        console.log('CORRECT');
        result.current.correct.push(variants.answer);
        setGame();
      } else {
        console.log('WRONG');
        result.current.wrong.push(variants.answer);
        setGame();
      }
    }
  };

  return (
    <div className='game-field'>
      <button className='play-audio-btn'>
        <VolumeUpIcon className='volume-icon' sx={{ fontSize: '3rem' }} />
      </button>
      <div>
        {variants.variants.map(v => (
          <button key={v.id} onClick={(): void => handleAnswer(v.id)}>
            {v.word}
          </button>
        ))}
      </div>
      <div style={{ color: 'white' }}>{wordsInGame.current.map(el => JSON.stringify(el.word))}</div>
    </div>
  );
}

export { AudioCallGame };
