import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [pwd, setPwd] = useState('~ ');
  const user = "guest@openai.maxfelker.com";

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleFormSubmit = useCallback(function(event) {
    event.preventDefault();
    setHistory(prevHistory => [...prevHistory, inputValue]);
    setInputValue('');
  }, [setHistory, setInputValue, inputValue]);

  useEffect(function() {
    function handleEnterPress(event) {
      if (event.key === 'Enter') {
        handleFormSubmit(event);
      }
    }
    window.addEventListener('keydown', handleEnterPress);
    return function cleanup() {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [handleFormSubmit]);

  return (
    <>
      <div className={styles.historyList}>
        {history.map((command, index) => (
          <p key={index}>{command}</p>
        ))}
      </div>
      <form name="terminal" onSubmit={handleFormSubmit}>
        <label htmlFor="cli-input">
          <p>{user}:{pwd}</p>
        </label>
        <input name="cli-input" type="text" autoFocus value={inputValue} onChange={handleInputChange} />
      </form>
    </>
  );
}