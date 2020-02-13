import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PhoneLink from './PhoneLink';

Enzyme.configure({ adapter: new Adapter() });

describe('PhoneLink component', () => {
  it('displays tel: link', () => {
    const wrapper = shallow(<PhoneLink phone="1234567" />);
    expect(
      wrapper
        .find('a')
        .first()
        .prop('href')
    ).toBe('tel:1234567');
  });

  it('removes non digits from link', () => {
    const wrapper = shallow(<PhoneLink phone="+1 (234) 5-6-7" />);
    expect(
      wrapper
        .find('a')
        .first()
        .prop('href')
    ).toBe('tel:1234567');
  });

  it('displays original phone', () => {
    const wrapper = shallow(<PhoneLink phone="+1 (234) 5-6-7" />);
    expect(
      wrapper
        .find('a')
        .first()
        .text()
    ).toBe('+1 (234) 5-6-7');
  });
});
