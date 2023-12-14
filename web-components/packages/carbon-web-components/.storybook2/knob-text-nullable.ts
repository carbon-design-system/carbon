/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text } from '@storybook/addon-knobs';

/**
 * A Storybook text knob, where a empty text is treated as `undefined`.
 */
const textNullable = (
  name: string,
  value: string,
  groupId?: string | undefined
) => {
  const content = text(name, value, groupId);
  return content === '' ? null : content;
};

export default textNullable;
