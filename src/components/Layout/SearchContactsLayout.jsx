import React from 'react';

import image6 from '../../images/tmp/6.jpg';
import image14 from '../../images/tmp/14.jpg';
import image33 from '../../images/tmp/33.jpg';
import image83 from '../../images/tmp/83.jpg';

const SearchContactsLayout = () => {
  return (
    <>
      <div className="search search_typing">
        <form className="search-form search-form_typing">
          <div className="search-form-input search-form-input_typing">
            <input
              className="search-form-input__input"
              type="text"
              id="search-input2"
              defaultValue="Anna"
            />
            <button
              type="submit"
              className="search-form-input__button search-form-input__button_clean"
              title="Search"
            />
          </div>
        </form>

        <div className="search-result">
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
        </div>
      </div>
    </>
  );
};

export default SearchContactsLayout;
