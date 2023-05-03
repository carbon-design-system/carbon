/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ListBox from '../';

describe('ListBox', () => {
  it('should set the inline class when type="inline"', () => {
    const { container } = render(<ListBox type="inline" />);
    expect(container.firstChild).toHaveClass('cds--list-box--inline');
  });

  it('should set the disabled class when `disabled` is true', () => {
    const { container } = render(<ListBox disabled />);
    expect(container.firstChild).toHaveClass('cds--list-box--disabled');
  });

  it('should set the expanded class when `isOpen` is true', () => {
    const { container } = render(<ListBox isOpen />);
    expect(container.firstChild).toHaveClass('cds--list-box--expanded');
  });

  it('should set the warning class when `warn` is true and invalid is false', () => {
    const { container } = render(<ListBox warn />);
    expect(container.firstChild).toHaveClass('cds--list-box--warning');
  });

  it('should render `invalidText` when `invalid` is true', () => {
    render(<ListBox invalid invalidText="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render `warnText` when `warn` is true', () => {
    render(<ListBox warn warnText="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'])('should set the %s class', (size) => {
      const { container } = render(<ListBox size={size} />);
      expect(container.firstChild).toHaveClass(`cds--list-box--${size}`);
    });
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<ListBox className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<ListBox data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<ListBox ref={ref} />);
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });
});
