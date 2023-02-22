/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TableToolbarContent from '../TableToolbarContent';
import { render } from '@testing-library/react';

describe('TableToolbarContent', () => {
  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(<TableToolbarContent />);

      expect(container).toMatchSnapshot();
    });

    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <TableToolbarContent data-testid="test-id" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TableToolbarContent className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
