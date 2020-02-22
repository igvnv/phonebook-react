import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import AlphabetTabs from '../AlphabetTabs';
import SearchBox from './SearchBox';
import SearchForm from '../SearchForm';
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

function lastMockCall(fn) {
  return fn.mock.calls.length ? fn.mock.calls[fn.mock.calls.length - 1] : null;
}

jest.useFakeTimers();

describe('SearchBox component (integration)', () => {
  it('has search form', () => {
    const onSearch = jest.fn();
    const wrapper = mountComponentWithStore(<SearchBox onSearch={onSearch} />);
    expect(wrapper.find(SearchForm).length).toBe(1);
  });

  it('has alphabet tabs', () => {
    const onSearch = jest.fn();
    const wrapper = mountComponentWithStore(<SearchBox onSearch={onSearch} />);
    expect(wrapper.find(AlphabetTabs).length).toBe(1);
  });

  describe('component minimization', () => {
    it('calls onMinimized on focus in search input', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper.find('.search-form-input__input').simulate('focus');
        jest.runAllTimers();
      });

      expect(lastMockCall(onMinimized)).toEqual([true]);
    });

    it('cancel minimization when search input lose focus', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper.find('.search-form-input__input').simulate('focus');
        jest.runAllTimers();
        jest.advanceTimersByTime(200);
      });

      act(() => {
        wrapper.find('.search-form-input__input').simulate('blur');
        jest.runAllTimers();
        jest.advanceTimersByTime(200);
      });

      expect(lastMockCall(onMinimized)).toEqual([false]);
    });

    it('calls onMinimized when alphabet tab is clicked', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper
          .find('.alphabet-tab')
          .findWhere((el) => el.text()[0] === 'w')
          .at(0)
          .simulate('click');
      });

      expect(lastMockCall(onMinimized)).toEqual([true]);
    });

    it('cancels minimization when alphabet tab loses active selection', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper
          .find('.alphabet-tab')
          .findWhere((el) => el.text()[0] === 'w')
          .at(0)
          .simulate('click');
      });

      act(() => {
        wrapper
          .find('.alphabet-tab')
          .findWhere((el) => el.text()[0] === 'w')
          .at(0)
          .simulate('click');
      });

      expect(lastMockCall(onMinimized)).toEqual([false]);
    });
  });

  describe('onSearch callback', () => {
    it('calls onSearch with query string on type in search input', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper
          .find('.search-form-input__input')
          .simulate('change', { target: { value: 'Peter' } });
        jest.runAllTimers();
      });

      expect(lastMockCall(onSearch)).toEqual([{ letter: '', query: 'Peter' }]);
    });

    it('calls onSearch with a letter when alphabet tab is clicked', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper
          .find('.alphabet-tab')
          .findWhere((el) => el.text()[0] === 'w')
          .at(0)
          .simulate('click');
      });

      expect(lastMockCall(onSearch)).toEqual([{ letter: 'w', query: '' }]);
    });

    it('calls onSearch with a letter and search query', () => {
      const onSearch = jest.fn();
      const onMinimized = jest.fn();
      const wrapper = mountComponentWithStore(
        <SearchBox onSearch={onSearch} onMinimized={onMinimized} />
      );

      act(() => {
        wrapper
          .find('.search-form-input__input')
          .simulate('change', { target: { value: 'Peter' } });
        jest.runAllTimers();
      });

      act(() => {
        wrapper
          .find('.alphabet-tab')
          .findWhere((el) => el.text()[0] === 'w')
          .at(0)
          .simulate('click');
      });

      expect(lastMockCall(onSearch)).toEqual([{ letter: 'w', query: 'Peter' }]);
    });
  });
});
