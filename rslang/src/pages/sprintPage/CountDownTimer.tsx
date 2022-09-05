import React from 'react';

export function Timer(): JSX.Element {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timer);
  }, [counter]);

  return (
    <div className='timer'>
      <div> {counter}</div>
    </div>
  );
}
