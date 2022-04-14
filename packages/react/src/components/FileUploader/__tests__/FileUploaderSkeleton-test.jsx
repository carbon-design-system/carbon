/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { FileUploaderSkeleton } from '../';

describe('FileUploaderSkeleton', () => {
  afterEach(cleanup);

  describe('automated accessibility testing', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<FileUploaderSkeleton />);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(<FileUploaderSkeleton />);
      await expect(container).toHaveNoACViolations('FileUploaderSkeleton');
    });
  });

  it('should accept a custom className prop on the root node', () => {
    const className = 'test';
    const { container } = render(
      <FileUploaderSkeleton className={className} />
    );
    expect(container.firstChild.classList.contains(className)).toBe(true);
  });
});
