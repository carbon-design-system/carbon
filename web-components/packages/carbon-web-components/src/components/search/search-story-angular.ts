/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Default as baseDefault } from './search-story';

export { default } from './search-story';

export const Default = args => ({
  template: `
    <bx-search
      [closeButtonAssistiveText]="closeButtonAssistiveText"
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [light]="light"
      [labelText]="labelText"
      [name]="name"
      [placeholder]="placeholder"
      [size]="size"
      [type]="type"
      [value]="value"
      (bx-search-input)="onInput($event)"
    ></bx-search>
  `,
  props: args?.['bx-search'],
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-search-skeleton></bx-search-skeleton>`,
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});
