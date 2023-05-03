/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../FormLabel';

describe('FormLabel', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<FormLabel className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <FormLabel aria-label="test" data-testid="test" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a unique id prop on the outermost element', () => {
    const { container } = render(<FormLabel id="test-1" />);
    expect(container.firstChild).toHaveProperty('htmlFor', 'test-1');
  });
});
