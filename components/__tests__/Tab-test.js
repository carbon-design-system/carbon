import React from 'react';
import Tab from '../Tab';
import { shallow } from 'enzyme';

describe('Tab', () => {
  describe('renders as expected', () => {
    const wrapper = shallow(<Tab label="firstTab" />);

    it('adds extra classes that are passed via className', () => {
      wrapper.setProps({ className: 'extra-class' });
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });

    it('renders <a> with expected className', () => {
      expect(wrapper.find('a').hasClass('bx--tabs__nav-link')).toBe(true);
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

    it('should not have [className="bx--tabs__nav-item--selected"] by default', () => {
      expect(wrapper.hasClass('bx--tabs__nav-item--selected')).toBe(false);
    });

    it('adds [className="bx--tabs__nav-item--selected"] when selected prop is true', () => {
      wrapper.setProps({ selected: true });
      expect(wrapper.hasClass('bx--tabs__nav-item--selected')).toBe(true);
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
});
