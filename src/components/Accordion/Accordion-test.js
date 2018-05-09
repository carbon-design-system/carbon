import React from 'react';
import Accordion from '../Accordion';
import AccordionSkeleton from '../Accordion/Accordion.Skeleton';
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

describe('AccordionSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<AccordionSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--accordion')).toEqual(true);
    });
  });
});
