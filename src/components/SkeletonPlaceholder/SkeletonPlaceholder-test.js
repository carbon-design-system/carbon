import React from 'react';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
import { shallow } from 'enzyme';

describe('SkeletonPlaceholder', () => {
  const wrapper = shallow(<SkeletonPlaceholder />);

  it('Has the expected classes', () => {
    expect(wrapper.hasClass('bx--skeleton__placeholder')).toEqual(true);
  });
});
