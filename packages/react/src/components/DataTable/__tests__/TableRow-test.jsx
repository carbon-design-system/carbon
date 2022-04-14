/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableRow } from '../';

describe('DataTable.TableRow', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow className="custom-class" />
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
