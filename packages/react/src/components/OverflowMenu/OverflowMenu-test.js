/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Filter } from '@carbon/icons-react';
import OverflowMenu from './OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('OverflowMenu', () => {
  describe('Renders as expected', () => {
    const closeMenuMock = jest.fn();
    it('should support a custom `className` prop on the button element', () => {
      render(
        <OverflowMenu open aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    it('should forward ref', () => {
      const ref = React.createRef();
      render(
        <OverflowMenu open ref={ref} aria-label="Overflow menu">
          <OverflowMenuItem itemText="one" />
          <OverflowMenuItem itemText="two" />
        </OverflowMenu>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
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

    it('should always use button kind=ghost', () => {
      render(
        <OverflowMenu
          data-testid="test"
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).not.toHaveClass('cds--btn--primary');
      expect(screen.getByRole('button')).toHaveClass('cds--btn--ghost');
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

    it('should call onClick handler only once per click', async () => {
      const handleClick = jest.fn();

      render(
        <OverflowMenu
          open
          aria-label="Overflow menu"
          className="extra-class"
          onClick={handleClick}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      // Find the OverflowMenu button
      const button = screen.getByRole('button');

      // Click the OverflowMenu button
      await userEvent.click(button);

      // Check that the click handler was called only once
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  it('should not open menu when disabled', async () => {
    render(
      <OverflowMenu aria-label="Overflow menu" className="extra-class" disabled>
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('should close the menu when clicking outside', async () => {
    render(
      <div>
        <OverflowMenu aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
        <div data-testid="outside-element">Outside Element</div>
      </div>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(screen.getByTestId('outside-element'));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('should set aria-label for the icon using iconDescription prop', () => {
    const iconDescription = 'custom icon description';
    render(
      <OverflowMenu
        aria-label="Overflow menu"
        className="extra-class"
        iconDescription={iconDescription}>
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: iconDescription });
    const svgIcon = button.querySelector('.cds--overflow-menu__icon');
    expect(svgIcon).toHaveAttribute('aria-label', iconDescription);
  });
  it('should align menu based on direction prop', async () => {
    const { rerender } = render(
      <OverflowMenu
        direction="top"
        iconDescription="custom-icon"
        className="extra-class">
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);
    const menu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    expect(menu).toHaveAttribute('data-floating-menu-direction', 'top');

    rerender(
      <OverflowMenu
        direction="bottom"
        iconDescription="custom-icon"
        className="extra-class">
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const newMenu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    expect(newMenu).toHaveAttribute('data-floating-menu-direction', 'bottom');
  });
  it('focuses the next enabled menu item when pressing ArrowDown', async () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');

    menuItem1.focus();
    fireEvent.keyDown(menuItem1, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(menuItem3).toHaveFocus();
  });
  it('focuses the next enabled menu item when pressing ArrowUp', async () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');

    menuItem3.focus();
    expect(menuItem3).toHaveFocus();
    fireEvent.keyDown(menuItem3, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(menuItem1).toHaveFocus();
  });
  it('focuses the last enabled item when moving backwards from the first enabled item (case -1)', () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');
    menuItem1.focus();
    expect(menuItem1).toHaveFocus();
    fireEvent.keyDown(menuItem1, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(menuItem3).toHaveFocus();
  });

  it('focuses the first enabled item when moving forward from the last enabled item (case enabledIndices.length)', () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');
    menuItem3.focus();
    expect(menuItem3).toHaveFocus();
    fireEvent.keyDown(menuItem3, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(menuItem1).toHaveFocus();
  });
  it('closes the menu on Escape key press', async () => {
    render(
      <OverflowMenu open iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    expect(button).toHaveClass('cds--overflow-menu--open');

    const menu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });
    expect(button).not.toHaveClass('cds--overflow-menu--open');
    expect(button).toHaveFocus();
  });
  describe('Ref handling', () => {
    it('should support both standard ref and innerRef', () => {
      const standardRef = React.createRef();
      const innerRef = React.createRef();

      render(
        <OverflowMenu
          ref={standardRef}
          innerRef={innerRef}
          aria-label="Overflow menu"
          data-testid="overflow-menu">
          <OverflowMenuItem itemText="Option 1" />
          <OverflowMenuItem itemText="Option 2" />
        </OverflowMenu>
      );
      const buttonElement = screen.getByRole('button');
      expect(standardRef.current).not.toBeNull();
      expect(innerRef.current).not.toBeNull();
      expect(standardRef.current).toBe(buttonElement);
      expect(innerRef.current).toBe(buttonElement);

      // Verify both refs point to the same element & not null
      expect(standardRef.current).toBe(innerRef.current);
    });
  });
});
