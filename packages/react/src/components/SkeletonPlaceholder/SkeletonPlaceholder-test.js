/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
import { render, screen } from '@testing-library/react';

describe('SkeletonPlaceholder', () => {
  it('should pass in an extra className when one is given', () => {
    render(
      <SkeletonPlaceholder className="custom-class" data-testid="skeleton" />
    );
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});
