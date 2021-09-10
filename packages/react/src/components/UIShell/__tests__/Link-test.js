/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import Link from '../Link';

describe('UI Shell - Link', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      element: 'a',
      children: 'foo',
      href: '#',
    };
  });

  it('should render', () => {
    const wrapper = mount(<Link {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering a string element', () => {
    const wrapper = mount(<Link {...mockProps} element="div" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support rendering a component as the element', () => {
    const mockComponent = (props) => <a {...props}>link</a>;
    const wrapper = mount(<Link {...mockProps} element={mockComponent} />);
    expect(wrapper).toMatchSnapshot();
  });
});
