/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableHead, TableRow, TableSelectAll } from '../';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('TableSelectAll', () => {
  describe('renders as expected - Component API', () => {
    it('should render with the correct classes', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('columnheader')).toHaveClass(
        `${prefix}--table-column-checkbox`
      );
      expect(screen.getByRole('columnheader').firstChild).toHaveClass(
        `${prefix}--checkbox--inline`
      );
    });

    it('should respect ariaLabel prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    });

    it('should respect checked prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={true}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
                className="test-class"
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('columnheader')).toHaveClass('test-class');
    });

    it('should respect disabled prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
                disabled
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={false}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
                disabled
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox').id).toEqual('select-all');
    });

    it('should respect indeterminate prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={true}
                id="select-all"
                name="select-all"
                onSelect={() => {}}
                indeterminate
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox').indeterminate).toEqual(true);
    });

    it('should respect name prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={true}
                id="select-all"
                name="select-all-input"
                onSelect={() => {}}
                indeterminate
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox').name).toEqual('select-all-input');
    });
  });

  describe('behaves as expected', () => {
    it('should respect onSelect prop', () => {
      const onSelect = jest.fn();
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll
                ariaLabel="Select all rows"
                checked={true}
                id="select-all"
                name="select-all-input"
                onSelect={onSelect}
                indeterminate
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(onSelect).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getByRole('checkbox'));
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });
});
