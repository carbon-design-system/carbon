/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-classname',
      children: 'Skip to main content',
      href: '#main-content',
      tabIndex: '0',
    };
  });

  it('should render', () => {
    const wrapper = mount(<SkipToContent {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
