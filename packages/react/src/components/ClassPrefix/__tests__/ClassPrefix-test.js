/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { ClassPrefix } from '../../ClassPrefix';
import { usePrefix } from '../../../internal/usePrefix';

describe('ClassPrefix', () => {
  it('should set the prefix value used by usePrefix', () => {
    const calls = [];

    function TestComponent() {
      const prefix = usePrefix();
      calls.push(prefix);
      return null;
    }

    render(
      <ClassPrefix prefix="custom">
        <TestComponent />
      </ClassPrefix>
    );

    expect(calls).toEqual(['custom']);
  });
});
