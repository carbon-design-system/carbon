/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const isColumnVisible = (colDef) =>
  typeof colDef.isVisible === 'boolean' ? colDef.isVisible : true;
