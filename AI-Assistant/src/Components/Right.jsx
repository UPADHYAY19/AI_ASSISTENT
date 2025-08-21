import './right.css';
import { URL } from '../const';
import { useState } from 'react';
import Answer from './Answer';

export function Right({ quest, setQuest, setHistory, setResult, result }) {
  const askQuestion = async () => {
    if (!quest.trim()) return;

    setHistory(prev => [...prev, quest]);

    const payload = {
      contents: [{ parts: [{ text: quest }] }]
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        console.error('Malformed response:', data);
        alert('Could not get a valid response from the server.');
        return;
      }

      const dataArray = rawText
        .split('* ')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      setResult(prev => [
        ...prev,
        { type: 'q', text: quest },
        { type: 'a', text: dataArray }
      ]);

      setQuest('');
    } catch (err) {
      console.error('Error during fetch:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="right-container">
      <div className="right-contents">
        <div className='right-heading'>
          <h2>Hello User, Ask Me Anything</h2>
        </div>

        <div className="output">
          <ul>
            {result.map((item, index) =>
              item.type === 'q' ? (
                <li key={`q-${index}`} className='que-style'>
                  <Answer ans={item.text} itemkey={index} />
                </li>
              ) : (
                item.text.map((ansItem, ansIndex) => (
                  <li key={`a-${index}-${ansIndex}`} className='ans-style'>
                    <Answer ans={ansItem} itemkey={ansIndex} />
                  </li>
                ))
              )
            )}
          </ul>
        </div>

        <div className='right-inputField'>
          <div className="back">
            <input
              type='text'
              placeholder='Ask me anything'
              value={quest}
              onChange={(e) => setQuest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  askQuestion()
                }
              }}
            />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
}

