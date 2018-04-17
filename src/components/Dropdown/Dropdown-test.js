import React from 'react';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import Icon from '../Icon';
import ClickListener from '../../internal/ClickListener';
import { shallow, mount } from 'enzyme';

describe('Dropdown', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <Dropdown className="extra-class" defaultText="Choose something.." />
    );
    const dropdownWrapper = wrapper.childAt(0);
    const mounted = mount(
      <Dropdown className="extra-class" defaultText="Choose something.." />
    );

    it('renders a dropdown', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(dropdownWrapper.hasClass('bx--dropdown')).toEqual(true);
    });

    it('has the expected classes when disabled', () => {
      const wrapper = shallow(
        <Dropdown defaultText="Choose something.." disabled />
      ).childAt(0);

      expect(wrapper.hasClass('bx--dropdown--disabled')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(dropdownWrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      const dropdown = shallow(
        <Dropdown>
          <div className="test-child" />
          <div className="test-child" />
        </Dropdown>
      );
      expect(dropdown.find('.test-child').length).toEqual(2);
    });

    it('should handle null children', () => {
      const dropdown = shallow(
        <Dropdown>
          {null}
          <div className="test-child" />
          {null}
        </Dropdown>
      );
      expect(dropdown.find('.test-child').length).toEqual(1);
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
      const matches =
        mounted.props().iconDescription ===
        mounted.find(Icon).props().description;
      expect(matches).toEqual(true);
    });

    it('should start with the selected text over the default text when present in props', () => {
      const dropdown = shallow(
        <Dropdown defaultText="Choose something..." selectedText="Value">
          <DropdownItem itemText="Value" value="Value" />
        </Dropdown>
      );
      expect(dropdown.state().selectedText).toEqual('Value');
    });

    it('should select default text when provided selected text does not match any children', () => {
      const dropdown = shallow(
        <Dropdown defaultText="Choose something..." selectedText="NotValue">
          <DropdownItem itemText="Value" value="Value" />
        </Dropdown>
      );
      expect(dropdown.state().selectedText).toEqual('Choose something...');
    });
  });

  describe('events', () => {
    const onClick = jest.fn();
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const handleKeydown = jest.fn();

    const wrapper = mount(
      <Dropdown onClick={onClick} onOpen={onOpen} onClose={onClose}>
        <DropdownItem
          className="test-child"
          itemText="test-child"
          value="test-child"
        />
      </Dropdown>
    );

    const dropdown = wrapper.find('.bx--dropdown');
    const child = wrapper.find('.test-child');

    it('should add the open dropdown class on click', () => {
      dropdown.simulate('click');
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(true);
    });

    it('should toggle the open dropdown class on Enter', () => {
      wrapper.setState({ open: false });
      dropdown.simulate('keypress', { which: 13 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(true);
      dropdown.simulate('keypress', { which: 13 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(false);
    });

    it('should toggle the open dropdown class on Space', () => {
      wrapper.setState({ open: false });
      dropdown.simulate('keypress', { which: 32 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(true);
      dropdown.simulate('keypress', { which: 32 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(false);
    });

    it('should close when ESC is pressed', () => {
      const wrapper = mount(
        <Dropdown handleKeydown={handleKeydown}>
          <DropdownItem
            className="test-child"
            itemText="test-child"
            value="test-child"
          />
        </Dropdown>
      );

      wrapper.setState({ open: true });
      wrapper.mount();
      dropdown.simulate('keypress', { which: 27 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(false);
      dropdown.simulate('keypress', { which: 27 });
      expect(
        wrapper.find('.bx--dropdown').hasClass('bx--dropdown--open')
      ).toEqual(false);
      wrapper.unmount();
    });

    it('should update data value state when child item is clicked', () => {
      child.last().simulate('click');
      expect(wrapper.find('.bx--dropdown').props().value).toEqual('test-child');
    });

    it('should update selected text when child item is clicked', () => {
      child.last().simulate('click');
      expect(wrapper.state().selectedText).toEqual('test-child');
    });

    it('should close dropdown on click outside', () => {
      wrapper.setState({ open: true });
      const listener = wrapper.find(ClickListener);
      listener.props().onClickOutside();
      expect(wrapper.state().open).toBe(false);
    });

    it('fires open and close callbacks when the dropdown is clicked', () => {
      onOpen.mockReset();
      onClose.mockReset();
      dropdown.simulate('click');
      expect(onOpen).toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      dropdown.simulate('click');
      expect(onOpen).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    it('should not open when disabled', () => {
      const wrapper = mount(
        <Dropdown onClick={onClick} disabled>
          <DropdownItem
            className="test-child"
            itemText="test-child"
            value="test-child"
          />
        </Dropdown>
      );
      const dropdown = wrapper.find('.bx--dropdown--disabled');

      dropdown.simulate('click');
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(false);
      dropdown.simulate('keypress', { which: 13 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(false);
      dropdown.simulate('keypress', { which: 32 });
      expect(dropdown.hasClass('bx--dropdown--open')).toEqual(false);
      expect(wrapper.state().open).toBe(false);
    });
  });
});
