import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import AlphabetTabs from '../AlphabetTabs/AlphabetTabs';
import SearchForm from '../SearchForm';
import bemSelector from '../../helpers/bemSelector';

/**
 * Callback for changing search params.
 *
 * @callback onSearchCb
 * @param {{letter: string, query: string}} searchParams
 */

/**
 * Callback for changing minimizing state of search box.
 *
 * @callback onMinimizeCb
 * @param {boolean} minimized
 */

/**
 * Includes all the possible ways of searching contacts.
 *
 * Can search by first letter of last name or by search query.
 * Has the state of minimization - the component is minimized when a tab
 * is selected or search query is not empty or query input has focus.
 *
 * @param {{
 *   onSearch: onSearchCb,
 *   onMinimized: onMinimizeCb
 * }} props
 */
const SearchBox = ({ onSearch, onMinimized }) => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const [minimized, setMinimized] = useState(false);

  /**
   * Adds a pause (200ms) before minimizing. It helps us to avoid the immediately
   * repainting of layout that causes errors with onClick event on tabs.
   */
  const debounceMinimized = useRef(
    debounce((val) => {
      setMinimized(val);
      if (onMinimized) onMinimized(val);
    }, 200)
  );

  /**
   * Minimizes the component when letter is selected or
   * search query is not empty.
   */
  useEffect(() => {
    const minimizedStatus = !!(
      selectedLetter ||
      searchQuery ||
      searchInputIsFocused
    );
    debounceMinimized.current(minimizedStatus);
  }, [selectedLetter, searchQuery, searchInputIsFocused]);

  /**
   * Calls `onSearch` callback on search query change or selecting letter.
   * Calls `onSearch` with NULL when both search query and letter are empty.
   */
  useEffect(() => {
    onSearch(
      selectedLetter || searchQuery
        ? {
            letter: selectedLetter,
            query: searchQuery,
          }
        : null
    );
  }, [selectedLetter, searchQuery, onSearch]);

  return (
    <div
      className={bemSelector('search', null, [minimized ? 'minimized' : ''])}
    >
      <SearchForm
        minimized={minimized}
        onSearch={setSearchQuery}
        onFocus={setSearchInputIsFocused}
      />

      <div className="alphabet">
        {!minimized && (
          <h3 className="alphabet__title">Or choose it alphabetically</h3>
        )}

        <AlphabetTabs
          selectedLetter={selectedLetter}
          onSelect={setSelectedLetter}
        />
      </div>
    </div>
  );
};
SearchBox.defaultProps = {
  onMinimized: null,
};
SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onMinimized: PropTypes.func,
};

export default SearchBox;