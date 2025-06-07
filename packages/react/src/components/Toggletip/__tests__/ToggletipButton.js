/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggletipButton } from '..';

describe('ToggletipButton', () => {
  describe('Component API', () => {
    it('should support a custom class name with the `className` prop', () => {
      render(
        <ToggletipButton className="random-button">Button</ToggletipButton>
      );

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toHaveClass('random-button');
    });

    it('should use the `label` prop as the label for the `ToggletipButton`', () => {
      render(
        <ToggletipButton label="Custom aria label">Button</ToggletipButton>
      );

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toHaveAttribute('aria-label', 'Custom aria label');
    });
  });
});
