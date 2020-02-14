import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import bemSelector from '../../helpers/bemSelector';

/**
 * Callback for changing search query string.
 *
 * @callback onSearchCb
 * @param {string} queryString
 */

/**
 * Callback for changing focus status of query input.
 *
 * @callback onFocusCb
 * @param {boolean} isFocused
 */

/**
 * Search form for filtering contacts by query string.
 *
 * @param {{
 *   onSearch: onSearchCb,
 *   onFocus: onFocusCb,
 *   minimized: boolean
 * }} props
 */
const SearchForm = ({ onSearch, onFocus, minimized }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <form
      className={bemSelector('search-form', null, minimized ? 'minimized' : '')}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className={bemSelector(
          'search-form-input',
          null,
          minimized ? 'minimized' : ''
        )}
      >
        {!searchInputValue && !isFocused && (
          <label
            className={`search-form-input__label ${
              minimized ? 'search-form-input__label_minimized' : ''
            }`}
            htmlFor="search-input"
          >
            Search
          </label>
        )}
        <input
          className="search-form-input__input"
          type="text"
          id="search-input"
          autoComplete="off"
          ref={inputRef}
          value={searchInputValue}
          onChange={(e) => {
            onSearch(e.target.value);
            setSearchInputValue(e.target.value);
          }}
          onFocus={() => {
            onFocus(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            onFocus(false);
            setIsFocused(false);
          }}
        />
        {!searchInputValue && (
          <button
            type="button"
            className="search-form-input__button search-form-input__button_search"
            title="Search"
            onClick={() => {
              if (inputRef.current) inputRef.current.focus();
            }}
          />
        )}
        {searchInputValue && (
          <button
            type="button"
            className="search-form-input__button search-form-input__button_clean"
            title="Clean value"
            onClick={() => {
              onSearch('');
              setSearchInputValue('');
              if (inputRef.current) inputRef.current.focus();
            }}
          />
        )}
      </div>
    </form>
  );
};
SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
};

export default SearchForm;
