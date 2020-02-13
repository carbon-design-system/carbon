/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { Table } from '..';
import TableHeadResizable from '../TableHeadResizable';

describe('DataTable.TableHeadResizable', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableHeadResizable className="custom-class" />
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with isResizable', () => {
    const wrapper = mount(
      <Table>
        <TableHeadResizable isResizable className="custom-class" />
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
