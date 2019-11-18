/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Tab from '../Tab';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Tab', () => {
  describe('renders as expected', () => {
    const wrapper = shallow(<Tab label="firstTab" />);

    it('adds extra classes that are passed via className', () => {
      wrapper.setProps({ className: 'extra-class' });
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders <a> with expected className', () => {
      expect(wrapper.find('a').hasClass(`${prefix}--tabs__nav-link`)).toBe(
        true
      );
    });

    it('renders <li> with [role="presentation"]', () => {
      expect(wrapper.props().role).toEqual('presentation');
    });

    it('renders <a> with [role="tab"]', () => {
      expect(wrapper.find('a').props().role).toEqual('tab');
    });

    it('renders <a> with tabindex set to 0', () => {
      expect(wrapper.find('a').props().tabIndex).toEqual(0);
    });

    it('sets tabIndex on <a> if one is passed via props', () => {
      wrapper.setProps({ tabIndex: 2 });
      expect(wrapper.find('a').props().tabIndex).toEqual(2);
    });

    it('uses label to set children on <a> when passed via props', () => {
      expect(wrapper.find('a').props().children).toEqual('firstTab');
    });

    it('sets href as # by default', () => {
      expect(wrapper.find('a').props().href).toEqual('#');
    });

    it('sets new href value when passed in via props', () => {
      wrapper.setProps({ href: '#other-content' });
      expect(wrapper.find('a').props().href).toEqual('#other-content');
    });

    it(`should not have [className="${prefix}--tabs__nav-item--selected"] by default`, () => {
      expect(wrapper.hasClass(`${prefix}--tabs__nav-item--selected`)).toBe(
        false
      );
    });

    it('has aria-disabled that matches disabled', () => {
      const getDisabledRegion = () => wrapper.find('[aria-disabled]');

      expect(getDisabledRegion().length).toEqual(0);

      wrapper.setProps({ disabled: true });
      expect(getDisabledRegion().prop('aria-disabled')).toEqual(true);
    });

    it(`adds [className="${prefix}--tabs__nav-item--selected"] when selected prop is true`, () => {
      wrapper.setProps({ selected: true });
      expect(wrapper.hasClass(`${prefix}--tabs__nav-item--selected`)).toBe(
        true
      );
    });
  });

  describe('events', () => {
    describe('click', () => {
      const onClick = jest.fn();
      const handleTabClick = jest.fn();
      const wrapper = shallow(<Tab label="firstTab" />);

      it('invokes handleTabClick from onClick prop', () => {
        wrapper.setProps({ handleTabClick });
        wrapper.simulate('click');
        expect(handleTabClick).toBeCalled();
      });

      it('invokes onClick when a function is passed to onClick prop', () => {
        wrapper.setProps({ onClick });
        wrapper.simulate('click');
        expect(onClick).toBeCalled();
      });
    });

    describe('keydown', () => {
      const onKeyDown = jest.fn();
      const handleTabAnchorFocus = jest.fn();
      const handleTabKeyDown = jest.fn();
      const wrapper = shallow(<Tab label="firstTab" />);
      wrapper.setProps({ onKeyDown, handleTabAnchorFocus, handleTabKeyDown });

      it('invokes onKeyDown when a function is passed to onKeyDown prop', () => {
        wrapper.simulate('keyDown', { which: 38 });
        expect(onKeyDown).toBeCalled();
        expect(handleTabAnchorFocus).not.toBeCalled();
      });

      it('invokes handleTabAnchorFocus when onKeyDown occurs for appropriate events', () => {
        wrapper.simulate('keyDown', { which: 37 });
        expect(onKeyDown).toBeCalled();
        expect(handleTabAnchorFocus).toBeCalled();
      });
    });
  });

  describe('custom render label', () => {
    const wrapper = mount(
      <Tab
        renderAnchor={() => (
          <a id="custom-label" href="#other-content">
            Content
          </a>
        )}
      />
    );
    expect(wrapper.find('#custom-label').props().href).toEqual(
      '#other-content'
    );
  });
});
