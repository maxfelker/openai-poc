import PropTypes from 'prop-types';
import styles from './styles.module.css';

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default function Message(props) {
  const { message } = props;
  const { role, text } = message;
  const messageClass = `${styles.messageContainer} ${styles[role]}`;

  return (
    <div className={messageClass} dangerouslySetInnerHTML={{ __html: text }}></div>
  )
}

