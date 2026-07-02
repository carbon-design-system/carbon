/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Placement } from '@floating-ui/react';

const popoverAlignMapping = {
  'top-left': 'top-start',
  'top-right': 'top-end',
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
  'left-bottom': 'left-end',
  'left-top': 'left-start',
  'right-bottom': 'right-end',
  'right-top': 'right-start',
} as const;

/**
 * Maps popover alignment values to their corresponding replacement values.
 *
 * @param align - The original align value.
 * @returns The new align value based on mapping or the original align if no
 *          mapping exists.
 */
export const mapPopoverAlign = (align: string): Placement =>
  popoverAlignMapping[align] ?? align;
