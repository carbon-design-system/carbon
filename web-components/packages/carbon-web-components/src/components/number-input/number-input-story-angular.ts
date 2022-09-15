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
import baseStory, {
  Default as baseDefault,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './number-input-story';

export const Default = args => ({
  template: `
    <bx-number-input
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [value]="value"
      [type]="type"
      [placeholder]="placeholder"
      [size]="size"
      [invalid]="invalid"
      [mobile]="mobile"
      [min]="min"
      [max]="max"
      [step]="step"
      [light]="light"
      (input)="onInput()"
    ></bx-number-input>
  `,
  props: args?.['bx-number-input'],
});

Object.assign(Default, baseDefault);

export const formItem = args => ({
  template: `
    <bx-form-item>
      <bx-number-input
        [value]="value"
        [colorScheme]="colorScheme"
        [placeholder]="placeholder"
        [size]="size"
        (input)="onInput()"
        [invalid]="invalid"
        [disabled]="disabled"
        [mobile]="mobile"
        [min]="min"
        [max]="max"
        [step]="step"
        [light]="light">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        <span slot="validity-message-max">Try a lower value, something less than {{max}}</span>
        <span slot="validity-message-min">Value must be larger than {{min}}</span>
      </bx-number-input>
    </bx-form-item>
  `,
  props: args?.['bx-number-input'],
});

Object.assign(formItem, baseFormItem);

export const withoutFormItemWrapper = args => ({
  template: `
    <bx-number-input
      [value]="value"
      [colorScheme]="colorScheme"
      [placeholder]="placeholder"
      [size]="size"
      (input)="onInput()"
      [invalid]="invalid"
      [disabled]="disabled"
      [mobile]="mobile"
      [min]="min"
      [max]="max"
      [step]="step"
      [light]="light">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-number-input>
  `,
  props: args?.['bx-number-input'],
});

Object.assign(withoutFormItemWrapper, baseWithoutFormItemWrapper);

export const skeleton = () => ({
  template: `<bx-number-input-skeleton></bx-number-input-skeleton>`,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
