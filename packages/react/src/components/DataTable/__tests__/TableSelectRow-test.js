/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableHead, TableRow, TableSelectRow } from '../';
import userEvent from '@testing-library/user-event';

describe('DataTable.TableSelectRow', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'id',
      name: 'select-all',
      checked: false,
      onChange: jest.fn(),
      onSelect: jest.fn(),
      className: 'custom-class-name',
      'aria-label': 'New Aria label',
    };
  });

  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );
      expect(container).toMatchSnapshot();
    });

    it('should respect checked prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} checked />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('should respect deprecated ariaLabel prop if aria-label is not defined', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow
                {...mockProps}
                aria-label={null}
                ariaLabel="Aria label"
                checked
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByLabelText('Aria label')).toBeInTheDocument();
      spy.mockRestore();
    });

    it('should give priority to new aria-label compared to old ariaLabel', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      spy.mockRestore();
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow
                {...mockProps}
                ariaLabel="Deprecated aria label"
                checked
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByLabelText('New Aria label')).toBeInTheDocument();
      expect(
        screen.queryByLabelText('Deprecated aria label')
      ).not.toBeInTheDocument();

      spy.mockRestore();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('row').firstChild).toHaveClass(
        mockProps.className
      );
    });

    it('should respect disabled prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} disabled />
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
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'id');
    });

    it('should respect name prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'name',
        'select-all'
      );
    });

    it('should respect radio prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} radio />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByRole('radio')).toBeInTheDocument();
    });
  });

  describe('behaves as expected', () => {
    it('should invoke `onSelect` when clicked', async () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );

      await userEvent.click(screen.getByRole('checkbox'));
      expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
    });

    it('should invoke `onChange` when expected', async () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );

      // perform action to call onChange
      await userEvent.type(screen.getByRole('checkbox'), 'test');

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
