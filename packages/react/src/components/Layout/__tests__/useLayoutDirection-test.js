/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { LayoutDirection, useLayoutDirection } from '../';

describe('useLayoutDirection', () => {
  it('should provide a default value', () => {
    const calls = [];

    function TestComponent() {
      const value = useLayoutDirection();
      calls.push(value);
      return null;
    }

    render(<TestComponent />);

    expect(calls[0]).toEqual({
      direction: 'ltr',
    });
  });

  it('should provide the current direction from context', () => {
    const calls = [];

    function TestComponent() {
      const value = useLayoutDirection();
      calls.push(value);
      return null;
    }

    render(
      <LayoutDirection dir="rtl">
        <TestComponent />
        <LayoutDirection dir="ltr">
          <TestComponent />
        </LayoutDirection>
      </LayoutDirection>
    );

    expect(calls).toEqual([
      {
        direction: 'rtl',
      },
      {
        direction: 'ltr',
      },
    ]);
  });
});
