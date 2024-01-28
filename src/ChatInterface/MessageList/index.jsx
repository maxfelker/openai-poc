import Message from './Message';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

MessageList.propTypes = { 
  messages: PropTypes.array.isRequired,
};

export default function MessageList(props) {
    const { messages } = props;

    return (
        <div className={styles.messages}>
            {messages.map((message, key) => <Message key={key} message={message} />)}
        </div>
    );
}