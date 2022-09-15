/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Default as baseDefault } from './skeleton-placeholder-story';

export { default } from './skeleton-placeholder-story';

export const Default = () => ({
  template: `
    <bx-skeleton-placeholder></bx-skeleton-placeholder>
  `,
});

Object.assign(Default, baseDefault);
