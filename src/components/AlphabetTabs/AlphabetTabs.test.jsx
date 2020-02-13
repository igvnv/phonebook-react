import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AlphabetTabs from './AlphabetTabs';
import AlphabetTabsLoader from './AlphabetTabsLoader';
import Config from '../Config';
import { LoadingStates } from '../../store/variables';
import contactsList from '../../../__tests__/data/contacts';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe('AlphabetTabs component', () => {
  it('displays loader when loading state is LOADING', () => {
    const store = mockStore({
      contacts: { data: [], state: LoadingStates.LOADING },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );
    expect(wrapper.find(AlphabetTabsLoader).length).toBe(1);
  });

  it('displays all the letters from config', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );
    expect(wrapper.find('.alphabet-tab').length).toBe(Config.tabs.length);
  });

  it('adds counters for letters that have contacts', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );

    expect(
      wrapper
        .find('.alphabet-tab')
        .findWhere((el) => el.text()[0] === 'c')
        .at(0)
        .find('.alphabet-tab__counter')
        .text()
    ).toEqual('1');
  });

  it("doesn't add counters for letters that without contacts", () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );

    expect(
      wrapper
        .find('.alphabet-tab')
        .findWhere((el) => el.text()[0] === 'a')
        .at(0)
        .find('.alphabet-tab__counter').length
    ).toEqual(0);
  });

  it('adds disabled modifier if no contacts for a letter found', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );

    expect(
      wrapper
        .find('.alphabet-tab')
        .findWhere((el) => el.text()[0] === 'a')
        .at(0)
        .hasClass('alphabet-tab_disabled')
    ).toBeTruthy();
  });

  it('marks letter if it is passed by prop selectedLetter', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} selectedLetter="q" />
      </Provider>
    );

    expect(
      wrapper
        .find('.alphabet-tab')
        .findWhere((el) => el.text()[0] === 'q')
        .at(0)
        .hasClass('alphabet-tab_selected')
    ).toBeTruthy();
  });

  it('calls onSelect(letter) on clock on a letter', () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} />
      </Provider>
    );

    wrapper
      .find('.alphabet-tab')
      .findWhere((el) => el.text()[0] === 'q')
      .at(0)
      .simulate('click');

    expect(onSelect.mock.calls).toEqual([['q']]);
  });

  it("calls onSelect('') on clock on selected letter", () => {
    const store = mockStore({
      contacts: { data: contactsList, state: LoadingStates.DONE },
    });

    const onSelect = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <AlphabetTabs onSelect={onSelect} selectedLetter="q" />
      </Provider>
    );

    wrapper
      .find('.alphabet-tab')
      .findWhere((el) => el.text()[0] === 'q')
      .at(0)
      .simulate('click');

    expect(onSelect.mock.calls).toEqual([['']]);
  });
});
