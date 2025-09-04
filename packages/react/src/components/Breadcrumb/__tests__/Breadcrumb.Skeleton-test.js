/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BreadcrumbSkeleton } from '../';
import { screen, render } from '@testing-library/react';

const prefix = 'cds';

describe('BreadcrumbSkeleton', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<BreadcrumbSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(<BreadcrumbSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should render the specified number of skeleton items', () => {
    const { container } = render(<BreadcrumbSkeleton items={5} />);
    const items = container.querySelectorAll(`.${prefix}--breadcrumb-item`);
    expect(items).toHaveLength(5);
  });

  it('should respect size prop', () => {
    const { container } = render(<BreadcrumbSkeleton size="sm" />);
    expect(container.firstChild).toHaveClass(`${prefix}--breadcrumb--sm`);
  });

  it('should accept a `noTrailingSlash` and omit the trailing slash', () => {
    const { container } = render(<BreadcrumbSkeleton noTrailingSlash />);

    // The slashes are implemented with pseudo elements that can't be detected in jsdom.
    // So we have to settle here for just validating against the class. Pseudo elements
    // should be tested in the browser/e2e tests.
    // https://testing-library.com/docs/dom-testing-library/api-configuration/#computedstylesupportspseudoelements
    // https://github.com/jsdom/jsdom/issues/1928
    expect(container.firstChild).toHaveClass(
      `${prefix}--breadcrumb--no-trailing-slash`
    );
  });
});
