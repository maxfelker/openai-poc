import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { createMessage } from '../service.messages';
import PropTypes from 'prop-types';

ChatBar.propTypes = {
  onMessageCreated: PropTypes.func.isRequired,
};

export default function ChatBar(props) {

  const { onMessageCreated } = props;
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
    event.preventDefault();
    setHistory(prevHistory => [...prevHistory, inputValue]);
    setInputValue('');
    newMessage(inputValue);
  }, [setHistory, setInputValue, inputValue, onMessageCreated]);

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
    <form name="terminal" onSubmit={handleFormSubmit}>
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