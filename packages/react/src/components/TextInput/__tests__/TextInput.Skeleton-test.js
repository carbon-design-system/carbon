/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextInputSkeleton from '../TextInput.Skeleton';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('TextInputSkeleton', () => {
  it('should render the skeleton input with the default classes', () => {
    const { container } = render(<TextInputSkeleton />);
    const formItem = container.firstChild;

    expect(formItem).toHaveClass(`${prefix}--form-item`);
    expect(
      formItem.querySelector(`.${prefix}--skeleton.${prefix}--text-input`)
    ).toBeInTheDocument();
  });

  it('should render the label skeleton by default', () => {
    const { container } = render(<TextInputSkeleton />);
    const labelSkeleton = container.querySelector(
      `.${prefix}--label.${prefix}--skeleton`
    );

    expect(labelSkeleton).toBeInTheDocument();
  });

  it('should not render the label skeleton if hideLabel is true', () => {
    const { container } = render(<TextInputSkeleton hideLabel />);
    const labelSkeleton = container.querySelector(
      `.${prefix}--label.${prefix}--skeleton`
    );

    expect(labelSkeleton).not.toBeInTheDocument();
  });

  it('should apply custom class names to the form item wrapper', () => {
    const { container } = render(
      <TextInputSkeleton className="custom-class" />
    );
    const formItem = container.firstChild;

    expect(formItem).toHaveClass('custom-class');
    expect(formItem).toHaveClass(`${prefix}--form-item`);
  });

  it('should spread additional props onto the root element', () => {
    const { container } = render(
      <TextInputSkeleton data-testid="skeleton-input" />
    );
    const formItem = container.firstChild;

    expect(formItem).toHaveAttribute('data-testid', 'skeleton-input');
  });
});
