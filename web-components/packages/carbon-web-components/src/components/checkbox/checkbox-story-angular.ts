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
import baseStory, { Default as baseDefault } from './checkbox-story';

export const Default = args => ({
  template: `
    <bx-checkbox
      [checked]="checked"
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [indeterminate]="indeterminate"
      [labelText]="labelText"
      [name]="name"
      [value]="value"
      (bx-checkbox-changed)="onChange($event)"
    ></bx-checkbox>
  `,
  props: args?.['bx-checkbox'],
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
