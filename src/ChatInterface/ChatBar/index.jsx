import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createMessage } from '../service.messages';
import styles from './styles.module.css';

ChatBar.propTypes = {
  onAttemptCreateMessage: PropTypes.func.isRequired,
  onMessageCreated: PropTypes.func.isRequired,
};

export default function ChatBar(props) {
  const { onMessageCreated, onAttemptCreateMessage } = props;
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const handleFormSubmit = useCallback(function(event) {
    
    async function newMessage(inputValue) {
      const response = await createMessage(inputValue);
      onMessageCreated(response);
    }

    onAttemptCreateMessage(inputValue);

    event.preventDefault();
    setHistory(prevHistory => [...prevHistory, inputValue]);
    setInputValue('');

    switch(inputValue) {
      case '/clear':
      case '/c':
      case 'clear':
        sessionStorage.setItem('messages', JSON.stringify([]));
        onMessageCreated([]);
        break;
      default:
        newMessage(inputValue);
        break;
    }
      
  }, [setHistory, setInputValue, inputValue, onMessageCreated, onAttemptCreateMessage]);

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
    <form name="chartBar" onSubmit={handleFormSubmit}>
      <input 
        placeholder="Use /help to see all the commands" 
        name="chatInput" 
        type="text" 
        autoFocus 
        value={inputValue} 
        onChange={handleInputChange} 
        />
    </form>
  );
}