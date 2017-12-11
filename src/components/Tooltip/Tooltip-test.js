import React from 'react';
import Icon from '../Icon';
import FloatingMenu from '../../internal/FloatingMenu';
import Tooltip from '../Tooltip';
import { mount } from 'enzyme';

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
        triggerText="Tooltip"
        direction="bottom"
        menuOffset={{ left: 10, top: 15 }}
        showIcon={false}>
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
    });
  });

  describe('events', () => {
    it('hover changes state', () => {
      const wrapper = mount(
        <Tooltip triggerText="Tooltip">
          <p className="bx--tooltip__label">Tooltip label</p>
          <p>Lorem ipsum dolor sit amet</p>
        </Tooltip>
      );

      const icon = wrapper.find(Icon);

      icon.simulate('mouseover');
      expect(wrapper.state().open).toEqual(true);

      icon.simulate('mouseout');
      expect(wrapper.state().open).toEqual(false);
    });
  });
});
