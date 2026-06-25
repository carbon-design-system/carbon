//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import uuidv4 from './uuidv4';

// This tricks bundlers so they can't statically analyze this and produce
// compilation warnings/errors.
// https://github.com/webpack/webpack/issues/14814
// https://github.com/mui/material-ui/issues/41190
const _React = { ...React };

/**
 * Uses React 18's built-in `useId()` when available, or falls back to
 * using uuidv4 otherwise
 */
export const useId = _React.useId ? _React.useId : uuidv4;
