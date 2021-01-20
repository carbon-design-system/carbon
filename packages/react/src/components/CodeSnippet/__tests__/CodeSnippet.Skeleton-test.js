/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import { settings } from 'carbon-components';
import React from 'react';
import { CodeSnippetSkeleton } from '../';

const { prefix } = settings;
const snippetTypes = ['single', 'multi'];

describe('CodeSnippetSkeleton', () => {
  afterEach(cleanup);

  describe('automated accessibility testing', () => {
    it.each(snippetTypes)(
      'should have no Axe violations with type="%s"',
      async (type) => {
        const { container } = render(<CodeSnippetSkeleton type={type} />);
        await expect(container).toHaveNoAxeViolations();
      }
    );

    it.each(snippetTypes)(
      'should have no AC violations with type="%s"',
      async (type) => {
        const { container } = render(<CodeSnippetSkeleton type={type} />);
        await expect(container).toHaveNoACViolations(
          `CodeSnippetSkeleton-${type}`
        );
      }
    );
  });

  it('should default to type="single"', () => {
    const { container } = render(<CodeSnippetSkeleton />);
    expect(
      container.querySelector(`.${prefix}--snippet--single`)
    ).toBeInstanceOf(HTMLElement);
  });

  it('should support a custom `className` on the outer-most element', () => {
    const className = 'test';
    const { container } = render(<CodeSnippetSkeleton className={className} />);
    expect(container.firstChild.classList.contains(className)).toBe(true);
  });
});
