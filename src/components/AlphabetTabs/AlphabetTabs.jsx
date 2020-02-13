import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AlphabetTabsLoader from './AlphabetTabsLoader';
import Config from '../Config';
import { LoadingStates } from '../../store/variables';
import { fetchContactsIfNeeded } from '../../store/actions/contacts';
import bemSelector from '../../helpers/bemSelector';
import normalizeString from '../../helpers/normalizeString';

/**
 * Counts how many `contacts` there are that last name starts with `letter`.
 *
 * @param {array} contacts
 * @param {string} letter
 * @returns number
 */
function contactsStartsWithLetter(contacts, letter) {
  const lowercaseLetter = letter.toLowerCase();
  return contacts.filter(
    (contact) =>
      normalizeString(contact.name.last[0]).toLowerCase() === lowercaseLetter
  ).length;
}

/**
 * Callback for selecting a tab.
 *
 * @callback onTabSelectCb
 * @param {string} letter
 */

/**
 * Displays tabs with letters, each letter has counter that contains amount of
 * contacts which last name starts from this letter.
 *
 * @param {{
 *  selectedLetter: string,
 *  onSelect: onTabSelectCb
 * }} props
 */
const AlphabetTabs = ({ selectedLetter, onSelect: onTabSelect }) => {
  const [lettersCounter, setLettersCounter] = useState({});
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.contacts.state);
  const contacts = useSelector((state) => state.contacts.data);

  /**
   * Recounts size of contacts for each letter only when contacts list was changed
   */
  useEffect(() => {
    setLettersCounter(
      // Object.fromEntries allows us to create an object from list of [key, value] elements.
      Object.fromEntries(
        Config.tabs.map((letter) => [
          letter,
          contactsStartsWithLetter(contacts, letter),
        ])
      )
    );
  }, [contacts]);

  // Dispatches fetching contacts process if contacts haven't been fetched before
  if (loadingState !== LoadingStates.DONE) {
    dispatch(fetchContactsIfNeeded());
  }

  // TODO: Add component with reloader or even move to the parent component
  if (loadingState === LoadingStates.ERROR) {
    return <p>Something went wrong...</p>;
  }

  if (loadingState === LoadingStates.LOADING) {
    return <AlphabetTabsLoader />;
  }

  /**
   * Selects/deselects letter
   * @param {string} letter
   */
  function toggleLetter(letter) {
    // Skips clicks on tabs without contacts
    if (!lettersCounter[letter]) return;

    onTabSelect(letter !== selectedLetter ? letter : '');
  }

  return (
    <div className="alphabet__tabs">
      {Config.tabs.map((letter) => (
        <span
          key={letter}
          role="button"
          tabIndex={lettersCounter[letter] > 0 ? 0 : -1}
          onClick={() => toggleLetter(letter)}
          onKeyPress={() => toggleLetter(letter)}
          className={bemSelector('alphabet-tab', null, [
            letter === selectedLetter ? 'selected' : '',
            lettersCounter[letter] ? '' : 'disabled',
          ])}
        >
          {letter}
          {lettersCounter[letter] > 0 && (
            <span
              className={`alphabet-tab__counter
              ${
                letter === selectedLetter
                  ? ' alphabet-tab__counter_selected'
                  : ''
              }
            `}
            >
              {lettersCounter[letter]}
            </span>
          )}
        </span>
      ))}
    </div>
  );
};
AlphabetTabs.defaultProps = {
  selectedLetter: '',
};
AlphabetTabs.propTypes = {
  selectedLetter: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default AlphabetTabs;
