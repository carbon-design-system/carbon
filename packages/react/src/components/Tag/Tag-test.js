/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add } from '@carbon/icons-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Tag from './';

describe('Tag', () => {
  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<Tag type="red">test-tag</Tag>);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <main>
          <Tag type="red">Dog</Tag>
        </main>
      );
      await expect(container).toHaveNoACViolations('Tag');
    });
  });

  it('should have an appropriate aria-label when (filterable)', () => {
    const children = 'tag content';
    const { container } = render(
      <Tag type="red" filter>
        {children}
      </Tag>
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const button = container.querySelector('[aria-label], [aria-labelledby]');
    const accessibilityLabel =
      button.getAttribute('aria-label') ||
      button.getAttribute('aria-labelledby');
    // This check would mirror our "Accessibility label must contain at least all of visible label"
    // requirement
    expect(accessibilityLabel).toEqual(expect.stringContaining(children));
  });

  it('should allow for a custom label', () => {
    render(<Tag type="red">Johnny Ramone</Tag>);
    expect(screen.getByText('Johnny Ramone')).toBeInTheDocument();
  });

  it('should allow for a custom icon', () => {
    render(
      <Tag type="red" renderIcon={() => <Add data-testid="test" />}>
        Dee Dee Ramone
      </Tag>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
