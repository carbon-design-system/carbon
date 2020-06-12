/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { HeaderGlobalBar } from '../';

describe('HeaderGlobalBar', () => {
  it('should render', () => {
    const wrapper = mount(<HeaderGlobalBar className="custom-class" />);
    expect(wrapper).toMatchSnapshot();
  });
});
