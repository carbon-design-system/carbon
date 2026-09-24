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
      const { container } = render(
        <TableToolbarMenu iconDescription="Add" className="custom-class">
          <span>test</span>
        </TableToolbarMenu>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect iconDescription prop', () => {
      render(
        <TableToolbarMenu iconDescription="Icon description">
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(
        screen.getByRole('button', { name: 'Icon description' })
      ).not.toHaveAttribute('title');
    });

    it('should not render a native title attribute', () => {
      render(
        <TableToolbarMenu>
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(
        screen.getByRole('button', { name: 'Settings' })
      ).not.toHaveAttribute('title');
    });

    it('should respect renderIcon prop', () => {
      const CustomIcon = (props) => (
        <svg data-testid="custom-icon" {...props} />
      );

      render(
        <TableToolbarMenu renderIcon={CustomIcon} iconDescription="Download">
          <span>test</span>
        </TableToolbarMenu>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });
});
