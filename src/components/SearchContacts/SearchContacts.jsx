import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { LoadingStates } from '../../store/variables';
import { fetchContactsIfNeeded } from '../../store/actions/contacts';
import ContactsList from '../ContactsList/ContactsList';
import normalizedString from '../../helpers/normalizeString';

// eslint-disable-next-line no-unused-vars
import contactType from '../../types/contact';

/**
 * Callback for selecting a tab.
 *
 * @callback onContactSelectCb
 * @param {contactType} contact
 */

/**
 * Searches contacts by letter and/or search query and displays them.
 *
 * @param {{
 *   byLetter?: string,
 *   byQuery?: string,
 *   onContactSelect?: onContactSelectCb
 * }} props
 */
const SearchContacts = ({ byLetter, byQuery, onContactSelect }) => {
  const dispatch = useDispatch();
  /** @type string */
  const loadingState = useSelector((state) => state.contacts.state);
  /** @type contactType[] */
  const contacts = useSelector((state) => state.contacts.data);
  /** @type [contactType[], function] */
  const [contactsList, setContactsList] = useState([]);

  /**
   * Filters contacts by given filters.
   * As a result updates the `contactsList` variable.
   */
  useEffect(() => {
    // No search filters
    if (!byLetter && !byQuery) {
      setContactsList([]);
      return;
    }

    const lowercaseLetter = byLetter.toLowerCase();
    const lowercaseQuery = byQuery.toLowerCase();

    setContactsList(
      contacts
        // filtering contacts by first letter of last name
        .filter((contact) =>
          byLetter
            ? normalizedString(contact.name.last[0]).toLowerCase() ===
              lowercaseLetter
            : true
        )
        // filtering contacts by substring
        .filter((contact) => {
          return byQuery
            ? normalizedString(`${contact.name.first} ${contact.name.last}`)
                .toLowerCase()
                .includes(lowercaseQuery)
            : true;
        })
    );
  }, [byLetter, byQuery, contacts]);

  // Dispatches fetching contacts process if contacts haven't been fetched before
  if (loadingState !== LoadingStates.DONE) {
    dispatch(fetchContactsIfNeeded());
  }

  // TODO: Add component with reloader or even move it to the parent component
  if (loadingState === LoadingStates.ERROR) {
    return <p>Something went wrong...</p>;
  }

  if (loadingState === LoadingStates.LOADING) {
    return <p>Loading...</p>;
  }

  /**
   * User tried to find contacts but nothing was found.
   * @type boolean
   */
  const noContactsFound = !contactsList.length && (byLetter || byQuery);

  return (
    <div
      className={`search-result ${
        noContactsFound ? 'search-result_alert' : ''
      }`}
    >
      {noContactsFound && (
        <div className="search-result-alert">No contacts found</div>
      )}

      {!!contactsList.length && (
        <ContactsList
          onContactSelect={onContactSelect}
          contacts={contactsList}
        />
      )}
    </div>
  );
};
SearchContacts.propTypes = {
  byLetter: PropTypes.string,
  byQuery: PropTypes.string,
  onContactSelect: PropTypes.func,
};
SearchContacts.defaultProps = {
  byLetter: '',
  byQuery: '',
  onContactSelect: null,
};

export default SearchContacts;
