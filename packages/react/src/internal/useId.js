/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This file was heavily inspired by:
//
// 1. Reach UI and their work on their auto-id package:
//    https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/auto-id/src/index.ts
//
// 2. Floating UI and their work on react >=18 compatibility
//    https://github.com/floating-ui/floating-ui/blob/%40floating-ui/utils%400.2.5/packages/react/src/hooks/useId.ts
//
// The problem that this solves is an id mismatch when auto-generating
// ids on both the server and the client. When using server-side rendering,
// there can be the chance of a mismatch between what the server renders and
// what the client renders when the id value is auto-generated.
//
// To get around this, we set the initial value of the `id` to `null` and then
// conditionally use `useLayoutEffect` on the client and `useEffect` on the
// server. On the client, `useLayoutEffect` will patch up the id to the correct
// value. On the server, `useEffect` will not run.
//
// This ensures that we won't encounter a mismatch in ids between server and
// client, at the cost of runtime patching of the id value in
// `useLayoutEffect`
//
// React 18 introduced a new hook called `useId` that takes care of hydration
// mismatches. If the user is running React 18 or higher, the native hook is
// used via the `useReactId` function. If the user is running React 17 or
// lower, `useCompatibleId` is used.

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { setupGetInstanceId } from '../tools/setupGetInstanceId';
import { canUseDOM } from './environment';
import { useIdPrefix } from './useIdPrefix';

// This tricks bundlers so they can't statically analyze this and produce
// compilation warnings/errors.
// https://github.com/webpack/webpack/issues/14814
// https://github.com/mui/material-ui/issues/41190
const _React = { ...React };

const instanceId = setupGetInstanceId();
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

let serverHandoffCompleted = false;

const defaultId = 'id';

/**
 * Generate a unique ID for React <=17 with an optional prefix prepended to it.
 * This is an internal utility, not intended for public usage.
 * @param {string} [prefix]
 * @returns {string}
 */
export function useCompatibleId(prefix = defaultId) {
  const contextPrefix = useIdPrefix();

  const [id, setId] = useState(() => {
    if (serverHandoffCompleted) {
      return `${
        contextPrefix ? `${contextPrefix}-` : ``
      }${prefix}-${instanceId()}`;
    }
    return null;
  });

  useIsomorphicLayoutEffect(() => {
    if (id === null) {
      setId(
        `${contextPrefix ? `${contextPrefix}-` : ``}${prefix}-${instanceId()}`
      );
    }
  }, [instanceId]);

  useEffect(() => {
    if (serverHandoffCompleted === false) {
      serverHandoffCompleted = true;
    }
  }, []);

  return id;
}

/**
 * Generate a unique ID for React >=18 with an optional prefix prepended to it.
 * This is an internal utility, not intended for public usage.
 * @param {string} [prefix]
 * @returns {string}
 */
function useReactId(prefix = defaultId) {
  const contextPrefix = useIdPrefix();
  return `${
    contextPrefix ? `${contextPrefix}-` : ``
  }${prefix}-${_React.useId()}`;
}

/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 */
export const useId = _React.useId ? useReactId : useCompatibleId;

/**
 * Generate a unique id if a given `id` is not provided
 * This is an internal utility, not intended for public usage.
 * @param {string|undefined} id
 * @returns {string}
 */
export function useFallbackId(id) {
  const fallback = useId();
  return id ?? fallback;
}
