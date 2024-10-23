import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <p className='text-emerald-400'>count is {count}</p>
      <button onClick={increaseCount}>increase</button>
      <button onClick={decreaseCount}>decrease</button>
    </>
  );
}

export default App;
