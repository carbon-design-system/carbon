/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const KEY = 'luma-auth';

export function isSignedIn() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function signIn() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* prototype: ignore quota */
  }
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* prototype: ignore */
  }
}
