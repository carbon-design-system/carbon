/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProgressIndicatorSkeleton } from '../ProgressIndicator.Skeleton';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@carbon/icons-react', () => ({
  CircleDash: () => <div>CircleDash</div>,
}));

describe('ProgressIndicatorSkeleton', () => {
  test('renders correctly with default properties', () => {
    const { container } = render(<ProgressIndicatorSkeleton />);

    expect(container.firstChild).toHaveClass('cds--progress cds--skeleton');
    expect(container.firstChild).not.toHaveClass('cds--progress--vertical');

    const steps = container.querySelectorAll('li');
    expect(steps.length).toBe(4);

    steps.forEach((step) => {
      expect(step).toHaveClass(
        'cds--progress-step cds--progress-step--incomplete'
      );
    });

    const circleDashComponents = container.querySelectorAll(
      'div.cds--progress-step-button'
    );
    expect(circleDashComponents.length).toBe(4);
    expect(circleDashComponents[0]).toHaveTextContent('CircleDash');
  });

  test('renders vertically when vertical prop is true', () => {
    const { container } = render(<ProgressIndicatorSkeleton vertical={true} />);
    expect(container.firstChild).toHaveClass('cds--progress--vertical');
  });

  test('applies custom className when provided', () => {
    const { container } = render(
      <ProgressIndicatorSkeleton className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
