/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidSelect from '../FluidSelect';
import { render } from '@testing-library/react';

const prefix = 'cds';

describe('FluidSelect', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', () => {
      const { container } = render(
        <FluidSelect id="input-1" labelText="FluidTextInput label" />
      );

      expect(container.firstChild).toHaveClass(`${prefix}--select--fluid`);
    });
  });
});
