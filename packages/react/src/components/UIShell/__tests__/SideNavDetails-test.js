/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import SideNavDetails from '../SideNavDetails';

describe('SideNavDetails', () => {
  it('should support rendering a title through `title`', () => {
    const { container } = render(<SideNavDetails title="test" />);
    expect(container.firstChild).toHaveTextContent('test');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavDetails className="test" title="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
