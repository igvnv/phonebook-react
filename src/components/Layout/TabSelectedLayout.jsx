import React from 'react';

import image6 from '../../images/tmp/6.jpg';
import image14 from '../../images/tmp/14.jpg';
import image33 from '../../images/tmp/33.jpg';
import image83 from '../../images/tmp/83.jpg';

const TabSelectedLayout = () => {
  return (
    <>
      <div className="search search_minimized">
        <form className="search-form search-form_minimized">
          <div className="search-form-input search-form-input_minimized">
            <label
              className="search-form-input__label search-form-input__label_minimized"
              htmlFor="search-input4"
            >
              Search
            </label>
            <input
              className="search-form-input__input"
              type="text"
              id="search-input4"
            />
            <button
              type="submit"
              className="search-form-input__button search-form-input__button_search"
              title="Search"
            />
          </div>
        </form>

        <div className="alphabet">
          <div className="alphabet__tabs">
            <span className="alphabet-tab alphabet-tab_selected">A</span>
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

      <div className="contacts-list">
        <div className="contacts-list__item">
          <div className="contact-preview">
            <img
              src={image6}
              alt="Ann Taylor"
              className="contact-preview__image"
            />
            <span className="contact-preview__name">
              <span className="contact-preview__first-name">Ann</span>
              <span className="contact-preview__last-name">Taylor</span>
            </span>
          </div>
        </div>

        <div className="contacts-list__item">
          <div className="contact-preview">
            <img
              src={image33}
              alt="Louise Henderson"
              className="contact-preview__image"
            />
            <span className="contact-preview__name">
              <span className="contact-preview__first-name">Louise</span>
              <span className="contact-preview__last-name">Henderson</span>
            </span>
          </div>
        </div>

        <div className="contacts-list__item">
          <div className="contact-preview">
            <img
              src={image14}
              alt="Ray Sutton"
              className="contact-preview__image"
            />
            <span className="contact-preview__name">
              <span className="contact-preview__first-name">Ray</span>
              <span className="contact-preview__last-name">Sutton</span>
            </span>
          </div>
        </div>

        <div className="contacts-list__item">
          <div className="contact-preview">
            <img
              src={image83}
              alt="Bill Morgan"
              className="contact-preview__image"
            />
            <span className="contact-preview__name">
              <span className="contact-preview__first-name">Bill</span>
              <span className="contact-preview__last-name">Morgan</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabSelectedLayout;
