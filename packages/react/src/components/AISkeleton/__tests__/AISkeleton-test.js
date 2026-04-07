/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AISkeletonIcon from '../AISkeletonIcon';
import AISkeletonPlaceholder from '../AISkeletonPlaceholder';
import AISkeletonText from '../AISkeletonText';

describe('AISkeleton', () => {
  it('should render `AISkeletonPlaceholder` with AI and custom classes', () => {
    render(
      <AISkeletonPlaceholder
        className="💾"
        data-testid="ai-skeleton-placeholder"
      />
    );

    expect(screen.getByTestId('ai-skeleton-placeholder')).toHaveClass(
      'cds--skeleton__placeholder',
      'className',
      'cds--skeleton__placeholder--ai',
      '💾',
      { exact: true }
    );
  });

  it('should render `AISkeletonIcon` with AI and custom classes', () => {
    render(<AISkeletonIcon className="🖨️" data-testid="ai-skeleton-icon" />);

    expect(screen.getByTestId('ai-skeleton-icon')).toHaveClass(
      '🖨️',
      'cds--skeleton__icon--ai',
      'cds--icon--skeleton',
      { exact: true }
    );
  });

  it('should render `AISkeletonText` with AI, heading, and custom classes', () => {
    render(
      <AISkeletonText className="💿" data-testid="ai-skeleton-text" heading />
    );

    expect(screen.getByTestId('ai-skeleton-text')).toHaveClass(
      'cds--skeleton__text',
      'cds--skeleton__heading',
      '💿',
      'cds--skeleton__text--ai',
      { exact: true }
    );
  });
});
