/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenu from './OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import { Filter } from '@carbon/icons-react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('OverflowMenu', () => {
  describe('Renders as expected', () => {
    it('should support a custom `className` prop on the button element', () => {
      render(
        <OverflowMenu open aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    it('should spread extra props on the button element', () => {
      render(
        <OverflowMenu
          data-testid="test"
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'test');
    });

    it('should flip menu alignment', async () => {
      render(
        <OverflowMenu
          flipped={true}
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelector('.cds--overflow-menu--flip')
      ).toBeInTheDocument();
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onClick={onClick}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onClose', async () => {
      const onClose = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onClose={onClose}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      await userEvent.click(screen.getByText('one'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onFocus', async () => {
      const onFocus = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onFocus={onFocus}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(onFocus).toHaveBeenCalled();
    });

    it('should render open if open is true', () => {
      render(
        <OverflowMenu open aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('should render icon from renderIcon', () => {
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          renderIcon={() => <Filter aria-label="filter icon" />}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'filter icon'
      );
    });

    it('should change size based on size prop', () => {
      render(
        <OverflowMenu
          open
          aria-label="Overflow menu"
          className="extra-class"
          size="lg">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveClass('cds--overflow-menu--lg');
    });

    it('should open on click', async () => {
      render(
        <OverflowMenu aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });
});
