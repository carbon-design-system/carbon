/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableRow } from '..';
import TableCellResizable from '../TableCellResizable';

describe('DataTable.TableCellResizable', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellResizable className="custom-class" />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
