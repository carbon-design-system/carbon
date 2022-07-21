/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import RadioButtonSkeleton from '../RadioButton.Skeleton';

describe('RadioButtonSkeleton', () => {
  it('should support `className` on the outermost element', () => {
    const { container } = render(
      <RadioButtonSkeleton className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread props on the outermost element', () => {
    const { container } = render(<RadioButtonSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
