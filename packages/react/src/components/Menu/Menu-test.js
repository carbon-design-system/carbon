/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Menu, MenuItem, MenuItemSelectable, MenuItemRadioGroup } from './';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitForPosition } from '../ListBox/test-helpers';

describe('Menu', () => {
  describe('renders as expected', () => {
    it('should place a className on the outermost element', () => {
      render(<Menu className="custom-class" open />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.custom-class')).toBeDefined();
    });

    it('should spread props onto ul', () => {
      render(<Menu data-testid="test-id" open />);

      expect(screen.getByRole('menu')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('have an id when one is provided', () => {
      render(<Menu id="test-id" open />);

      expect(screen.getByRole('menu')).toHaveAttribute('id', 'test-id');
    });

    it('should call onClose on key down', async () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose on click', async () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should be open if open is supplied', () => {
      render(<Menu open />);

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should change size based on size prop', () => {
      render(<Menu open size="lg" />);

      expect(screen.getByRole('menu')).toHaveClass('cds--menu--lg');
    });

    it('should append to target element', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      el.classList.add('custom-class');
      render(<Menu open target={el} />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
      document.body.removeChild(el);
    });
  });

  describe('Submenu behavior', () => {
    beforeEach(async () => {
      jest.useFakeTimers();
      render(
        <Menu open>
          <MenuItem label="Submenu">
            <MenuItem label="Item" />
          </MenuItem>
        </Menu>
      );
      await waitForPosition();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('should only show parent and not then submenu when not hovered', () => {
      const menus = screen.getAllByRole('menu');
      expect(menus.length).toBe(2);
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');
    });

    it('should show sub menu when hovered for hoverIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() =>
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        )
      );
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');

      await act(() => jest.runOnlyPendingTimers());
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');
    });

    it('should close sub menu on leave after leaveIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() => {
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');

      await act(() => {
        fireEvent.mouseLeave(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');
    });

    it('should cancel close sub menu on leave and reenter before leaveIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() => {
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');

      await act(() => {
        fireEvent.mouseLeave(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');
    });
  });
});

describe('MenuItem', () => {
  describe('renders as expected', () => {
    it('should be disabled', () => {
      render(
        <Menu open>
          <MenuItem label="item" disabled />
        </Menu>
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'aria-disabled',
        'true'
      );

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-item--disabled'
      );
    });

    it('should change kind based on prop', () => {
      render(
        <Menu open>
          <MenuItem label="item" kind="danger" />
        </Menu>
      );

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-item--danger'
      );
    });

    it('should render label', () => {
      render(
        <Menu open>
          <MenuItem label="item" />
        </Menu>
      );

      expect(screen.getByText('item')).toBeInTheDocument();
    });
  });

  it('should call MenuItemRadioGroup onChange once', async () => {
    const onChange = jest.fn();

    render(
      <Menu open label="Menu">
        <MenuItem label="Menu">
          <MenuItemRadioGroup
            label="MenuItemRadioGroup"
            items={[
              { label: 'Item 1', value: '1' },
              { label: 'Item 2', value: '2' },
            ]}
            onChange={onChange}
            itemToString={(item) => item.label}
          />
        </MenuItem>
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Menu'));
    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should call MenuItemSelectable onChange once with correct value', async () => {
    const onChange = jest.fn();

    const { rerender } = render(
      <Menu open label="Menu">
        <MenuItemSelectable
          label="Item 1"
          onChange={onChange}
          selected={false}
        />
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);

    onChange.mockClear();
    rerender(
      <Menu open label="Menu">
        <MenuItemSelectable label="Item 1" onChange={onChange} selected />
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  describe('accessibility', () => {
    it('should focus the first focusable menu item on open', async () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Item 1" />
          <MenuItem label="Item 2" />
        </Menu>
      );

      const item1 = await screen.findByRole('menuitem', { name: 'Item 1' });
      expect(document.activeElement).toBe(item1);
    });

    it('should skip disabled items when determining first focusable', () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Disabled" disabled />
          <MenuItem label="Focusable" />
        </Menu>
      );

      const items = screen.getAllByRole('menuitem');
      expect(items[0]).toHaveAttribute('tabindex', '-1');
      expect(items[1]).toHaveAttribute('tabindex', '0');
    });

    it('moves focus to submenu when opening via ArrowRight key', async () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Parent">
            <MenuItem label="Child" />
          </MenuItem>
        </Menu>
      );

      const parentItem = screen.getAllByRole('menuitem')[0];
      parentItem.focus();
      expect(parentItem).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');

      const child = screen.getByRole('menuitem', { name: 'Child' });
      expect(child).toBeVisible();

      expect(child).toHaveFocus();
    });
  });
});
