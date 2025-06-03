/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem } from '../Menu';

import { MenuButton } from './';

const prefix = 'cds';

describe('MenuButton', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <MenuButton label="Actions" ref={ref}>
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(
        <MenuButton label="Actions" className="test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(
        <MenuButton label="Actions" data-testid="test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('renders props.label on the trigger button', () => {
      render(
        <MenuButton label="Test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(screen.getByRole('button')).toHaveTextContent(/^Test$/);
    });

    it('supports props.disabled', () => {
      render(
        <MenuButton label="Actions" disabled>
          <MenuItem label="Action" />
        </MenuButton>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });

    describe('supports props.size', () => {
      // Button component doesn't apply any size class for `lg`
      const sizes = ['sm', 'md'];

      sizes.forEach((size) => {
        it(`size="${size}"`, () => {
          render(
            <MenuButton label="Actions" size={size}>
              <MenuItem label="Action" />
            </MenuButton>
          );

          expect(screen.getByRole('button')).toHaveClass(
            `${prefix}--btn--${size}`
          );
        });
      });
    });

    describe('supports props.kind', () => {
      const kinds = ['primary', 'tertiary', 'ghost'];

      kinds.forEach((kind) => {
        it(`kind="${kind}"`, () => {
          render(
            <MenuButton label="Actions" kind={kind}>
              <MenuItem label="Action" />
            </MenuButton>
          );

          expect(screen.getByRole('button')).toHaveClass(
            `${prefix}--btn--${kind}`
          );
        });
      });
    });
  });

  describe('behaves as expected', () => {
    it('opens a menu on click', async () => {
      render(
        <MenuButton label="Actions">
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveTextContent(/^Action$/);
    });

    it('has basic keyboard support', async () => {
      const onClick = jest.fn();

      render(
        <MenuButton label="Actions">
          <MenuItem label="Action 1" />
          <MenuItem label="Action 2" onClick={onClick} />
        </MenuButton>
      );

      expect(document.body).toHaveFocus();

      // Tab to MenuButton.
      await userEvent.tab();
      const menuButton = screen.getByRole('button', { name: 'Actions' });
      expect(menuButton).toHaveFocus();

      // Open the menu with Enter.  Focus moves to first MenuItem.
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItem1 = screen.getByRole('menuitem', { name: 'Action 1' });
      expect(menuItem1).toHaveFocus();

      // Close the menu with Escape.  Focus should move back to MenuButton.
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
      expect(onClick).not.toHaveBeenCalled();

      // Open the menu with Space.  Focus moves to first MenuItem.
      await userEvent.keyboard(' ');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItem1Again = screen.getByRole('menuitem', { name: 'Action 1' });
      expect(menuItem1Again).toHaveFocus();

      // Arrow down to second MenuItem.
      await userEvent.keyboard('{ArrowDown}');
      const menuItem2 = screen.getByRole('menuitem', { name: 'Action 2' });
      expect(menuItem2).toHaveFocus();

      // Click the second MenuItem with Enter.  Menu should close, and focus should move back to MenuButton.
      await userEvent.keyboard('{Enter}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
      expect(onClick).toHaveBeenCalled();
    });

    it('does not steal focus', async () => {
      render(
        <>
          <MenuButton label="Actions">
            <MenuItem
              label="Action"
              onClick={() => {
                // This focus() should "override" Carbon's behavior to focus the MenuButton.
                document.querySelector('input')?.focus();
              }}
            />
          </MenuButton>
          <input />
        </>
      );

      expect(document.body).toHaveFocus();

      // Tab to MenuButton.
      await userEvent.tab();
      const menuButton = screen.getByRole('button', { name: 'Actions' });
      expect(menuButton).toHaveFocus();

      // Open the menu with Enter.  Focus moves to MenuItem.
      await userEvent.keyboard('{Enter}');
      const menuItem = screen.getByRole('menuitem', { name: 'Action' });
      expect(menuItem).toHaveFocus();

      // Click the MenuItem with Enter.  Menu should close, and focus should move to <input>.
      await userEvent.keyboard('{Enter}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toHaveFocus();

      // Shift-tab to MenuButton.
      await userEvent.tab({ shift: true });
      expect(menuButton).toHaveFocus();

      // Open the menu with Space.  Focus moves to MenuItem.
      await userEvent.keyboard(' ');
      const menuItemAgain = screen.getByRole('menuitem', { name: 'Action' });
      expect(menuItemAgain).toHaveFocus();

      // Click the MenuItem with Space.  Menu should close, and focus should move to <input>.
      await userEvent.keyboard(' ');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(input).toHaveFocus();
    });
  });

  describe('supports props.menuAlignment', () => {
    const alignments = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ];

    alignments.forEach((alignment) => {
      it(`menuAlignment="${alignment}"`, async () => {
        render(
          <MenuButton label="Actions" menuAlignment={alignment}>
            <MenuItem label="Action" />
          </MenuButton>
        );

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByRole('menu')).toHaveClass(
          `${prefix}--menu-button__${alignment}`
        );
      });
    });
  });
});
