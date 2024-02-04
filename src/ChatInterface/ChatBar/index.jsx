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
  const initValue = localStorage.getItem('first-visit') === 'false' ? '' : '/about';
  const [inputValue, setInputValue] = useState(initValue);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const newMessage = useCallback(async (inputValue) => {
    try {
      const response = await createMessage(inputValue);
      onMessageCreated(response);
      setError('');
    } catch (e) {
      setError(e.message)
    }
  }, [onMessageCreated]);

  const handleFormSubmit = useCallback(function(event) {
    event.preventDefault();
    setError('');

    if(inputValue === '' || inputValue.length < 3) {
      setError('The message is too short');
      return;
    }
    
    setInputValue('');
    onAttemptCreateMessage();
    setHistory(prevHistory => [...prevHistory, inputValue]);
  
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
      
  }, [setHistory, setInputValue, inputValue, onMessageCreated, onAttemptCreateMessage,newMessage]);

  useEffect(() => {
    if (localStorage.getItem('first-visit') === 'true') {
      const cmd = '/about';
      const event = {
        target: {
          value: cmd
        },
        preventDefault: () => localStorage.setItem('first-visit', false)
      }
      handleFormSubmit(event);
      setInputValue('');
    }
  }, [handleFormSubmit, onAttemptCreateMessage]);

  function isDisabled() {
    return inputValue.length < 3 || inputValue.length > 50;
  }

  return (
    <form name="chatBar" onSubmit={handleFormSubmit}>
      {error && <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
      }
      <input 
        placeholder="Use /help to see all the commands" 
        name="chatBarInput" 
        type="text" 
        autoFocus 
        value={inputValue} 
        onChange={handleInputChange} 
        maxLength={50}
        required
        />
      <button 
        type="submit"
        onClick={handleFormSubmit}>Send</button>
    </form>
  );
}