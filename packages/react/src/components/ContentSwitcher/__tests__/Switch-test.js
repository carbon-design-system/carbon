/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mount } from 'enzyme';
import React from 'react';
import { Switch } from '../../ContentSwitcher';

describe('Switch', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      className: 'custom-class',
      index: 0,
      onClick: jest.fn(),
      onKeyDown: jest.fn(),
      ref: jest.fn(),
      selected: false,
      text: 'mock-text',
    };
  });

  it('should render', () => {
    const wrapper = mount(<Switch {...mockProps} />);
    expect(wrapper).toMatchSnapshot();

    const selected = mount(<Switch {...mockProps} selected={true} />);
    expect(selected).toMatchSnapshot();
  });

  it('should support a custom class name', () => {
    const wrapper = mount(<Switch {...mockProps} />);
    expect(wrapper.children().find(`.${mockProps.className}`).length).toBe(1);
  });

  it('should call `onClick` with the native event and given index', () => {
    const wrapper = mount(<Switch {...mockProps} />);
    wrapper.find('button').simulate('click');

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(HTMLElement),
      }),
      mockProps.index
    );
  });

  it('should set `tabIndex` to 0 or -1 depending on if it is selected', () => {
    const wrapper = mount(<Switch {...mockProps} />);
    expect(wrapper.find('button').prop('tabIndex')).toBe('-1');
    wrapper.setProps({ selected: true });
    expect(wrapper.find('button').prop('tabIndex')).toBe('0');
  });

  it('should set `aria-selected` depending on if it is selected', () => {
    const wrapper = mount(<Switch {...mockProps} />);
    expect(wrapper.find('button').prop('aria-selected')).toBe(
      mockProps.selected
    );
    wrapper.setProps({ selected: true });
    expect(wrapper.find('button').prop('aria-selected')).toBe(true);
  });

  it('should set the forwarded ref to the button element', () => {
    mount(<Switch {...mockProps} />);
    // It seems like enzyme does not call the `ref` with the underlying
    // HTMLElement, so we are asserting that it's being called as a rough test
    expect(mockProps.ref).toHaveBeenCalledTimes(1);
  });
});
