/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BreadcrumbSkeleton } from 'carbon-components-react';
import { mount } from 'enzyme';
import React from 'react';

describe('BreadcrumbSkeleton', () => {
  it('should render', () => {
    const wrapper = mount(<BreadcrumbSkeleton />);
    expect(wrapper).toMatchSnapshot();
  });
});
