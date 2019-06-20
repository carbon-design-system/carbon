import { Fade32 } from '@carbon/icons-react';
import React from 'react';
import { mount } from 'enzyme';
import { HeaderMenuButton } from '../';

describe('HeaderMenuButton', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      'aria-label': 'Accessibility label',
      className: 'custom-class',
      onClick: jest.fn(),
      isActive: false,
    };
  });

  it('should render', () => {
    const wrapper = mount(
      <HeaderMenuButton {...mockProps}>
        <Fade32 />
      </HeaderMenuButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
