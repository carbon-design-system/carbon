/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggletipLabel } from '..';

describe('ToggletipLabel', () => {
  describe('Component API', () => {
    it('should support custom elements with the `as` prop', () => {
      render(
        <ToggletipLabel as="div" data-testid="toggletip-label">
          Label Text
        </ToggletipLabel>
      );

      const label = screen.getByTestId('toggletip-label');

      expect(label.tagName).toBe('DIV');
    });

    it('should support a custom class name with the `className` prop', () => {
      const { container } = render(
        <ToggletipLabel className="custom-class">Label Text</ToggletipLabel>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should forward extra props to the underlying element', () => {
      render(
        <ToggletipLabel as="p" data-custom="123">
          Label Text
        </ToggletipLabel>
      );

      const label = screen.getByText('Label Text');

      expect(label).toHaveAttribute('data-custom', '123');
    });
  });
});
