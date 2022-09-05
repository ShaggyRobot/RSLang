import React from 'react';
import { Chip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { IWord } from '../../API/words';

function AnswerElem({ answer, handler }: { answer: IWord; handler: Function }): JSX.Element {
  const baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `url(${baseURL}/${answer.image})`,
          width: 150,
          height: 150,
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      >
        <Chip
          label={answer.word}
          icon={<VolumeUpIcon />}
          onClick={(): void => handler()}
          variant='filled'
          color='success'
          style={{ margin: 'auto' }}
        />
      </div>
    </div>
  );
}

export { AnswerElem };
