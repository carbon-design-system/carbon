/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BreadcrumbSkeleton } from '../';
import { mount } from 'enzyme';

describe('BreadcrumbSkeleton', () => {
  it('should render', () => {
    const wrapper = mount(<BreadcrumbSkeleton />);
    expect(wrapper).toMatchSnapshot();
  });
});
