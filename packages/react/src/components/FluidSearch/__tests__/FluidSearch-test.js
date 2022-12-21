/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidSearch from '../FluidSearch';
import { render } from '@testing-library/react';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

describe('FluidSearch', () => {
  describe('renders as expected - Component API', () => {
    it('should render as expected', () => {
      const { container } = render(
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <FluidSearch id="input-1" labelText="FluidSearch label" />
        </FeatureFlags>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--search--fluid`);
    });
  });
});
