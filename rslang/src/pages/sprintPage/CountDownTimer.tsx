import React from 'react';

import OpenModal from '../../components/Modal';

interface ICountdown {
  seconds: number;
}

const CountDownTimer = ({ seconds = 60 }: ICountdown): JSX.Element => {
  const [time, setTime] = React.useState<ICountdown>({ seconds });

  const tick = (): void => {
    if (time.seconds === 0) {
      reset();
      //добавить функцию диалогового окна
    } else {
      setTime({ seconds: time.seconds - 1 });
    }
  };

  const reset = (): void => setTime({ seconds: time.seconds });

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return <p className='timer'>{`${time.seconds.toString().padStart(1, '0')}`}</p>;
};

export default CountDownTimer;
