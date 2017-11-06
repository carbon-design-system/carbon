import React from 'react';
import Accordion from '../Accordion';
import { shallow } from 'enzyme';

describe('Accordion', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Accordion className="extra-class">
        <div className="child">Test</div>
      </Accordion>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--accordion')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});
