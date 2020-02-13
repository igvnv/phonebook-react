import React, { useState } from 'react';

import '../../styles/main.scss';

import SearchBox from '../SearchBox/SearchBox';
import SearchContacts from '../SearchContacts';

function App() {
  const [filterByLetter, setFilterByLetter] = useState('');
  const [filterByQuery, setFilterByQuery] = useState('');
  const [minimizedSearchBox, setMinimizedSearchBox] = useState('');

  return (
    <div>
      <SearchBox
        onSearch={(filter) => {
          setFilterByLetter(filter ? filter.letter : '');
          setFilterByQuery(filter ? filter.query : '');
        }}
        onMinimized={setMinimizedSearchBox}
      />
      {minimizedSearchBox && !(filterByLetter || filterByQuery) && (
        <div className="search-result search-result_alert">
          <div className="search-result-alert">Start typing a name111</div>
        </div>
      )}
      {(filterByLetter || filterByQuery) && (
        <SearchContacts byLetter={filterByLetter} byQuery={filterByQuery} />
      )}
    </div>
  );
}

export default App;
