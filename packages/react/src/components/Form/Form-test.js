/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Form from '../Form';
import { render } from '@testing-library/react';

describe('Form - RTL', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<Form className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(<Form data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
