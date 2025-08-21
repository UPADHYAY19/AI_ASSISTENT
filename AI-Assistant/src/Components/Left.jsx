import { useEffect } from 'react';
import './left.css';
import historyIcon from '../assets/_clock_alarm_time_schedule_history_watch-1024.webp';

export function Left({ history, setHistory, result, setResult }) {
const handleDelete = (indexToDelete) => {
  const deletedQuestion = history[indexToDelete];

  // Update history
  const newHistory = history.filter((_, i) => i !== indexToDelete);
  setHistory(newHistory);

  // Find the index of the matching question in result
  let qIndex = -1;

  for (let i = 0; i < result.length; i++) {
    if (result[i].type === 'q' && result[i].text === deletedQuestion) {
      qIndex = i;
      break;
    }
  }

  if (qIndex === -1) return;

  // Delete that question and its corresponding answer
  const newResult = result.filter((_, i) => i !== qIndex && i !== qIndex + 1);
  setResult(newResult);
};


  return (
    <div className="left-container">
      <div className='left-contents'>
        <span>Recent Searches</span>
       <img src={historyIcon} alt="history-icon" />


      </div>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            {item}
            <span className="delete-icon" onClick={() => handleDelete(index)}>🗑️</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
