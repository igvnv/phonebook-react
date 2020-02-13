import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays error message
 *
 * @param {{children: element | string}} props
 */
const ErrorMessage = ({ children }) => {
  return (
    <div className="error-message">
      <span className="error-message__text">{children}</span>
    </div>
  );
};
ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

export default ErrorMessage;
