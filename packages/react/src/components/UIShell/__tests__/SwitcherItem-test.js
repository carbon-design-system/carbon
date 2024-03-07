/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SwitcherItem from '../SwitcherItem';
import { render, screen, fireEvent } from '@testing-library/react';

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
  });
});
