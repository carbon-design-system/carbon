/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonText from '../SkeletonText';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SkeletonText', () => {
  it('should pass in an extra className when one is given', () => {
    render(<SkeletonText className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});

describe('SkeletonText Heading', () => {
  it('should add heading classNames when the heading prop is passed in', () => {
    render(<SkeletonText heading data-testid="skeleton2" />);
    expect(screen.getByTestId('skeleton2')).toHaveClass(
      `${prefix}--skeleton__heading`
    );
  });
});
