import PropTypes from 'prop-types';

const AlertMessage = ({ message, type }) => (
  <div
    className={`${
      type === 'error' ? 'error' : type === 'success' ? 'success' : 'default'
    }-message-box`}
    data-testid="alert-message"
  >
    {message}
  </div>
);

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'default']).isRequired,
};

export default AlertMessage;
