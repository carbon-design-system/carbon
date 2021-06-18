/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This file was heavily inspired by Reach UI and their work on their auto-id
// package
// https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/auto-id/src/index.ts
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

import { useEffect, useLayoutEffect, useState } from 'react';
import setupGetInstanceId from '../tools/setupGetInstanceId';
import { canUseDOM } from './environment';

const getId = setupGetInstanceId();
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

let serverHandoffCompleted = false;

/**
 * Generate a unique ID with an optional prefix prepended to it
 * @param {string} [prefix]
 * @returns {string}
 */
export function useId(prefix = 'id') {
  const [id, setId] = useState(() => {
    if (serverHandoffCompleted) {
      return `${prefix}-${getId()}`;
    }
    return null;
  });

  useIsomorphicLayoutEffect(() => {
    if (id === null) {
      setId(`${prefix}-${getId()}`);
    }
  }, [getId]);

  useEffect(() => {
    if (serverHandoffCompleted === false) {
      serverHandoffCompleted = true;
    }
  }, []);

  return id;
}
