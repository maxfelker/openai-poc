import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleFormSubmit = useCallback(function(event) {
    event.preventDefault();
    setHistory(prevHistory => [...prevHistory, inputValue]);

    if (inputValue.startsWith('/')) {
      const commandString = inputValue.split('/');
      if(commandString.length > 1) {
        const command = commandString[1];
        console.log(command);

        let message;

        switch(command) {
          case 'help':
            message = "Available commands: \n /help \n /whoami \n /clear";
            setOutput(prevOutput => [message, ...prevOutput]);
            break;
          case 'clear':
            setOutput([]);
            break;
          default:
            setOutput(prevOutput => [`Command ${command} not found`, ...prevOutput]);
            break;
        }
      } 
    } else {
      setOutput(prevOutput => [inputValue, ...prevOutput]);
    }

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
      <div className={styles.stdOut}>
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <form name="terminal" onSubmit={handleFormSubmit}>
        <label htmlFor="cli-input">
        </label>
        <input placeholder="Use /help to see all the commands" name="cli-input" type="text" autoFocus value={inputValue} onChange={handleInputChange} />
      </form>
    </>
  );
}