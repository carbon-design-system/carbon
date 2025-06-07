/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
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

  it('should forward refs to the rendered Tablerow element', () => {
    let tr = null;
    const ref = jest.fn((node) => {
      tr = node;
    });
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow ref={ref} data-testid="tr" className="custom-class">
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref).toHaveBeenCalled();
    expect(tr).not.toBeNull();
    expect(tr).toEqual(container.querySelector('tr'));
    expect(tr).toHaveClass('custom-class');
  });
});
