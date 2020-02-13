import React from 'react';
import PropTypes from 'prop-types';

/**
 * Link for phone number
 *
 * @param {{phone: string}}
 */
const PhoneLink = ({ phone, ...rest }) => {
  // removes all non digit symbols
  const link = phone.replace(/[^\d]/g, '');

  return (
    <a href={`tel:${link}`} {...rest}>
      {phone}
    </a>
  );
};
PhoneLink.propTypes = {
  phone: PropTypes.string.isRequired,
};

export default PhoneLink;
