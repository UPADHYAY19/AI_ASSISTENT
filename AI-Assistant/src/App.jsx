import { useState } from 'react';
import './App.css';
import { Left } from './Components/Left';
import { Right } from './Components/Right';

function App() {
  const [quest, setQuest] = useState('');
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState([]);

  return (
    <div className='root-container'>
      <Left
        history={history}
        setHistory={setHistory}
        result={result}
        setResult={setResult}
      />
      <Right
        quest={quest}
        setQuest={setQuest}
        setHistory={setHistory}
        setResult={setResult}
        result={result}
      />
    </div>
  );
}

export default App;
