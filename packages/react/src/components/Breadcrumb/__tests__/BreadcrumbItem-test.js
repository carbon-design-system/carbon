/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import { BreadcrumbItem } from 'carbon-components-react';
import React from 'react';

describe('BreadcrumbItem', () => {
  describe('Component API', () => {
    it('should accept a `ref` for the outermost node', () => {
      const ref = jest.fn(() => React.createRef());
      const { container } = render(
        <BreadcrumbItem href="/test" ref={ref}>
          Test
        </BreadcrumbItem>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });
  });
});
