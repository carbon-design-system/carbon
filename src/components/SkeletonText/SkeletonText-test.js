import React from 'react';
import SkeletonText from '../SkeletonText';
import { shallow } from 'enzyme';

describe('SkeletonText', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SkeletonText />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton__text')).toEqual(true);
    });
  });
});

describe('SkeletonText Heading', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<SkeletonText heading />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton__heading')).toEqual(true);
    });
  });
});
