/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SideNavSwitcher from '../SideNavSwitcher';

describe('SideNavSwitcher', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      labelText: 'label',
      ref: jest.fn(),
      onChange: jest.fn(),
      options: ['Option 1', 'Option 2', 'Option 3'],
    };
  });

  it('should render', () => {
    const wrapper = mount(<SideNavSwitcher {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `onChange` when an option is selected', () => {
    const wrapper = mount(<SideNavSwitcher {...mockProps} />);
    wrapper.find('select').simulate('change', {
      target: {
        value: 'Option 2',
      },
    });
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });
});
