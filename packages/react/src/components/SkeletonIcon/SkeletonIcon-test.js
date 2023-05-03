/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '../SkeletonIcon';
import { render, screen } from '@testing-library/react';

describe('SkeletonIcon', () => {
  it('should pass in an extra className when one is given', () => {
    render(<SkeletonIcon className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});
