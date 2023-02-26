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
      const { container } = render(
        <OverflowMenu open ariaLabel="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(container.querySelector('button.cds--overflow-menu')).toHaveClass(
        'extra-class'
      );
    });

    it('should spread extra props on the button element', () => {
      const { container } = render(
        <OverflowMenu
          data-testid="test"
          ariaLabel="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(
        container.querySelector('button.cds--overflow-menu')
      ).toHaveAttribute('data-testid', 'test');
    });

    it('should flip menu alignment', () => {
      render(
        <OverflowMenu
          flipped={true}
          ariaLabel="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      userEvent.click(screen.getByRole('button'));

      expect(
        document.querySelector('.cds--overflow-menu--flip')
      ).toBeInTheDocument();
    });

    it('should call onClick', () => {
      const onClick = jest.fn();
      render(
        <OverflowMenu
          ariaLabel="Overflow menu"
          className="extra-class"
          onClick={onClick}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onClose', () => {
      const onClose = jest.fn();
      render(
        <OverflowMenu
          ariaLabel="Overflow menu"
          className="extra-class"
          onClose={onClose}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      userEvent.click(screen.getByRole('button'));
      userEvent.click(screen.getByText('one'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onFocus', () => {
      const onFocus = jest.fn();
      render(
        <OverflowMenu
          ariaLabel="Overflow menu"
          className="extra-class"
          onFocus={onFocus}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      userEvent.click(screen.getByRole('button'));
      expect(onFocus).toHaveBeenCalled();
    });

    it('should render open if open is true', () => {
      render(
        <OverflowMenu open ariaLabel="Overflow menu" className="extra-class">
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
          ariaLabel="Overflow menu"
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
          ariaLabel="Overflow menu"
          className="extra-class"
          size="lg">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveClass('cds--overflow-menu--lg');
    });

    it('should open on click', () => {
      render(
        <OverflowMenu ariaLabel="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      );

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });
});
