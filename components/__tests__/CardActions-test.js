import React from 'react';
import CardActions from '../CardActions';
import { shallow } from 'enzyme';

describe('CardActions', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <CardActions className="extra-class">
        <div className="child">Test</div>
      </CardActions>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--card-footer__app-actions')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});
