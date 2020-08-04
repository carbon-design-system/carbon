/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { useEffect, useLayoutEffect, useState } from 'react';
import setupGetInstanceId from '../tools/setupGetInstanceId';

const getId = setupGetInstanceId();
const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

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
