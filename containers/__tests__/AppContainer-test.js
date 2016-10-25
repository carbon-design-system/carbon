import React from 'react';
import AppContainer from '../AppContainer';
import { shallow, mount } from 'enzyme';

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

    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });

  describe('state: theme', () => {
    const wrapper = mount(
      <AppContainer className="extra-class">
        <div className="child">Test</div>
      </AppContainer>
    );


    it('initial state is dark by default', () => {
      expect(wrapper.state().theme).toEqual('dark');
    });

    it('adds expected className when state changes to light', () => {
      const div = wrapper.find('.bx--body');
      const lightClass = 'bx--global-light-ui';
      wrapper.setProps({ theme: 'light' });
      expect(div.hasClass(lightClass)).toEqual(true);
    });


    it('toggles state via theme prop value', () => {
      wrapper.setProps({ theme: 'light' });
      expect(wrapper.state().theme).toEqual('light');
    });

    it('changes state when a new prop is given', () => {
      wrapper.setProps({ theme: 'light' });
      expect(wrapper.state().theme).toEqual('light');
      wrapper.setProps({ theme: 'dark' });
      expect(wrapper.state().theme).toEqual('dark');
    });
  });
});
