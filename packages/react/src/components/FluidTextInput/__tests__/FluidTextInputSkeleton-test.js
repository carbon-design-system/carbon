/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FluidTextInputSkeleton from '../FluidTextInput.Skeleton';

describe('FluidTextInputSkeleton', () => {
  it('should render with fluid classes', async () => {
    const { container } = render(<FluidTextInputSkeleton />);
    expect(container.firstChild).toHaveClass(
      `cds--text-input--fluid__skeleton`
    );
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FluidTextInputSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });
});
