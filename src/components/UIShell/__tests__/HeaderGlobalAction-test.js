import { Fade32 } from '@carbon/icons-react';
import React from 'react';
import { mount } from 'enzyme';
import { HeaderGlobalAction } from '../';

describe('HeaderGlobalAction', () => {
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
      <HeaderGlobalAction {...mockProps}>
        <Fade32 />
      </HeaderGlobalAction>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
