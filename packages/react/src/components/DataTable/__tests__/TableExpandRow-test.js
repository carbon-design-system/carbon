/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableBody, TableExpandRow, TableExpandedRow } from '../';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('DataTable.TableExpandRow', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      isExpanded: false,
      onExpand: jest.fn(),
      ariaLabel: 'Aria label',
    };
  });

  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(container).toMatchSnapshot();
    });

    it('should respect ariaLabel prop', () => {
      render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        mockProps.ariaLabel
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(screen.getAllByRole('row')[0]).toHaveClass('custom-class');
    });

    it('should respect expandHeader prop', () => {
      render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(screen.getAllByRole('cell')[0]).toHaveAttribute(
        'headers',
        'expand'
      );
    });

    it('should respect isExpanded prop', () => {
      render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(screen.getAllByRole('row')[0]).not.toHaveClass(
        `${prefix}--expandable-row`
      );
    });
  });

  describe('behaves as expected', () => {
    it('should expand when button is clicked and onExpand to be called', () => {
      render(
        <Table>
          <TableBody>
            <TableExpandRow {...mockProps} />
            <TableExpandedRow colSpan={1} />
          </TableBody>
        </Table>
      );

      expect(mockProps.onExpand).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getByRole('button'));
      expect(mockProps.onExpand).toHaveBeenCalledTimes(1);
    });
  });
});
