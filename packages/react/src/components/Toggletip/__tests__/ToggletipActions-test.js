/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggletipActions } from '..';

describe('ToggletipActions', () => {
  describe('Component API', () => {
    it('should support a custom class name with the `className` prop', () => {
      render(
        <ToggletipActions className="random-class">Actions</ToggletipActions>
      );

      const actionsElement = screen.getByText('Actions');

      expect(actionsElement).toHaveClass('random-class');
    });
  });
});
