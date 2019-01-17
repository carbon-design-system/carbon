/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSearch } from '../';

describe('DataTable.TableToolbarSearch', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarSearch
        className="custom-class"
        onChange={jest.fn()}
        id="custom-id"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
