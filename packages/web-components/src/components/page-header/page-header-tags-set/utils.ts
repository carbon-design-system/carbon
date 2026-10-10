/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TAG_TYPE, TAG_SIZE } from '../../tag/defs';

export interface TagType {
  type: TAG_TYPE;
  text: string;
  size: TAG_SIZE;
  onClose?: () => void; // Made optional to allow exclusion
}
