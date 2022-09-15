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
import baseStory, { Default as baseDefault } from './loading-story';

export const Default = args => ({
  template: `<bx-loading [inactive]="inactive" [type]="type"></bx-loading>`,
  props: args?.['bx-loading'],
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
