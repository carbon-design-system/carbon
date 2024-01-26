/* eslint-disable testing-library/no-node-access */
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

import { ComboButton } from './';

const prefix = 'cds';

describe('ComboButton', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <ComboButton label="Primary action" ref={ref}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(
        <ComboButton label="Primary action" className="test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(
        <ComboButton label="Primary action" data-testid="test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('renders props.label on the trigger button', () => {
      render(
        <ComboButton label="Test">
          <MenuItem label="Additional action" />
        </ComboButton>
      );
      expect(screen.getAllByRole('button')[0]).toHaveTextContent(/^Test$/);
    });

    it('supports props.disabled', () => {
      render(
        <ComboButton label="Primary action" disabled>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      // primary action button
      expect(screen.getAllByRole('button')[0]).toBeDisabled();

      // trigger button
      expect(screen.getAllByRole('button')[1]).toBeDisabled();
    });

    describe('supports props.size', () => {
      const sizes = ['sm', 'md', 'lg'];

      sizes.forEach((size) => {
        it(`size="${size}"`, () => {
          const { container } = render(
            <ComboButton label="Primary action" size={size}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          expect(container.firstChild).toHaveClass(
            `${prefix}--combo-button__container--${size}`
          );
        });
      });
    });

    describe('supports props.tooltipAlignment', () => {
      const alignments = [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'right',
      ];

      alignments.forEach((alignment) => {
        it(`tooltipAlignment="${alignment}"`, () => {
          const { container } = render(
            <ComboButton label="Primary action" tooltipAlignment={alignment}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          expect(container.firstChild.lastChild).toHaveClass(
            `${prefix}--popover--${alignment}`
          );
        });
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
            <ComboButton label="Primary action" menuAlignment={alignment}>
              <MenuItem label="Additional action" />
            </ComboButton>
          );

          await userEvent.click(screen.getAllByRole('button')[1]);

          expect(screen.getByRole('menu')).toHaveClass(
            `${prefix}--combo-button__${alignment}`
          );
        });
      });
    });

    it('supports props.translateWithId', () => {
      const t = () => 'test';

      render(
        <ComboButton label="Primary action" translateWithId={t}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      const triggerButton = screen.getAllByRole('button')[1];
      const tooltipId = triggerButton.getAttribute('aria-labelledby');
      const tooltip = document.getElementById(tooltipId);

      expect(tooltip).toHaveTextContent(t());
    });
  });

  describe('behaves as expected', () => {
    it('emits props.onClick on primary action click', async () => {
      const onClick = jest.fn();
      render(
        <ComboButton label="Test" onClick={onClick}>
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      expect(onClick).toHaveBeenCalledTimes(0);
      await userEvent.click(screen.getAllByRole('button')[0]);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('opens a menu on click on the trigger button', async () => {
      render(
        <ComboButton label="Primary action">
          <MenuItem label="Additional action" />
        </ComboButton>
      );

      await userEvent.click(screen.getAllByRole('button')[1]);

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveTextContent(
        /^Additional action$/
      );
    });

    it('warns when MenuItemSelectable is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <ComboButton label="Primary action">
          <MenuItemSelectable label="Option" />
        </ComboButton>
      );

      await userEvent.click(screen.getAllByRole('button')[1]);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warns when MenuItemRadioGoup is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <ComboButton label="Primary action">
          <MenuItemRadioGroup
            label="Options"
            items={['Option 1', 'Option 2']}
          />
        </ComboButton>
      );

      await userEvent.click(screen.getAllByRole('button')[1]);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('warns when a nested Menu is used in children', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <ComboButton label="Primary action">
          <MenuItem label="Submenu">
            <MenuItem label="Action" />
          </MenuItem>
        </ComboButton>
      );

      await userEvent.click(screen.getAllByRole('button')[1]);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('supports ellipsis in ComboButton by checking the className', async () => {
      render(
        <ComboButton label="Primary action super long text to enable ellipsis">
          <MenuItem label="Submenu">
            <MenuItem label="Action" />
          </MenuItem>
        </ComboButton>
      );

      expect(
        screen.getByTitle('Primary action super long text to enable ellipsis')
          .parentElement
      ).toHaveClass(`${prefix}--combo-button__primary-action`);
    });
  });
});
