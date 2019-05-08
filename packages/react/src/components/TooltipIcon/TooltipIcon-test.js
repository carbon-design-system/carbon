/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import TooltipIcon from '../TooltipIcon';

describe('TooltipIcon', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      direction: 'bottom',
      children: <svg />,
      className: 'custom-class',
      tooltipText: 'tooltip text',
    };
  });

  it('should render', () => {
    const wrapper = mount(<TooltipIcon {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow the user to specify the direction', () => {
    const wrapper = mount(<TooltipIcon {...mockProps} direction="top" />);
    expect(wrapper).toMatchSnapshot();
  });
});
