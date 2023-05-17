/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { TableActionList } from '../';

describe('TableActionList', () => {
  it('should support a custom className on the outermost element', () => {
    const { container } = render(<TableActionList className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(<TableActionList data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
