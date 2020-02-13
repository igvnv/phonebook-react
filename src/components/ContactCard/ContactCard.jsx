import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import contactPropType from '../../types/contact';
import PhoneLink from '../PhoneLink';

/**
 * Displays popup with information about contact
 *
 * @param {{
 *   contact: contactPropType,
 *   onClose: function
 * }}
 */
const ContactCard = ({ contact, onClose }) => {
  const popupRef = useRef();

  const onCloseHandler = () => {
    onClose(contact);
  };

  /**
   * Position popup on the center of visible area.
   */
  useEffect(() => {
    if (!popupRef || !popupRef.current) return;
    popupRef.current.style.top = `${window.innerHeight / 2 + window.scrollY}px`;
  }, [contact, popupRef]);

  return (
    <div className="popup popup_with-close-button" ref={popupRef}>
      <span
        className="popup__close-icon"
        role="button"
        tabIndex="0"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
      />

      <div className="contact">
        <div className="contact__photo">
          <img
            src={contact.picture.large}
            alt={`${contact.name.first} ${contact.name.last}`}
            className="contact__photo-image"
          />
        </div>

        <h2 className="contact__name">
          {contact.name.first} {contact.name.last}
        </h2>

        <div className="contact__attributes">
          <dl className="contact-attributes">
            <dt className="contact-attributes__title">E-mail:</dt>
            <dd className="contact-attributes__description">
              <a
                href={`mailto:${contact.email}`}
                className="contact-attributes__link"
              >
                {contact.email}
              </a>
            </dd>

            <dt className="contact-attributes__title">Phone:</dt>
            <dd className="contact-attributes__description">
              <PhoneLink
                phone={contact.phone}
                className="contact-attributes__link"
              />
            </dd>

            <dt className="contact-attributes__title">Street:</dt>
            <dd className="contact-attributes__description">
              {contact.location.street.number} {contact.location.street.name}
            </dd>

            <dt className="contact-attributes__title">City:</dt>
            <dd className="contact-attributes__description">
              {contact.location.city}
            </dd>

            <dt className="contact-attributes__title">State:</dt>
            <dd className="contact-attributes__description">
              {contact.location.state}
            </dd>

            <dt className="contact-attributes__title">Postcode:</dt>
            <dd className="contact-attributes__description">
              {contact.location.postcode}
            </dd>
          </dl>
        </div>
      </div>

      <span
        className="popup__close-button"
        role="button"
        tabIndex="0"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
      >
        Close
      </span>
    </div>
  );
};
ContactCard.propTypes = {
  contact: PropTypes.shape(contactPropType).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactCard;
