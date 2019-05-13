/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableBatchActions } from '../';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('DataTable.TableBatchActions', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      shouldShowBatchActions: false,
      totalSelected: 10,
      onCancel: jest.fn(),
    };
  });

  it('should render', () => {
    const hiddenWrapper = mount(<TableBatchActions {...mockProps} />);
    expect(hiddenWrapper).toMatchSnapshot();
    const visibleWrapper = mount(
      <TableBatchActions {...mockProps} shouldShowBatchActions />
    );
    expect(visibleWrapper).toMatchSnapshot();
  });

  it('should show a different message depending on count of items selected', () => {
    const singleWrapper = mount(
      <TableBatchActions {...mockProps} totalSelected={1} />
    );
    expect(singleWrapper.find(`.${prefix}--batch-summary__para`).text()).toBe(
      '1 item selected'
    );

    const multiWrapper = mount(
      <TableBatchActions {...mockProps} totalSelected={2} />
    );
    expect(multiWrapper.find(`.${prefix}--batch-summary__para`).text()).toBe(
      '2 items selected'
    );
  });

  it('should invoke the `onCancel` hook if the action is canceled', () => {
    const wrapper = mount(
      <TableBatchActions {...mockProps} shouldShowBatchActions />
    );
    wrapper.find('button').simulate('click');
    expect(mockProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
