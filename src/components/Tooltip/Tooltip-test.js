/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Information from '@carbon/icons-react/lib/information/16';
import { iconInfoGlyph } from 'carbon-icons';
import Icon from '../Icon';
import FloatingMenu from '../../internal/FloatingMenu';
import Tooltip from '../Tooltip';
import { mount } from 'enzyme';
import OverflowMenuVertical16 from '@carbon/icons-react/lib/overflow-menu--vertical/16';
import { breakingChangesX, componentsX } from '../../internal/FeatureFlags';

jest.mock('lodash.debounce');

debounce.mockImplementation(fn => fn);

describe('Tooltip', () => {
  // An icon component class
  class CustomIcon extends Component {
    render() {
      return <div />;
    }
  }

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
        const icon = trigger.find(!componentsX ? Icon : Information);
        expect(icon.length).toBe(1);
        if (!componentsX) {
          expect(icon.props().icon).toBe(iconInfoGlyph);
          expect(icon.props().iconTitle).toBe('');
        }
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
        <p>Tooltip label</p>
        <p>Lorem ipsum dolor sit amet</p>
      </Tooltip>
    );
    const label = wrapper.find('.bx--tooltip__label');
    const floatingMenu = wrapper.find(FloatingMenu);

    describe('tooltip container', () => {
      it("sets the tooltip's position", () => {
        expect(floatingMenu.prop('menuDirection')).toEqual('bottom');
      });
      it("sets the tooltip's offset", () => {
        expect(floatingMenu.prop('menuOffset')).toEqual({ left: 10, top: 15 });
      });
      it('does not render info icon', () => {
        const icon = label.find(Icon);
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
        expect(label.prop('className')).toBe(
          'bx--tooltip__label tooltip--trigger-class'
        );
      });
    });
  });

  describe('Renders as expected when an Icon component wrapped with forwardRef is provided', () => {
    const wrapper = mount(
      <Tooltip
        renderIcon={React.forwardRef(() => (
          <Icon name="icon--add" />
        ))}
      />
    );

    it('does render Icon', () => {
      const icon = wrapper.find(Icon);
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Renders as expected when custom icon component with forwardRef is provided', () => {
    const wrapper = mount(
      <Tooltip
        renderIcon={React.forwardRef(() => (
          <CustomIcon />
        ))}
      />
    );

    it('does not render Icon', () => {
      const icon = wrapper.find(Icon);
      expect(icon.exists()).toBe(false);
    });

    it('does render provided custom icon component instance', () => {
      const icon = wrapper.find(CustomIcon);
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Renders as expected when custom icon component with inner forwardRef is provided', () => {
    const wrapper = mount(<Tooltip renderIcon={OverflowMenuVertical16} />);

    it('does not render Icon', () => {
      const icon = wrapper.find(Icon);
      expect(icon.exists()).toBe(false);
    });

    it('does render provided custom icon component instance', () => {
      const icon = wrapper.find(OverflowMenuVertical16);
      expect(icon.exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('hover changes state with icon', () => {
      if (!breakingChangesX) {
        const wrapper = mount(<Tooltip triggerText="Tooltip" />);
        const icon = wrapper.find(Icon);
        icon.simulate('mouseover');
        expect(wrapper.state().open).toEqual(true);
        icon.simulate('mouseout');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('focus/blur changes state with icon', () => {
      if (!breakingChangesX) {
        const wrapper = mount(<Tooltip triggerText="Tooltip" />);
        const icon = wrapper.find(Icon);
        icon.simulate('focus');
        expect(wrapper.state().open).toEqual(true);
        icon.simulate('blur');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('hover changes state with no icon', () => {
      if (!breakingChangesX) {
        const wrapper = mount(
          <Tooltip showIcon={false} triggerText="Tooltip" />
        );
        const label = wrapper.find('.bx--tooltip__label');
        label.simulate('mouseover');
        expect(wrapper.state().open).toEqual(true);
        label.simulate('mouseout');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('focus/blur changes state with no icon', () => {
      if (!breakingChangesX) {
        const wrapper = mount(
          <Tooltip showIcon={false} triggerText="Tooltip" />
        );
        const label = wrapper.find('.bx--tooltip__label');
        label.simulate('focus');
        expect(wrapper.state().open).toEqual(true);
        label.simulate('blur');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('hover changes state with custom icon', () => {
      if (!breakingChangesX) {
        const wrapper = mount(
          <Tooltip
            renderIcon={React.forwardRef((props, ref) => (
              <div className="custom-icon" ref={ref} />
            ))}
            triggerText="Tooltip"
          />
        );
        const icon = wrapper.find('.custom-icon');
        icon.simulate('mouseover');
        expect(wrapper.state().open).toEqual(true);
        icon.simulate('mouseout');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('click changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(!componentsX ? Icon : Information);
      icon.simulate('click');
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('click');
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('click changes state when clickToOpen and custom icon are set', () => {
      const wrapper = mount(
        <Tooltip
          renderIcon={React.forwardRef((props, ref) => (
            <div className="custom-icon" ref={ref} />
          ))}
          clickToOpen
          triggerText="Tooltip"
        />
      );
      const icon = wrapper.find('.custom-icon');
      icon.simulate('click');
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('click');
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('hover does not change state when clickToOpen is set', () => {
      if (!breakingChangesX) {
        const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
        const icon = wrapper.find(Icon);
        icon.simulate('mouseover');
        expect(wrapper.state().open).toEqual(false);
        icon.simulate('mouseout');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('hover does not change state when clickToOpen and custom icon are set', () => {
      if (!breakingChangesX) {
        const wrapper = mount(
          <Tooltip
            renderIcon={React.forwardRef((props, ref) => (
              <div className="custom-icon" ref={ref} />
            ))}
            clickToOpen
            triggerText="Tooltip"
          />
        );
        const icon = wrapper.find('.custom-icon');
        icon.simulate('mouseover');
        expect(wrapper.state().open).toEqual(false);
        icon.simulate('mouseout');
        expect(wrapper.state().open).toEqual(false);
      }
    });

    it('Enter key press changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(!componentsX ? Icon : Information);
      icon.simulate('keyDown', { which: 'Enter' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('keyDown', { key: 13 });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('Enter key press changes state when clickToOpen and custom icon are set', () => {
      const wrapper = mount(
        <Tooltip
          renderIcon={React.forwardRef((props, ref) => (
            <div className="custom-icon" ref={ref} />
          ))}
          clickToOpen
          triggerText="Tooltip"
        />
      );
      const icon = wrapper.find('.custom-icon');
      icon.simulate('keyDown', { which: 'Enter' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('keyDown', { key: 13 });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('Space key press changes state when clickToOpen is set', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(!componentsX ? Icon : Information);
      icon.simulate('keyDown', { which: ' ' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('keyDown', { key: 32 });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('Space key press changes state when clickToOpen and custom icon are set', () => {
      const wrapper = mount(
        <Tooltip
          renderIcon={React.forwardRef((props, ref) => (
            <div className="custom-icon" ref={ref} />
          ))}
          clickToOpen
          triggerText="Tooltip"
        />
      );
      const icon = wrapper.find('.custom-icon');
      icon.simulate('keyDown', { which: ' ' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(true);
      icon.simulate('keyDown', { key: 32 });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('A different key press does not change state', () => {
      const wrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      const icon = wrapper.find(!componentsX ? Icon : Information);
      icon.simulate('keyDown', { which: 'x' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('A different key press does not change state when custom icon is set', () => {
      const wrapper = mount(
        <Tooltip
          renderIcon={React.forwardRef((props, ref) => (
            <div className="custom-icon" ref={ref} />
          ))}
          clickToOpen
          triggerText="Tooltip"
        />
      );
      const icon = wrapper.find('.custom-icon');
      icon.simulate('keyDown', { which: 'x' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('should be in a closed state after handleOutsideClick() is invoked', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(false);
      // Enzyme doesn't seem to allow setState() in a forwardRef-wrapped class component
      rootWrapper
        .find('Tooltip')
        .instance()
        .setState({ open: true });
      rootWrapper.update();
      rootWrapper
        .find('Tooltip')
        .instance()
        .handleClickOutside();
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('prop.open change should update open state', () => {
      const rootWrapper = mount(<Tooltip open={false} triggerText="Tooltip" />);
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(false);
      rootWrapper.setProps({
        open: true,
        triggerText: 'Tooltip',
      });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(true);
    });

    it('should avoid change the open state upon setting props, unless there the value actually changes', () => {
      const rootWrapper = mount(<Tooltip />);
      rootWrapper.setProps({ open: true });
      // Enzyme doesn't seem to allow setState() in a forwardRef-wrapped class component
      rootWrapper
        .find('Tooltip')
        .instance()
        .setState({ open: false });
      rootWrapper.update();
      rootWrapper.setProps({ open: true });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(false);
    });
  });

  describe('getTriggerPosition', () => {
    it('sets triggerPosition when triggerEl is set', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      // Enzyme doesn't seem to allow setState() in a forwardRef-wrapped class component
      rootWrapper
        .find('Tooltip')
        .instance()
        .setState({
          triggerPosition: { left: 0, top: 0, right: 0, bottom: 0 },
        });
      rootWrapper.update();
      rootWrapper
        .find('Tooltip')
        .instance()
        .getTriggerPosition();
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').state.triggerPosition).not.toEqual({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    });
    it('does not set triggerPosition when triggerEl is not set', () => {
      const rootWrapper = mount(<Tooltip clickToOpen triggerText="Tooltip" />);
      // Enzyme doesn't seem to allow setState() in a forwardRef-wrapped class component
      rootWrapper
        .find('Tooltip')
        .instance()
        .setState({
          triggerPosition: { left: 0, top: 0, right: 0, bottom: 0 },
        });
      rootWrapper.update();
      delete rootWrapper.find('Tooltip').instance().triggerEl;
      rootWrapper
        .find('Tooltip')
        .instance()
        .getTriggerPosition();
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(
        rootWrapper.find('Tooltip').instance().state.triggerPosition
      ).toEqual({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    });
  });
});
