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
