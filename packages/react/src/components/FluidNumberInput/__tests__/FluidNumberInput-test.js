/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidNumberInput from '../FluidNumberInput';
import { render } from '@testing-library/react';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

describe('FluidNumberInput', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', () => {
      const { container } = render(
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <FluidNumberInput id="input-1" label="FluidTextInput label" />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--number-input--fluid`
      );
    });
  });
});
