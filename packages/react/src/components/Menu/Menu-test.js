/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Menu, MenuItem, MenuItemSelectable, MenuItemRadioGroup } from './';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    it('warns about nested menus in basic mode', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Menu open mode="basic">
          <MenuItem label="Submenu">
            <MenuItem label="Item" />
          </MenuItem>
        </Menu>
      );

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
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

    it('warns about MenuItemSelectable in basic mode', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Menu open mode="basic">
          <MenuItemSelectable label="Option" />
        </Menu>
      );

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warns about MenuItemRadioGroup in basic mode', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Menu open mode="basic">
          <MenuItemRadioGroup
            label="Options"
            items={['Option 1', 'Option 2']}
          />
        </Menu>
      );

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
