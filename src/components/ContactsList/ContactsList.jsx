import React from 'react';
import PropTypes from 'prop-types';

import contactPropType from '../../types/contact';
import ContactListItem from '../ContactListItem';

/**
 * Callback for select a contact.
 *
 * @callback onContactSelectCb
 * @param {contactType} contact
 */

/**
 * Displays contacts list.
 *
 * @param {{
 *   contacts: contactPropType[],
 *   onContactSelect?: onContactSelectCb
 * }}
 */
const ContactsList = ({ contacts, onContactSelect }) => (
  <div className="contacts-list">
    {contacts.map((contact) => (
      <ContactListItem
        key={contact.login.uuid}
        onClick={onContactSelect}
        contact={contact}
      />
    ))}
  </div>
);
ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape(contactPropType)).isRequired,
  onContactSelect: PropTypes.func,
};
ContactsList.defaultProps = {
  onContactSelect: null,
};

export default ContactsList;
