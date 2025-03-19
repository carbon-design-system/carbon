/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ToggletipContent } from '..';

describe('ToggletipContent', () => {
  describe('Component API', () => {
    it('should support a custom class name with the `className` prop', () => {
      const { container } = render(
        <ToggletipContent className="random-content">Content</ToggletipContent>
      );

      // Since `ToggletipContent` passes the className to the `PopoverContent`,
      // we check that an element with the custom class is rendered.
      const contentElement = container.querySelector('.random-content');

      expect(contentElement).toBeInTheDocument();
    });
  });
});
