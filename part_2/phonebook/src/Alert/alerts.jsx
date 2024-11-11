import { PropTypes } from "prop-types";

const AlertMessage = ({ message }) => {
  const { error, success, styleType } = message;
  const isMessageTypeActive = styleType === "error" ? error : success;
  return error || success ? (
    <div className={`${styleType}_message`}>{isMessageTypeActive}</div>
  ) : null;
};

AlertMessage.propTypes = {
  message: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.string,
    styleType: PropTypes.string,
  }).isRequired,
};

export default AlertMessage;
