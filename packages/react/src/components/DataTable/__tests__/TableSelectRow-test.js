/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Table, TableHead, TableRow, TableSelectRow } from '../';

describe('DataTable.TableSelectRow', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'id',
      name: 'select-all',
      checked: false,
      onSelect: jest.fn(),
      className: 'custom-class-name',
      ariaLabel: 'Aria label',
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

    it('should render with the provided class name', () => {
      const customClassName = 'custom-table-select-row-classname';
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} className={customClassName} />
            </TableRow>
          </TableHead>
        </Table>
      );
      const elements = container.querySelectorAll(`td.${customClassName}`);
      expect(elements.length).toBe(1);
    });
  });

  describe('behaves as expected', () => {
    it('should invoke `onSelect` when clicked', () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectRow {...mockProps} />
            </TableRow>
          </TableHead>
        </Table>
      );
      container.querySelector('input.cds--checkbox').click();
      expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
    });
  });
});
