/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Table, TableBody } from '../';

describe('TableBody', () => {
  it('should support a custom className on the outermost element', () => {
    render(
      <Table data-testid="table">
        <TableBody className="custom-class" />
      </Table>
    );
    expect(screen.getByTestId('table').firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the outermost element', () => {
    render(
      <Table data-testid="table">
        <TableBody data-testid="test" />
      </Table>
    );
    expect(screen.getByTestId('table').firstChild).toHaveAttribute(
      'data-testid',
      'test'
    );
  });
});
