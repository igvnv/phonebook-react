import React from 'react';

const SearchContactsEmptyLayout = () => {
  return (
    <>
      <div className="search search_typing">
        <form className="search-form search-form_typing">
          <div className="search-form-input search-form-input_typing">
            <label
              className="search-form-input__label search-form-input__label_typing"
              htmlFor="search-input3"
            >
              Search
            </label>
            <input
              className="search-form-input__input"
              type="text"
              id="search-input3"
            />
            <button
              type="submit"
              className="search-form-input__button search-form-input__button_clean"
              title="Search"
            />
          </div>
        </form>

        <div className="search-result search-result_alert">
          <div className="search-result-alert">Start typing a name</div>
        </div>
      </div>
    </>
  );
};

export default SearchContactsEmptyLayout;
