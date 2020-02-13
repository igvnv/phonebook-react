import React from 'react';
import PropTypes from 'prop-types';

import contactPropType from '../../types/contact';
import ContactListItem from '../ContactListItem';

/**
 * Displays contacts list.
 *
 * @param {{contacts: contactPropType[]}}
 */
const ContactsList = ({ contacts }) => (
  <div className="contacts-list">
    {contacts.map((contact) => (
      <ContactListItem key={contact.login.uuid} contact={contact} />
    ))}
  </div>
);
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape(contactPropType)).isRequired,
};

export default ContactsList;
