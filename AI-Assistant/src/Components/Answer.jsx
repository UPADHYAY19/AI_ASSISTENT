
import { useState, useEffect } from 'react';
import './answer.css';
import { checkHeading, replaceHeading } from './helper';

const Answer = ({ ans, itemkey }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeading(ans));
    } else {
      setHeading(false);
      setAnswer(ans);
    }
  }, [ans]); // <-- ✅ DEPENDENCY UPDATED HERE

  return (
    <div className='text'>
      {heading ? (
        <span className='yes-heading'>{answer}</span>
      ) : (
        <span className='no-heading'>{answer}</span>
      )}
    </div>
  );
};

export default Answer;

