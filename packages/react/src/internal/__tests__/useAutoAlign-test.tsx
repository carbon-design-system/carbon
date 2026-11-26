/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import React, { type PropsWithChildren } from 'react';
import {
  FeatureFlags,
  type FeatureFlagsProps,
} from '../../components/FeatureFlags';
import { useAutoAlign } from '../useAutoAlign';

const withFlags = (flags: FeatureFlagsProps) =>
  function Wrapper({ children }: PropsWithChildren) {
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
