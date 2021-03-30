/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render } from '@testing-library/react';
import { FeatureFlags, useFeatureFlags } from '../';

afterEach(cleanup);

test('FeatureFlags', () => {
  const calls = [];

  function TestComponent() {
    const featureFlags = useFeatureFlags();
    calls.push(featureFlags.enabled('a'));
    return null;
  }

  render(
    <FeatureFlags flags={{ a: true }}>
      <TestComponent />
    </FeatureFlags>
  );

  expect(calls).toEqual([true]);

  render(
    <FeatureFlags flags={{ a: false }}>
      <TestComponent />
    </FeatureFlags>
  );

  expect(calls).toEqual([true, false]);
});
