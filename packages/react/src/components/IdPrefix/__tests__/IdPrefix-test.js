/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { IdPrefix } from '../../IdPrefix';
import { useIdPrefix } from '../../../internal/useIdPrefix';

describe('IdPrefix', () => {
  it('should set the prefix value used by usePrefix', () => {
    const calls = [];

    function TestComponent() {
      const prefix = useIdPrefix();
      calls.push(prefix);
      return null;
    }

    render(
      <IdPrefix prefix="custom">
        <TestComponent />
      </IdPrefix>
    );

    expect(calls).toEqual(['custom']);
  });
});
