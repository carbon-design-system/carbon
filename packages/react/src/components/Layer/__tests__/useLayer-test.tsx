/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { Layer, useLayer } from '../../Layer';

describe('useLayer', () => {
  test('default value', () => {
    const values: ReturnType<typeof useLayer>[] = [];

    function TestComponent() {
      const value = useLayer();
      values.push(value);
      return null;
    }

    render(<TestComponent />);

    expect(values).toEqual([
      {
        level: 1,
      },
    ]);
  });

  test('nesting', () => {
    const values: ReturnType<typeof useLayer>[] = [];

    function TestComponent() {
      const value = useLayer();
      values.push(value);
      return null;
    }

    render(
      <>
        <TestComponent />
        <Layer>
          <TestComponent />
          <Layer>
            <TestComponent />
          </Layer>
        </Layer>
      </>
    );

    expect(values).toEqual([
      {
        level: 1,
      },
      {
        level: 2,
      },
      {
        level: 2,
      },
    ]);
  });
});
