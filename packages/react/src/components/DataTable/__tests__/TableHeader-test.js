/**
 * Copyright IBM Corp. 2016, 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Table, TableHead, TableHeader, TableRow } from '../';
import { render } from '@testing-library/react';

describe('TableHeader', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      isSortHeader: false,
      onClick: jest.fn(),
      sortDirection: 'NONE',
    };
  });

  it('should render', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader {...mockProps}>Header</TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with sortHeader', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader {...mockProps} isSortHeader>
              Header
            </TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(container).toMatchSnapshot();
  });

  it('should have an active class if it is the sort header and the sort state is not NONE', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader {...mockProps} isSortHeader>
              Header
            </TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(container).toMatchSnapshot();
  });

  it('should have an active and ascending class if sorting by ASC', () => {
    const { container } = render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader {...mockProps} isSortHeader sortDirection="ASC">
              Header
            </TableHeader>
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(container).toMatchSnapshot();
  });
});
