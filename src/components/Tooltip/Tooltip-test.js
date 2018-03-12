import React from 'react';
import debounce from 'lodash.debounce';
import Icon from '../Icon';
import FloatingMenu from '../../internal/FloatingMenu';
import Tooltip from '../Tooltip';
import { mount } from 'enzyme';

jest.mock('lodash.debounce');

debounce.mockImplementation(fn => fn);

describe('Tooltip', () => {
  describe('Renders as expected with defaults', () => {
    const wrapper = mount(
      <Tooltip triggerText="Tooltip">
        <p className="bx--tooltip__label">Tooltip label</p>
        <p>Lorem ipsum dolor sit amet</p>
      </Tooltip>
    );

    const trigger = wrapper.find('.bx--tooltip__trigger');

    describe('tooltip trigger', () => {
      it('renders a tooltip container', () => {
        expect(trigger.length).toEqual(1);
      });

      it('renders the info icon', () => {
        const icon = trigger.find(Icon);
        expect(icon.length).toBe(1);
        expect(icon.props().name).toBe('info--glyph');
      });
    });
  });

  describe('Renders as expected with specified properties', () => {
    const wrapper = mount(
      <Tooltip
        className="tooltip--class"
        triggerClassName="tooltip--trigger-class"
        triggerText="Tooltip"
        direction="bottom"
        menuOffset={{ left: 10, top: 15 }}
        showIcon={false}
        open={true}>
        {' '}
        <p className="bx--tooltip__label">Tooltip label</p>
        <p>Lorem ipsum dolor sit amet</p>
      </Tooltip>
    );

    const trigger = wrapper.find('.bx--tooltip__trigger');
    const floatingMenu = wrapper.find(FloatingMenu);

    describe('tooltip container', () => {
      it("sets the tooltip's position", () => {
        expect(floatingMenu.prop('menuDirection')).toEqual('bottom');
      });
      it("sets the tooltip's offset", () => {
        expect(floatingMenu.prop('menuOffset')).toEqual({ left: 10, top: 15 });
      });
      it('does not render info icon', () => {
        const icon = trigger.find(Icon);
        expect(icon.exists()).toBe(false);
      });
      it('sets the tooltip class', () => {
        expect(
          floatingMenu
            .find('[data-floating-menu-direction]')
            .first()
            .prop('className')
        ).toBe('bx--tooltip bx--tooltip--shown tooltip--class');
      });
      it('sets the trigger class', () => {
        expect(trigger.prop('className')).toBe(
          'bx--tooltip__trigger tooltip--trigger-class'
        );
      });
    });
  });

  describe('events', () => {
    it('hover changes state with icon', () => {
      const wrapper = mount(<Tooltip triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('mouseover');
      expect(wrapper.state().open).toEqual(true);
      icon.simulate('mouseout');
      expect(wrapper.state().open).toEqual(false);
    });

    it('focus/blur changes state with icon', () => {
      const wrapper = mount(<Tooltip triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('focus');
      expect(wrapper.state().open).toEqual(true);
      icon.simulate('blur');
      expect(wrapper.state().open).toEqual(false);
    });

    it('hover changes state with no icon', () => {
      const wrapper = mount(<Tooltip showIcon={false} triggerText="Tooltip" />);
      const trigger = wrapper.find('.bx--tooltip__trigger');
      trigger.simulate('mouseover');
      expect(wrapper.state().open).toEqual(true);
      trigger.simulate('mouseout');
      expect(wrapper.state().open).toEqual(false);
    });

    it('focus/blur changes state with no icon', () => {
      const wrapper = mount(<Tooltip showIcon={false} triggerText="Tooltip" />);
      const trigger = wrapper.find('.bx--tooltip__trigger');
      trigger.simulate('focus');
      expect(wrapper.state().open).toEqual(true);
      trigger.simulate('blur');
      expect(wrapper.state().open).toEqual(false);
    });

    it('click changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('click');
      expect(wrapper.state().open).toEqual(true);
      icon.simulate('click');
      expect(wrapper.state().open).toEqual(false);
    });

    it('hover does not change state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('mouseover');
      expect(wrapper.state().open).toEqual(false);
      icon.simulate('mouseout');
      expect(wrapper.state().open).toEqual(false);
    });

    it('Enter key press changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('keyDown', { which: 'Enter' });
      expect(wrapper.state().open).toEqual(true);
      icon.simulate('keyDown', { key: 13 });
      expect(wrapper.state().open).toEqual(false);
    });

    it('Space key press changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('keyDown', { which: ' ' });
      expect(wrapper.state().open).toEqual(true);
      icon.simulate('keyDown', { key: 32 });
      expect(wrapper.state().open).toEqual(false);
    });

    it('A different key press does not change state', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(Icon);
      icon.simulate('keyDown', { which: 'x' });
      expect(wrapper.state().open).toEqual(false);
    });

    it('should be in a closed state after handleOutsideClick() is invoked', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      expect(rootWrapper.state().open).toEqual(false);
      rootWrapper.setState({ open: true });
      rootWrapper.instance().handleClickOutside();
      expect(rootWrapper.state().open).toEqual(false);
    });

    it('prop.open change should update open state', () => {
      const rootWrapper = mount(<Tooltip open={false} triggerText="Tooltip" />);
      expect(rootWrapper.state().open).toEqual(false);
      rootWrapper.setProps({
        open: true,
        triggerText: 'Tooltip',
      });
      expect(rootWrapper.state().open).toEqual(true);
    });
  });

  describe('getTriggerPosition', () => {
    it('sets triggerPosition when triggerEl is set', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      rootWrapper.setState({
        triggerPosition: { left: 0, top: 0, right: 0, bottom: 0 },
      });
      rootWrapper.instance().getTriggerPosition();
      expect(rootWrapper.state().triggerPosition).not.toEqual({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    });
    it('does not set triggerPosition when triggerEl is not set', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      rootWrapper.setState({
        triggerPosition: { left: 0, top: 0, right: 0, bottom: 0 },
      });
      delete rootWrapper.instance().triggerEl;
      rootWrapper.instance().getTriggerPosition();
      expect(rootWrapper.state().triggerPosition).toEqual({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    });
  });
});
