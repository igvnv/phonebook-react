import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import AlphabetTabs from '../AlphabetTabs/AlphabetTabs';
import SearchForm from '../SearchForm';
import bemSelector from '../../helpers/bemSelector';
import cssDurationToMs from '../../helpers/cssDurationToMs';

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
 *   onMinimized?: onMinimizeCb
 * }} props
 */
const SearchBox = ({ onSearch, onMinimized }) => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputIsFocused, setSearchInputIsFocused] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [componentHeight, setComponentHeight] = useState();
  const componentRef = useRef();

  /**
   * Sets component height for correct animation
   * (`transition: height` doesn't work with `height: auto`).
   */
  useEffect(() => {
    // Component height after animation
    const finalHeight = `${componentRef.current.scrollHeight}px`;

    // Sets start point for animation
    componentRef.current.style.height = componentHeight || 'auto';

    // DO NOT DELETE THIS CONDITION!
    // We must call element.offsetHeight to cause reflow for element
    // and trigger animation!
    if (componentRef.current.scrollHeight) {
      componentRef.current.style.height = finalHeight;

      // Removes calculated height after animation
      setTimeout(() => {
        if (componentRef.current) componentRef.current.style.height = null;
      }, cssDurationToMs(window.getComputedStyle(componentRef.current).getPropertyValue('transition-duration')));
    }
  }, [minimized, componentHeight]);

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

    setMinimized(minimizedStatus);
    if (onMinimized) onMinimized(minimizedStatus);
    setComponentHeight(`${componentRef.current.scrollHeight}px`);
  }, [selectedLetter, searchQuery, searchInputIsFocused, onMinimized]);

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
      ref={componentRef}
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
