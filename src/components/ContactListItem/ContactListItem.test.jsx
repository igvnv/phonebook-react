import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContactListItem from './ContactListItem';
import contactsList from '../../../__tests__/data/contacts';

Enzyme.configure({ adapter: new Adapter() });

describe('ContactListItem component', () => {
  it("displays user's avatar", () => {
    const contact = contactsList[0];
    const wrapper = shallow(<ContactListItem contact={contact} />);
    expect(wrapper.find('.contact-preview__image').length).toBe(1);
    expect(
      wrapper
        .find('.contact-preview__image')
        .at(0)
        .prop('src')
    ).toBe(contact.picture.thumbnail);
  });

  it('user avatar has alt "%first name% %last name%"', () => {
    const contact = contactsList[0];
    const wrapper = shallow(<ContactListItem contact={contact} />);
    expect(
      wrapper
        .find('.contact-preview__image')
        .at(0)
        .prop('alt')
    ).toBe(`${contact.name.first} ${contact.name.last}`);
  });

  it('displays first name', () => {
    const contact = contactsList[0];
    const wrapper = shallow(<ContactListItem contact={contact} />);
    expect(
      wrapper
        .find('.contact-preview__first-name')
        .at(0)
        .text()
    ).toBe(contact.name.first);
  });

  it('displays last name', () => {
    const contact = contactsList[0];
    const wrapper = shallow(<ContactListItem contact={contact} />);
    expect(
      wrapper
        .find('.contact-preview__last-name')
        .at(0)
        .text()
    ).toBe(contact.name.last);
  });
});
