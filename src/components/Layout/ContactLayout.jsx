import React from 'react';

import image6 from '../../images/tmp/6.jpg';

const ContactLayout = () => {
  return (
    <div className="popup popup_with-close-button">
      <span className="popup__close-icon" />

      <div className="contact">
        <div className="contact__photo">
          <img src={image6} alt="Ann Taylor" className="contact__photo-image" />
        </div>

        <h2 className="contact__name">Ann Taylor</h2>

        <div className="contact__attributes">
          <dl className="contact-attributes">
            <dt className="contact-attributes__title">E-mail:</dt>
            <dd className="contact-attributes__description">
              encarnacion@gmail.com
            </dd>

            <dt className="contact-attributes__title">Phone:</dt>
            <dd className="contact-attributes__description">973-866-098</dd>

            <dt className="contact-attributes__title">Street:</dt>
            <dd className="contact-attributes__description">
              6301 calle del barquillo
            </dd>

            <dt className="contact-attributes__title">City:</dt>
            <dd className="contact-attributes__description">
              Santiago de Compostela
            </dd>

            <dt className="contact-attributes__title">State:</dt>
            <dd className="contact-attributes__description">Aragon</dd>

            <dt className="contact-attributes__title">Postcode:</dt>
            <dd className="contact-attributes__description">50457</dd>
          </dl>
        </div>
      </div>

      <span className="popup__close-button">Close</span>
    </div>
  );
};

export default ContactLayout;
