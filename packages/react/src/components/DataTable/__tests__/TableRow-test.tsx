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
import { Table, TableBody, TableCell, TableRow } from '../';

describe('TableRow', () => {
  it('should support a custom className on the outermost element', () => {
    render(
      <Table>
        <TableBody data-testid="tbody">
          <TableRow className="custom-class" />
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('tbody').firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the outermost element', () => {
    render(
      <Table>
        <TableBody data-testid="tbody">
          <TableRow data-testid="test" />
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('tbody').firstChild).toHaveAttribute(
      'data-testid',
      'test'
    );
  });

  it('should forward refs to the rendered TableRow element', () => {
    const ref = jest.fn<RefCallback<HTMLTableRowElement>>();

    render(
      <Table>
        <TableBody>
          <TableRow ref={ref} data-testid="tr" className="custom-class">
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = screen.getByRole('row');

    expect(ref.mock.calls).toContainEqual([row]);
    expect(row).toHaveClass('custom-class');
  });
});
