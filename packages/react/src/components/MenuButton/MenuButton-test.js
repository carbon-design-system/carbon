/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem, MenuItemSelectable, MenuItemRadioGroup } from '../Menu';

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

    it('warns when MenuItemSelectable is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MenuButton label="Primary action">
          <MenuItemSelectable label="Option" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warns when MenuItemRadioGoup is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MenuButton label="Primary action">
          <MenuItemRadioGroup
            label="Options"
            items={['Option 1', 'Option 2']}
          />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warns when a nested Menu is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MenuButton label="Primary action">
          <MenuItem label="Submenu">
            <MenuItem label="Action" />
          </MenuItem>
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
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
