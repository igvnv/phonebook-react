import React from 'react';

const MainPageLayout = () => {
  return (
    <div className="search">
      <form className="search-form">
        <div className="search-form-input">
          <label className="search-form-input__label" htmlFor="search-input">
            Search
          </label>
          <input
            className="search-form-input__input"
            type="text"
            id="search-input"
          />
          <button
            type="submit"
            className="search-form-input__button search-form-input__button_search"
            title="Search"
          />
        </div>
      </form>

      <div className="alphabet">
        <h3 className="alphabet__title">Or choose it alphabetically</h3>

        <div className="alphabet__tabs">
          <span className="alphabet-tab">A</span>
          <span className="alphabet-tab">B</span>
          <span className="alphabet-tab">C</span>
          <span className="alphabet-tab">D</span>
          <span className="alphabet-tab">E</span>
          <span className="alphabet-tab">F</span>
          <span className="alphabet-tab">G</span>
          <span className="alphabet-tab">H</span>
          <span className="alphabet-tab">I</span>
          <span className="alphabet-tab">J</span>
          <span className="alphabet-tab">K</span>
          <span className="alphabet-tab">L</span>
          <span className="alphabet-tab">M</span>
          <span className="alphabet-tab">N</span>
          <span className="alphabet-tab">O</span>
          <span className="alphabet-tab">P</span>
          <span className="alphabet-tab">Q</span>
          <span className="alphabet-tab">R</span>
          <span className="alphabet-tab">S</span>
          <span className="alphabet-tab">T</span>
          <span className="alphabet-tab">U</span>
          <span className="alphabet-tab">V</span>
          <span className="alphabet-tab">W</span>
          <span className="alphabet-tab">X</span>
          <span className="alphabet-tab">Y</span>
          <span className="alphabet-tab">Z</span>
        </div>
      </div>
    </div>
  );
};

export default MainPageLayout;
