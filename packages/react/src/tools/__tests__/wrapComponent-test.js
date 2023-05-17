/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import wrapComponent from '../wrapComponent';

describe('wrapComponent', () => {
  it('should render the outermost element as the given type', () => {
    const WrappedComponent = wrapComponent({
      name: 'WrappedComponent',
      type: 'div',
    });
    const { container } = render(<WrappedComponent />);
    expect(container.firstChild.tagName).toBe('DIV');
  });

  it('should set the `displayName` for a component', () => {
    const WrappedComponent = wrapComponent({
      name: 'WrappedComponent',
      type: 'div',
    });
    expect(WrappedComponent.displayName).toBe('WrappedComponent');
  });

  it('should support static class names with `className`', () => {
    const WrappedComponent = wrapComponent({
      name: 'WrappedComponent',
      type: 'div',
      className: 'test',
    });
    const { container } = render(<WrappedComponent />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should support prefix class names with `className`', () => {
    const WrappedComponent = wrapComponent({
      name: 'WrappedComponent',
      type: 'div',
      className: (prefix) => `${prefix}--test`,
    });
    const { container } = render(<WrappedComponent />);
    expect(container.firstChild).toHaveClass('cds--test');
  });

  it('should spread additional props on the outermost node', () => {
    const WrappedComponent = wrapComponent({
      name: 'WrappedComponent',
      type: 'div',
    });
    const { container } = render(<WrappedComponent data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
