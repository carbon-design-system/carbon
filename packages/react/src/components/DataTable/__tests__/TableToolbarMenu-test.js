/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TableToolbarMenu from '../TableToolbarMenu';
import { Download } from '@carbon/icons-react';
import { render, screen } from '@testing-library/react';

describe('TableToolbarMenu', () => {
  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <TableToolbarMenu
          className="custom-class"
          renderIcon={Download}
          iconDescription="Add">
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(container).toMatchSnapshot();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <TableToolbarMenu className="custom-class">
          <span>test</span>
        </TableToolbarMenu>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should respect iconDescription prop', () => {
      render(
        <TableToolbarMenu iconDescription="Icon description">
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(screen.getByText('Icon description')).toBeInTheDocument();
    });

    it('should respect renderIcon prop', () => {
      render(
        <TableToolbarMenu renderIcon={Download} iconDescription="Download">
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Download');
    });
  });
});
