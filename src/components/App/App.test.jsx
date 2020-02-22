import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import SearchBox from '../SearchBox';
import SearchContacts from '../SearchContacts';
import ContactCard from '../ContactCard';
import { LoadingStates } from '../../store/variables';
import contactsList from '../../../__tests__/data/contacts';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  contacts: { data: contactsList, state: LoadingStates.DONE },
});

Enzyme.configure({ adapter: new Adapter() });

function mountComponentWithStore(component) {
  return mount(<Provider store={store}>{component}</Provider>);
}

jest.useFakeTimers();

describe('SearchBox component (integration)', () => {
  it('has search box', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchBox).length).toBe(1);
  });

  it('has no contacts until search', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(SearchContacts).length).toBe(0);
  });

  it('has no contact card until click on contact', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ContactCard).length).toBe(0);
  });

  it('has contacts list when search params are not empty', () => {
    const wrapper = mountComponentWithStore(<App />);

    wrapper
      .find('.alphabet-tab')
      .findWhere((el) => el.text()[0] === 'w')
      .at(0)
      .simulate('click');

    expect(wrapper.find(SearchContacts).length).toBe(1);
  });

  it('displays contact card after click on a contact', () => {
    const wrapper = mountComponentWithStore(<App />);

    wrapper
      .find('.alphabet-tab')
      .findWhere((el) => el.text()[0] === 'w')
      .at(0)
      .simulate('click');

    wrapper
      .find('.contacts-list__item')
      .at(0)
      .simulate('click');

    expect(wrapper.find(ContactCard).length).toBe(1);
  });
});
