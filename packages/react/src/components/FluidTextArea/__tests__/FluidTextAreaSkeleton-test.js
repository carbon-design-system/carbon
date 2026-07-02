/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FluidTextAreaSkeleton from '../FluidTextArea.Skeleton';

describe('FluidTextAreaSkeleton', () => {
  it('should render with fluid classes', async () => {
    const { container } = render(<FluidTextAreaSkeleton />);
    expect(container.firstChild).toHaveClass(`cds--text-area--fluid__skeleton`);
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FluidTextAreaSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });
});
