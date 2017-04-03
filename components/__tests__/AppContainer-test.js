import React from 'react';
import AppContainer from '../AppContainer';
import { shallow } from 'enzyme';

describe('AppContainer', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <AppContainer className="extra-class">
        <div className="child">Test</div>
      </AppContainer>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--body')).toEqual(true);
    });
  });
});
