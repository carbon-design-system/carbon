/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook } from '@testing-library/react';
import React from 'react';
import { FeatureFlags } from '../../components/FeatureFlags';
import { useAutoAlign } from '../useAutoAlign';

const withFlags = (flags) =>
  function Wrapper({ children }) {
    return <FeatureFlags {...flags}>{children}</FeatureFlags>;
  };

describe('useAutoAlign', () => {
  it('should default to `true`', () => {
    const { result } = renderHook(() => useAutoAlign());

    expect(result.current).toBe(true);
  });

  it('should respect an explicit `false` when the flag is enabled', () => {
    const { result } = renderHook(() => useAutoAlign(false), {
      wrapper: withFlags({ enableV12Autoalign: true }),
    });

    expect(result.current).toBe(false);
  });

  it('should respect an explicit `true` when the flag is disabled', () => {
    const { result } = renderHook(() => useAutoAlign(true));

    expect(result.current).toBe(true);
  });
});
