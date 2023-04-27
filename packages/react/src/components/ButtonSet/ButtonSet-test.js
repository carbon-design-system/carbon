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
    render(<ButtonSet data-testid="class" className="test" />);
    expect(screen.getByTestId('class')).toHaveClass('test');
  });

  it('should spread props onto the outermost element', () => {
    render(<ButtonSet data-testid="props" />);
    expect(screen.getByTestId('props')).toHaveAttribute('data-testid', 'props');
  });

  it('should support a `ref` that is placed on the outermost element', () => {
    const ref = jest.fn();
    render(<ButtonSet data-testid="ref" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(screen.getByTestId('ref'));
  });

  describe('stacked', () => {
    it('should set the stacked class when stacked is provided', () => {
      render(<ButtonSet data-testid="test" stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--stacked');
    });
  });
});
