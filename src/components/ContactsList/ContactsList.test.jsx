import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContactsList from './ContactsList';
import ContactListItem from '../ContactListItem';
import contactsList from '../../../__tests__/data/contacts';

Enzyme.configure({ adapter: new Adapter() });

describe('ContactsList component', () => {
  it('displays contacts', () => {
    const wrapper = shallow(<ContactsList contacts={contactsList} />);
    expect(wrapper.find(ContactListItem).length).toBe(contactsList.length);
  });
});
