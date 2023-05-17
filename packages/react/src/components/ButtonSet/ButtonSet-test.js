/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ButtonSet from '../ButtonSet';

describe('ButtonSet', () => {
  it('should support rendering elements through the `children` prop', () => {
    render(
      <ButtonSet data-testid="test">
        <span data-testid="child">child</span>
      </ButtonSet>
    );
    expect(screen.getByTestId('test')).toContainElement(
      screen.getByTestId('child')
    );
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<ButtonSet className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(<ButtonSet data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` that is placed on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<ButtonSet ref={ref} />);
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('stacked', () => {
    it('should set the stacked class when stacked is provided', () => {
      render(<ButtonSet data-testid="test" stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--stacked');
    });
  });
});
