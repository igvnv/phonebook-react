import React from 'react';
import PropTypes from 'prop-types';

import contactPropType from '../../types/contact';

/**
 * Displays short contact information.
 *
 * @param {{contact: contactPropType}}
 */
const ContactListItem = ({ contact }) => {
  return (
    <div className="contacts-list__item">
      <div className="contact-preview">
        <img
          src={contact.picture.thumbnail}
          alt={`${contact.name.first} ${contact.name.last}`}
          className="contact-preview__image"
        />
        <span className="contact-preview__name">
          <span className="contact-preview__first-name">
            {contact.name.first}
          </span>{' '}
          <span className="contact-preview__last-name">
            {contact.name.last}
          </span>
        </span>
      </div>
    </div>
  );
};
ContactListItem.propTypes = {
  contact: PropTypes.shape(contactPropType).isRequired,
};

export default ContactListItem;
