/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Table, TableBody, TableCell, TableExpandedRow, TableRow } from '../';

const prefix = 'cds';

describe('TableExpandedRow', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Parent row</TableCell>
          </TableRow>
          <TableExpandedRow
            data-testid="expanded-row"
            className="chic"
            colSpan={1}>
            Expanded content
          </TableExpandedRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('expanded-row')).toHaveClass(
      `${prefix}--expandable-row`,
      'chic',
      { exact: true }
    );
  });

  it('should render children in a spanning cell', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Parent row</TableCell>
          </TableRow>
          <TableExpandedRow data-testid="expanded-row" colSpan={3}>
            Expanded content
          </TableExpandedRow>
        </TableBody>
      </Table>
    );

    const expandedRow = screen.getByTestId('expanded-row');
    const expandedCell = expandedRow.querySelector('td');

    expect(expandedCell).toHaveAttribute('colspan', '3');
    expect(
      expandedRow.querySelector(`.${prefix}--child-row-inner-container`)
    ).toHaveTextContent('Expanded content');
  });

  it('should toggle hover class on the previous row during mouse events', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="parent-row">
            <TableCell>Parent row</TableCell>
          </TableRow>
          <TableExpandedRow data-testid="expanded-row" colSpan={1}>
            Expanded content
          </TableExpandedRow>
        </TableBody>
      </Table>
    );

    const parentRow = screen.getByTestId('parent-row');
    const expandedRow = screen.getByTestId('expanded-row');

    fireEvent.mouseEnter(expandedRow);
    expect(parentRow).toHaveClass(`${prefix}--expandable-row--hover`, {
      exact: true,
    });

    fireEvent.mouseLeave(expandedRow);
    expect(parentRow).not.toHaveClass();
  });

  it('should not throw when there is no previous sibling row', () => {
    render(
      <Table>
        <TableBody>
          <TableExpandedRow data-testid="expanded-row" colSpan={1}>
            Expanded content
          </TableExpandedRow>
        </TableBody>
      </Table>
    );

    const expandedRow = screen.getByTestId('expanded-row');

    expect(() => {
      fireEvent.mouseEnter(expandedRow);
      fireEvent.mouseLeave(expandedRow);
    }).not.toThrow();
  });
});
