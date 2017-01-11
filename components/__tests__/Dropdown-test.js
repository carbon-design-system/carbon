import React from 'react';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import Icon from '../Icon';
import ClickListener from '../../internal/ClickListener';
import { shallow, mount } from 'enzyme';

describe('Dropdown', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Dropdown
        className="extra-class"
        defaultText="Choose something.."
      />
    );
    const dropdownWrapper = wrapper.childAt(0);
    const mounted = mount(
      <Dropdown
        className="extra-class"
        defaultText="Choose something.."
      />
    );

    it('renders a dropdown', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(dropdownWrapper.hasClass('bx--dropdown')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(dropdownWrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      const dropdown = shallow(
        <Dropdown>
          <div className="test-child"></div>
          <div className="test-child"></div>
        </Dropdown>
      );
      expect(dropdown.find('.test-child').length).toEqual(2);
    });

    it('should use correct icon', () => {
      const icon = mounted.find(Icon);
      expect(icon.props().name).toEqual('caret--down');
    });

    it('has the expected default iconDescription', () => {
      expect(mounted.props().iconDescription).toEqual('open list of options');
    });

    it('adds new iconDescription when passed via props', () => {
      mounted.setProps({ iconDescription: 'new description' });
      expect(mounted.props().iconDescription).toEqual('new description');
    });

    it('should have iconDescription match Icon component description prop', () => {
      const matches = mounted.props().iconDescription === mounted.find(Icon).props().description;
      expect(matches).toEqual(true);
    });
  });

  describe('events', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <Dropdown onClick={onClick}>
        <DropdownItem className="test-child" itemText="test-child" value="test-child" />
      </Dropdown>
    );

    const dropdown = wrapper.find('.bx--dropdown');
    const child = wrapper.find('.test-child');

    it('should add the open dropdown class on click', () => {
      dropdown.simulate('click');
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(true);
    });

    it('should toggle the open dropdown class on Enter', () => {
      wrapper.setState({ open: false });
      dropdown.simulate('keypress', { which: 13 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(true);
      dropdown.simulate('keypress', { which: 13 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(false);
    });

    it('should toggle the open dropdown class on Space', () => {
      wrapper.setState({ open: false });
      dropdown.simulate('keypress', { which: 32 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(true);
      dropdown.simulate('keypress', { which: 32 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(false);
    });

    it('should update data value state when child item is clicked', () => {
      child.simulate('click');
      expect(dropdown.props().value).toEqual('test-child');
    });

    it('should update selected text when child item is clicked', () => {
      child.simulate('click');
      expect(wrapper.state().selectedText).toEqual('test-child');
    });
    it('should close dropdown on click outside', () => {
      wrapper.setState({ open: true });
      const listener = wrapper.find(ClickListener);
      listener.props().onClickOutside();
      expect(wrapper.state().open).toBe(false);
    });
  });
});
