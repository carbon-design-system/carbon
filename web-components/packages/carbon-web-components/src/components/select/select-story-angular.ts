/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { Default as baseDefault } from './select-story';

export const Default = args => ({
  template: `
    <bx-select
      [autofocus]="autofocus"
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [helperText]="helperText"
      [invalid]="invalid"
      [labelText]="labelText"
      [name]="name"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      [value]="value"
      (input)="onInput($event)"
    >
      <bx-select-item-group label="Category 1">
        <bx-select-item value="all">Option 1</bx-select-item>
        <bx-select-item value="cloudFoundry">Option 2</bx-select-item>
      </bx-select-item-group>
      <bx-select-item-group label="Category 2">
        <bx-select-item value="staging">Option 3</bx-select-item>
        <bx-select-item value="dea">Option 4</bx-select-item>
        <bx-select-item value="router">Option 5</bx-select-item>
      </bx-select-item-group>
    </bx-select>
  `,
  props: args?.['bx-select'],
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
