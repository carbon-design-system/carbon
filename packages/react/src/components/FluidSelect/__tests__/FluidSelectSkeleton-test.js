/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import FluidSelectSkeleton from '../FluidSelect.Skeleton';

describe('FluidSelectSkeleton', () => {
  it('should render with fluid classes', async () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(<FluidSelectSkeleton />);
    expect(container.firstChild).toHaveClass(`cds--list-box__wrapper--fluid`);
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FluidSelectSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });
});
