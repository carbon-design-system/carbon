/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('OverflowMenuItem - RTL', () => {
  describe('renders as expected', () => {
    it('should support a className on the button node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          className="test-item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveClass('test-item');
    });

    it('should support a className on the outermost node', () => {
      const { container } = render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          wrapperClassName="test-item"
        />
      );

      expect(container.firstChild).toHaveClass('test-item');
    });

    it('should spread extra props on the button node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          data-testid="test"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should support a className on the anchor node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          href="carbondesignsystem.com"
          itemText="one"
          className="test-item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveClass('test-item');
    });

    it('should spread extra props on the anchor node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          href="carbondesignsystem.com"
          data-testid="test"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should call closeMenu on click', async () => {
      const closeMenu = jest.fn();
      render(<OverflowMenuItem closeMenu={closeMenu} itemText="one" />);

      await userEvent.click(screen.getByRole('menuitem'));

      expect(closeMenu).toHaveBeenCalled();
    });

    it('should be disabled', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" disabled />
      );

      expect(container.firstChild).toHaveClass(
        'cds--overflow-menu-options__option--disabled'
      );

      expect(container.firstChild.firstChild).toHaveProperty('disabled', true);
    });

    it('should have divider', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" hasDivider />
      );

      expect(container.firstChild).toHaveClass('cds--overflow-menu--divider');
    });

    it('should be delete button', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" isDelete />
      );

      expect(container.firstChild).toHaveClass(
        'cds--overflow-menu-options__option--danger'
      );
    });

    it('should render itemText', () => {
      render(<OverflowMenuItem closeMenu={jest.fn()} itemText="one" />);

      expect(screen.getByText('one')).toBeInTheDocument();
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should call onMouseDown', async () => {
      const onMouseDown = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseDown={onMouseDown}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseDown).toHaveBeenCalled();
    });

    it('should call onMouseEnter', async () => {
      const onMouseEnter = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseEnter={onMouseEnter}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call onMouseUp', async () => {
      const onMouseUp = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseUp={onMouseUp}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseUp).toHaveBeenCalled();
    });

    it('should call onFocus', async () => {
      const onFocus = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onFocus={onFocus}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onKeyDown', async () => {
      const onKeyDown = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onKeyDown={onKeyDown}
        />
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call onKeyUp', async () => {
      const onKeyUp = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onKeyUp={onKeyUp}
        />
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onKeyUp).toHaveBeenCalled();
    });

    it('should have title', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          requireTitle
          title="menu item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'title',
        'menu item'
      );
    });
  });
});
