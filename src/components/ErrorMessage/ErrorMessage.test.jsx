import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorMessage from './ErrorMessage';

Enzyme.configure({ adapter: new Adapter() });

describe('ErrorMessage component', () => {
  // it('contains .error-message element', () => {
  //   const wrapper = shallow(<ErrorMessage>Text</ErrorMessage>);
  //   expect(wrapper.find('.error-message').length).toBe(1);
  // });

  it('displays children as error message inside .error-message__text', () => {
    const Message = () => <p>Error Message</p>;
    const wrapper = shallow(
      <ErrorMessage>
        <Message />
      </ErrorMessage>
    );
    expect(wrapper.find('.error-message__text').find(Message).length).toBe(1);
  });
});
