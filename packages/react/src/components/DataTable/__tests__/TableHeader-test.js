/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableHead, TableRow, TableHeader } from '../';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('TableHeader', () => {
  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id">Header</TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );
      expect(container).toMatchSnapshot();
    });

    it('should spread extra props onto outermost element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" test="test" />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('test', 'test');
    });

    it('should render children as expected', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id">
                add appropriate children
              </TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByText('add appropriate children')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" className="custom-class" />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveClass('custom-class');
    });

    it('should respect colSpan prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" colSpan={4} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('colSpan', '4');
    });

    it('should respect id prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" id={'id'} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('id', 'id');
    });

    it('should respect isSortHeader prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader
                data-testid="test-id"
                isSortHeader
                isSortable
                sortDirection={'DESC'}
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveClass(
        'cds--table-sort--descending'
      );
    });

    it('should respect isSortable prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" isSortable />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveClass('cds--table-sort');
    });

    it('should respect scope prop', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" scope={'row'} />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByTestId('test-id')).toHaveAttribute('scope', 'row');
    });

    it('should respect translateWithId prop', () => {
      const translateWithId = () => {
        return 'id translation';
      };

      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader
                data-testid="test-id"
                translateWithId={translateWithId}
                isSortable
              />
            </TableRow>
          </TableHead>
        </Table>
      );

      expect(screen.getByText('id translation')).toBeInTheDocument();
    });
  });

  describe('behaves as expected', () => {
    it('should call onClick when expected', () => {
      const onClick = jest.fn();
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="test-id" onClick={onClick} isSortable />
            </TableRow>
          </TableHead>
        </Table>
      );

      userEvent.click(screen.getByRole('button'), 'test');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
