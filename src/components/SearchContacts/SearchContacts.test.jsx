import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import SearchContacts from './SearchContacts';
import ContactsList from '../ContactsList';
import ContactListItem from '../ContactListItem';
import contactsList, { contact4 } from '../../../__tests__/data/contacts';
import { LoadingStates } from '../../store/variables';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('SearchContacts component', () => {
  it('displays "No contacts found" when no contacts found', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchContacts byLetter="8" byQuery="no name" />
      </Provider>
    );

    expect(
      wrapper
        .find('.search-result')
        .at(0)
        .hasClass('search-result_alert')
    ).toBeTruthy();

    expect(wrapper.find('.search-result-alert').length).toBe(1);

    expect(
      wrapper
        .find('.search-result-alert')
        .at(0)
        .text()
    ).toBe('No contacts found');
  });

  it('searches by first letter of last name', () => {
    const store = mockStore({
      contacts: {
        data: [...contactsList, contact4],
        state: LoadingStates.DONE,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchContacts byLetter="c" byQuery="" />
      </Provider>
    );

    expect(wrapper.find(ContactsList).length).toBe(1);
    expect(wrapper.find(ContactListItem).length).toBe(2);
    expect(
      wrapper
        .find(ContactListItem)
        .at(0)
        .text()
    ).toMatch(/Travis\sCastro/);
    expect(
      wrapper
        .find(ContactListItem)
        .at(1)
        .text()
    ).toMatch(/Antonio\sCastro/);
  });

  it('searches by query', () => {
    const store = mockStore({
      contacts: {
        data: [...contactsList, contact4],
        state: LoadingStates.DONE,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchContacts byLetter="" byQuery="Wilson" />
      </Provider>
    );

    expect(wrapper.find(ContactsList).length).toBe(1);
    expect(wrapper.find(ContactListItem).length).toBe(1);
    expect(
      wrapper
        .find(ContactListItem)
        .at(0)
        .text()
    ).toMatch(/Mae\sWilson/);
  });

  it('searches first letter of last name and query simultaneously', () => {
    const store = mockStore({
      contacts: {
        data: [...contactsList, contact4],
        state: LoadingStates.DONE,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <SearchContacts byLetter="c" byQuery="tonio" />
      </Provider>
    );

    expect(wrapper.find(ContactsList).length).toBe(1);
    expect(wrapper.find(ContactListItem).length).toBe(1);
    expect(
      wrapper
        .find(ContactListItem)
        .at(0)
        .text()
    ).toMatch(/Antonio\sCastro/);
  });
});
