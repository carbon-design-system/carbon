/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, useState } from 'react';
import debounce from 'lodash.debounce'; // eslint-disable-line no-unused-vars
import FloatingMenu from '../../internal/FloatingMenu';
import Tooltip from '../Tooltip';
import Link from '../Link';
import Button from '../Button';
import { mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Information16 as Information,
  Add16 as Add,
  OverflowMenuVertical16,
} from '@carbon/icons-react';
import '@testing-library/jest-dom';

const prefix = 'cds';

jest.mock('lodash.debounce', () => (fn) => {
  fn.cancel = jest.fn();
  return fn;
});

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
        <p className={`${prefix}--tooltip__label`}>Tooltip label</p>
        <p>Lorem ipsum dolor sit amet</p>
      </Tooltip>
    );

    const trigger = wrapper.find(`.${prefix}--tooltip__trigger`);

    describe('tooltip trigger', () => {
      it('renders a tooltip container', () => {
        expect(trigger.length).toEqual(1);
      });

      it('renders the info icon', () => {
        const icon = trigger.find(Information);
        expect(icon.length).toBe(1);
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
    const label = wrapper.find(`.${prefix}--tooltip__label`);
    const floatingMenu = wrapper.find(FloatingMenu);

    describe('tooltip container', () => {
      it("sets the tooltip's position", () => {
        expect(floatingMenu.prop('menuDirection')).toEqual('bottom');
      });
      it("sets the tooltip's offset", () => {
        expect(floatingMenu.prop('menuOffset')).toEqual({ left: 10, top: 15 });
      });
      it('does not render info icon', () => {
        const icon = label.find(Information);
        expect(icon.exists()).toBe(false);
      });
      it('sets the tooltip class', () => {
        expect(
          floatingMenu
            .find('[data-floating-menu-direction]')
            .first()
            .prop('className')
        ).toBe(
          `${prefix}--tooltip ${prefix}--tooltip--shown ${prefix}--tooltip--bottom ${prefix}--tooltip--align-center tooltip--class`
        );
      });
      it('sets the trigger class', () => {
        expect(label.prop('className')).toBe(
          `${prefix}--tooltip__label tooltip--trigger-class`
        );
      });
    });
  });

  describe('Renders as expected when an Icon component wrapped with forwardRef is provided', () => {
    const wrapper = mount(<Tooltip renderIcon={Add} />);

    it('does render Icon', () => {
      const icon = wrapper.find(Add);
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

    it('does render provided custom icon component instance', () => {
      const icon = wrapper.find(CustomIcon);
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Renders as expected when custom icon component with inner forwardRef is provided', () => {
    const wrapper = mount(<Tooltip renderIcon={OverflowMenuVertical16} />);

    it('does render provided custom icon component instance', () => {
      const icon = wrapper.find(OverflowMenuVertical16);
      expect(icon.exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('A different key press does not change state', () => {
      const wrapper = mount(<Tooltip triggerText="Tooltip" />);
      const icon = wrapper.find(Information);
      icon.simulate('keyDown', { which: 'x' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toBeFalsy();
    });

    it('A different key press does not change state when custom icon is set', () => {
      const wrapper = mount(
        <Tooltip
          renderIcon={React.forwardRef((props, ref) => (
            <div className="custom-icon" ref={ref} />
          ))}
          triggerText="Tooltip"
        />
      );
      const icon = wrapper.find('.custom-icon');
      icon.simulate('keyDown', { which: 'x' });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(wrapper.find('Tooltip').instance().state.open).toBeFalsy();
    });

    it('should be in a closed state after handleOutsideClick() is invoked', () => {
      const rootWrapper = mount(<Tooltip triggerText="Tooltip" />);
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toBeFalsy();
      // Enzyme doesn't seem to allow setState() in a forwardRef-wrapped class component
      rootWrapper.find('Tooltip').instance().setState({ open: true });
      rootWrapper.update();
      rootWrapper.find('Tooltip').instance().handleClickOutside();
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
      rootWrapper.find('Tooltip').instance().setState({ open: false });
      rootWrapper.update();
      rootWrapper.setProps({ open: true });
      // Enzyme doesn't seem to allow state() in a forwardRef-wrapped class component
      expect(rootWrapper.find('Tooltip').instance().state.open).toEqual(false);
    });

    it('escape key keyDown should not bubble outside the tooltip', () => {
      const onKeyDown = jest.fn();
      render(
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onKeyDown={onKeyDown}>
            <Tooltip triggerText="Tooltip" />
          </div>
        </>
      );

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.keyboard('{esc}');

      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('should close the tooltip when escape key is pressed', () => {
      render(
        <Tooltip triggerText="trigger text" tooltipBodyId="tooltip-body">
          <p id="tooltip-body">tooltip body</p>
        </Tooltip>
      );

      expect(screen.queryByText('trigger text')).toBeInTheDocument();
      expect(screen.queryByText('tooltip body')).not.toBeInTheDocument();

      const triggerButton = screen.getByRole('button');
      userEvent.click(triggerButton);
      // I am unsure why, but the trigger must be clicked a second time for the tooltip body to appear
      userEvent.click(triggerButton);

      expect(screen.queryByText('tooltip body')).toBeInTheDocument();

      userEvent.keyboard('{esc}');

      expect(screen.queryByText('tooltip body')).not.toBeInTheDocument();
    });

    it('should not call onChange on focus of an interactive element in body when controlled', () => {
      const onChange = jest.fn();
      function ControlledWithStateOnChange() {
        const [tipOpen, setTipOpen] = useState(false);
        const handleChange = (ev, { open }) => {
          onChange(ev, { open });
          setTipOpen(open);
        };

        return (
          <Tooltip
            direction="bottom"
            tabIndex={0}
            triggerText="ControlledWithStateOnChange label"
            onChange={handleChange}
            open={tipOpen}>
            <p>
              This is some tooltip text. This box shows the maximum amount of
              text that should be displayed inside. If more room is needed, use
              a modal instead.
            </p>
            <div className="bx--tooltip__footer">
              <Link href="#">Learn more</Link>
              <Button size="small" onClick={() => setTipOpen(false)}>
                Create
              </Button>
            </div>
          </Tooltip>
        );
      }

      render(<ControlledWithStateOnChange />);

      expect(
        screen.queryByText('ControlledWithStateOnChange label')
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Create' })
      ).not.toBeInTheDocument();

      // The trigger to open the tooltip
      userEvent.click(screen.getByRole('button'));

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          type: 'focus',
        }),
        expect.objectContaining({
          open: false,
        })
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          type: 'click',
        }),
        expect.objectContaining({
          open: true,
        })
      );

      expect(
        screen.queryByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Create' }));
      expect(
        screen.queryByRole('button', { name: 'Create' })
      ).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          type: 'focus',
          target: expect.objectContaining({
            className: `${prefix}--tooltip__trigger`,
          }),
        }),
        expect.objectContaining({
          open: false,
        })
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          type: 'click',
          target: expect.objectContaining({
            className: `${prefix}--tooltip__trigger`,
          }),
        }),
        expect.objectContaining({
          open: true,
        })
      );
    });
  });
});
