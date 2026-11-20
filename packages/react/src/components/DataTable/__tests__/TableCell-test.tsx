/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom/jest-globals';
import { describe, expect, it, jest } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import React, { type RefCallback } from 'react';
import { Table, TableBody, TableRow, TableCell } from '../';

describe('TableCell', () => {
  it('should support a custom className on the outermost element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="tr">
            <TableCell className="custom-class" />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('tr').firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the outermost element', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="tr">
            <TableCell data-testid="test" />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('tr').firstChild).toHaveAttribute(
      'data-testid',
      'test'
    );
  });

  it('should forward refs to the rendered TableCell element', () => {
    const ref = jest.fn<RefCallback<HTMLTableCellElement>>();

    render(
      <Table>
        <TableBody>
          <TableRow data-testid="tr">
            <TableCell ref={ref} className="custom-class" />
          </TableRow>
        </TableBody>
      </Table>
    );

    const cell = screen.getByRole('cell');

    expect(ref.mock.calls).toContainEqual([cell]);
    expect(cell).toHaveClass('custom-class');
  });
});
