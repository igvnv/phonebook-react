import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchForm from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchForm component', () => {
  it('has input', () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );
    expect(wrapper.find('input.search-form-input__input').length).toBe(1);
  });

  it('displays clean button when input is not empty', () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );

    expect(wrapper.find('search-form-input__button_clean').length).toBe(0);

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('change', { target: { value: 'query value' } });

    expect(wrapper.find('.search-form-input__button_clean').length).toBe(1);
  });

  test('click on clean button cleans and sets focus on input', async () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('change', { target: { value: 'query value' } });

    expect(
      wrapper
        .find('input.search-form-input__input')
        .at(0)
        .prop('value')
    ).toBe('query value');

    wrapper
      .find('.search-form-input__button_clean')
      .at(0)
      .simulate('click');

    expect(
      wrapper
        .find('input.search-form-input__input')
        .at(0)
        .prop('value')
    ).toBe('');
  });

  it('adds CSS-modifiers when prop minimized is passed', () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized />
    );

    expect(
      wrapper
        .find('.search-form')
        .at(0)
        .hasClass('search-form_minimized')
    ).toBeTruthy();

    expect(
      wrapper
        .find('.search-form-input')
        .at(0)
        .hasClass('search-form-input_minimized')
    ).toBeTruthy();

    expect(
      wrapper
        .find('.search-form-input__label')
        .at(0)
        .hasClass('search-form-input__label_minimized')
    ).toBeTruthy();
  });

  it('calls onFocus(true) when input is focused', async () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('focus');

    expect(onFocus.mock.calls).toEqual([[true]]);
  });

  it('calls onFocus(false) when focus leaves input', async () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('focus');

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('blur');

    expect(onFocus.mock.calls).toEqual([[true], [false]]);
  });

  it('calls onSearch when input value is changed', async () => {
    const onSearch = jest.fn();
    const onFocus = jest.fn();
    const wrapper = shallow(
      <SearchForm onSearch={onSearch} onFocus={onFocus} minimized={false} />
    );

    wrapper
      .find('input.search-form-input__input')
      .at(0)
      .simulate('change', { target: { value: 'query value' } });

    expect(onSearch.mock.calls).toEqual([['query value']]);
  });
});
