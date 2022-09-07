import React from 'react';

export function Timer({ showResults }: { showResults: Function }): JSX.Element {
  const [counter, setCounter] = React.useState(60);

  React.useEffect(() => {
    if (counter === 0) {
      showResults();
    }
    if (counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer as NodeJS.Timer);
    }
  }, [counter]);

  return (
    <div className='timer'>
      <div id='timer'> {counter}</div>
    </div>
  );
}
