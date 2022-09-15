/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { Default as baseDefault } from './skeleton-text-story';

export const Default = () => ({
  template: `
    <bx-skeleton-text></bx-skeleton-text>
  `,
});

Object.assign(Default, baseDefault);

export const lines = () => ({
  template: `
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
  `,
});

lines.decorators = [
  story => {
    const { template, ...rest } = story();
    return {
      ...rest,
      template: `<div style="width:300px">${template}</div>`,
    };
  },
];

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
