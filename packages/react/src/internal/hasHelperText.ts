/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';

export const hasHelperText = (helperText: ReactNode) =>
  typeof helperText !== 'undefined' && helperText !== null && helperText !== '';
