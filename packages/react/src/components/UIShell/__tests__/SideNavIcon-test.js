/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import SideNavIcon from '../SideNavIcon';

describe('SideNavIcon', () => {
  it('should set the small class when `small` is passed', () => {
    const { container } = render(
      <SideNavIcon small>
        <svg />
      </SideNavIcon>
    );
    expect(container.firstChild).toHaveClass('cds--side-nav__icon--small');
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <SideNavIcon className="test">
        <svg />
      </SideNavIcon>
    );
    expect(container.firstChild).toHaveClass('test');
  });
});
