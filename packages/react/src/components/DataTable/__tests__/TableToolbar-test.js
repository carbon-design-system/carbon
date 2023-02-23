/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbar } from '../';

describe('DataTable.TableToolbar', () => {
  it('should render', () => {
    const wrapper = mount(<TableToolbar className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
