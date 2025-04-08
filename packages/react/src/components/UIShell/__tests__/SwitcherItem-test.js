/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import SwitcherItem from '../SwitcherItem';

describe('SwitcherItem', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto Link element', () => {
      render(
        <SwitcherItem data-testid="test-id" aria-label="dummy-aria-label">
          Dummy child
        </SwitcherItem>
      );

      expect(screen.getByRole('listitem').firstChild).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect aria-label prop', () => {
      render(
        <SwitcherItem aria-label="aria-label-test">Dummy child</SwitcherItem>
      );

      expect(screen.getByRole('listitem').firstChild).toHaveAttribute(
        'aria-label',
        'aria-label-test'
      );
    });

    it('should respect aria-labelledby prop', () => {
      render(
        <SwitcherItem aria-labelledby="aria-labelledby-test">
          Dummy child
        </SwitcherItem>
      );

      expect(screen.getByRole('listitem').firstChild).toHaveAttribute(
        'aria-labelledby',
        'aria-labelledby-test'
      );
    });

    it('should render children as expected', () => {
      render(
        <SwitcherItem aria-label="dummy-aria-label">Text child</SwitcherItem>
      );

      expect(screen.getByText('Text child')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <SwitcherItem className="custom-class" aria-label="dummy-aria-label">
          Text child
        </SwitcherItem>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect tabIndex prop', () => {
      render(
        <SwitcherItem tabIndex={-1} aria-label="dummy-aria-label">
          Dummy child
        </SwitcherItem>
      );

      expect(screen.getByRole('listitem').firstChild).toHaveAttribute(
        'tabIndex',
        '-1'
      );
    });

    it('should handle onClick event', () => {
      const dummyHandler = jest.fn();

      render(
        <SwitcherItem aria-label="dummy-aria-label" onClick={dummyHandler}>
          Dummy child
        </SwitcherItem>
      );

      fireEvent.click(screen.getByRole('listitem').firstChild);

      expect(dummyHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle onKeyDown event', () => {
      const dummyHandler = jest.fn();

      render(
        <SwitcherItem aria-label="dummy-aria-label" onKeyDown={dummyHandler}>
          Dummy child
        </SwitcherItem>
      );

      fireEvent.keyDown(screen.getByRole('listitem').firstChild, {
        key: 'Enter',
        code: 'Enter',
      });

      expect(dummyHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle keyboard navigation with ArrowUp and ArrowDown keys', () => {
      const mockHandleSwitcherItemFocus = jest.fn();

      render(
        <SwitcherItem
          aria-label="dummy-aria-label"
          index={0}
          handleSwitcherItemFocus={mockHandleSwitcherItemFocus}>
          Dummy child
        </SwitcherItem>
      );
      fireEvent.keyDown(screen.getByRole('listitem').firstChild, {
        key: 'ArrowDown',
        code: 'ArrowDown',
      });
      expect(mockHandleSwitcherItemFocus).toHaveBeenCalledWith({
        currentIndex: -1,
        direction: 1,
      });

      fireEvent.keyDown(screen.getByRole('listitem').firstChild, {
        key: 'ArrowUp',
        code: 'ArrowUp',
      });
      expect(mockHandleSwitcherItemFocus).toHaveBeenCalledWith({
        currentIndex: -1,
        direction: -1,
      });
    });

    it('should apply selected class when isSelected prop is true', () => {
      const { container } = render(
        <SwitcherItem isSelected aria-label="dummy-aria-label">
          Dummy child
        </SwitcherItem>
      );
      const link = container.querySelector('a');
      expect(link).toHaveClass('cds--switcher__item-link--selected');
    });

    it('should have tabIndex 0 when expanded is true', () => {
      const { container } = render(
        <SwitcherItem expanded={true} aria-label="dummy-aria-label">
          Dummy child
        </SwitcherItem>
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('tabIndex', '0');
    });

    it('should have tabIndex -1 when expanded is false', () => {
      const { container } = render(
        <SwitcherItem expanded={false} aria-label="dummy-aria-label">
          Dummy child
        </SwitcherItem>
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('tabIndex', '-1');
    });

    it('should not call handleSwitcherItemFocus when not provided', () => {
      const { container } = render(
        <SwitcherItem aria-label="dummy-aria-label">Dummy child</SwitcherItem>
      );
      const link = container.querySelector('a');
      fireEvent.keyDown(link, { key: 'ArrowDown' });
      expect(container).toBeTruthy();
    });

    it('should not throw an error when onClick is not provided', () => {
      expect(() => {
        render(
          <SwitcherItem aria-label="dummy-aria-label">Dummy child</SwitcherItem>
        );
      }).not.toThrow();
    });
  });
});
