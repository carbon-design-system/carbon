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

  it('should allow the user to specify the direction', () => {
    const wrapper = mount(<TooltipDefinition {...mockProps} direction="top" />);
    expect(wrapper).toMatchSnapshot();
  });
});
