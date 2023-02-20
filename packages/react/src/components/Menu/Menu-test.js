/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Menu, { MenuItem } from '../Menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Menu', () => {
  describe('renders as expected', () => {
    it('should place a className on the outermost element', () => {
      render(<Menu className="custom-class" open />);

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

    it('should call onClose on key down', () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose on click', () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      userEvent.click(screen.getByRole('menuitem'));

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

      expect(document.querySelector('.custom-class')).toBeInTheDocument();
      document.body.removeChild(el);
    });
  });
});

describe('MenuItem', () => {
  describe('renders as expected', () => {
    it('should be disabled', () => {
      render(<MenuItem label="item" disabled />);

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'aria-disabled',
        'true'
      );

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-option--disabled'
      );
    });

    it('should change kind based on prop', () => {
      render(<MenuItem label="item" kind="danger" />);

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-option--danger'
      );
    });

    it('should render label', () => {
      render(<MenuItem label="item" />);

      expect(screen.getByText('item')).toBeInTheDocument();
    });
  });
});
