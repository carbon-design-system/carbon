/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Default as baseDefault } from './skeleton-text-story';

export { default } from './skeleton-text-story';

export const Default = () => ({
  template: `
    <bx-skeleton-text></bx-skeleton-text>
  `,
});

export const lines = () => ({
  template: `
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
  `,
});

lines.decorators = [
  () => ({
    template: `<div style="width: 300px"><story /></div>`,
  }),
];

Object.assign(Default, baseDefault);
