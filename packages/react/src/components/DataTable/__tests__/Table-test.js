/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Table } from '../';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('DataTable.Table', () => {
  it('should render', () => {
    const wrapper = mount(<Table className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support disable zebra stripe', () => {
    const wrapper = shallow(<Table zebra={false} />);
    const table = wrapper.find(`.${prefix}--data-table`);
    expect(table.hasClass(`${prefix}--data-table--zebra`)).toBe(false);
  });

  it('should support enable sticky header', () => {
    const wrapper = shallow(<Table stickyHeader={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
