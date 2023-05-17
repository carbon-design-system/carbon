/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TableToolbar from '../TableToolbar';
import { render, screen } from '@testing-library/react';

describe('TableToolbar', () => {
  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(<TableToolbar />);

      expect(container).toMatchSnapshot();
    });

    it('should spread extra props onto outermost element', () => {
      const { container } = render(<TableToolbar data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should respect aria-label prop', () => {
      render(<TableToolbar aria-label="Aria label" />);

      expect(screen.getByLabelText('Aria label')).toBeInTheDocument();
    });

    it('should render children as expected', () => {
      render(
        <TableToolbar>
          <div>child</div>
        </TableToolbar>
      );

      expect(screen.getByText('child')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      const { container } = render(<TableToolbar size="sm" />);

      expect(container.firstChild).toHaveClass('cds--table-toolbar--sm');
    });
  });
});
