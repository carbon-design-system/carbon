/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
/**
 * Offical useSyncExternalStore shim for React <18
 * @see https://github.com/reactwg/react-18/discussions/86
 */
import { useSyncExternalStore as useSyncExternalStoreShim } from 'use-sync-external-store/shim';
import {
  getDocumentLang,
  subscribeDocumentLangChange,
} from '@carbon/utilities';

/**
 * Use useSyncExternalStore when available with React v18+, use the shim with
 * React v17 and v16.
 */
const useSync = (React as any).useSyncExternalStore ?? useSyncExternalStoreShim;

/**
 * React hook that returns the current document language and updates on changes.
 *
 * @returns {string} The current document language code.
 */
export function useDocumentLang(): string {
  return useSync(subscribeDocumentLangChange, getDocumentLang);
}
