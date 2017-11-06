import React from 'react';
import CardFooter from '../CardFooter';
import { shallow } from 'enzyme';

describe('CardFooter', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <CardFooter className="extra-class">
        <div className="child">Test</div>
      </CardFooter>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--card-footer')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});
