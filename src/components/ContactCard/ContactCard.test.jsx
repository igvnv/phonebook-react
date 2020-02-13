import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContactCard from './ContactCard';
import { contact1 } from '../../../__tests__/data/contacts';

Enzyme.configure({ adapter: new Adapter() });

describe('ContactCard component', () => {
  it('displays contact photo', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ContactCard contact={contact1} onClose={onClose} />
    );

    expect(
      wrapper
        .find('.contact__photo-image')
        .first()
        .prop('src')
    ).toBe(contact1.picture.large);
  });

  it('displays contact name', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ContactCard contact={contact1} onClose={onClose} />
    );

    expect(
      wrapper
        .find('.contact__name')
        .first()
        .text()
    ).toBe(`${contact1.name.first} ${contact1.name.last}`);
  });

  it('calls onClose on click on close icon', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ContactCard contact={contact1} onClose={onClose} />
    );

    wrapper
      .find('.popup__close-icon')
      .first()
      .simulate('click');

    expect(onClose.mock.calls).toEqual([[contact1]]);
  });

  it('calls onClose on click on close button', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <ContactCard contact={contact1} onClose={onClose} />
    );

    wrapper
      .find('.popup__close-button')
      .first()
      .simulate('click');

    expect(onClose.mock.calls).toEqual([[contact1]]);
  });
});
