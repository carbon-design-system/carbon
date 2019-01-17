/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { iconAddSolid } from 'carbon-icons';
import { TableToolbarAction } from '../';

describe('DataTable.TableToolbarAction', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarAction
        className="custom-class"
        icon={iconAddSolid}
        iconDescription="Add"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
