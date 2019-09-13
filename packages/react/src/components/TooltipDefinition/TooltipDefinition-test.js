/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import TooltipDefinition from '../TooltipDefinition';

describe('TooltipDefinition', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      direction: 'bottom',
      children: 'tooltip trigger',
      className: 'custom-class',
      tooltipText: 'tooltip text',
    };
  });

  it('should render', () => {
    const wrapper = mount(<TooltipDefinition {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support a custom trigger element class', () => {
    const wrapper = mount(
      <TooltipDefinition
        {...mockProps}
        triggerClassName="custom-trigger-class"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow the user to specify the direction', () => {
    const wrapper = mount(<TooltipDefinition {...mockProps} direction="top" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow the user to specify the alignment', () => {
    const wrapper = mount(<TooltipDefinition {...mockProps} align="start" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support custom elements for the trigger button base', () => {
    const wrapper = mount(<TooltipDefinition {...mockProps} as="span" />);
    expect(wrapper.find('span.bx--tooltip__trigger')).toHaveLength(1);
  });
});
