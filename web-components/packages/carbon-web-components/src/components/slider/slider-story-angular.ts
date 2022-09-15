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
import baseStory, { Default as baseDefault, withInputBox as baseWithInputBox } from './slider-story';

export const Default = args => ({
  template: `
    <bx-slider
      [disabled]="disabled"
      [labelText]="labelText"
      [max]="max"
      [min]="min"
      [name]="name"
      [step]="step"
      [value]="value"
      (bx-slider-changed)="onChange($event)"
    ></bx-slider>
  `,
  props: args?.['bx-slider'],
});

Object.assign(Default, baseDefault);

export const withInputBox = args => ({
  template: `
    <bx-slider
      [disabled]="disabled"
      [labelText]="labelText"
      [max]="max"
      [min]="min"
      [name]="name"
      [step]="step"
      [value]="value"
      (bx-slider-changed)="onChange($event)"
    >
      <bx-slider-input aria-label="Slider value" type="number"></bx-slider-input>
    </bx-slider>
  `,
  props: args?.['bx-slider'],
});

Object.assign(withInputBox, baseWithInputBox);

export const skeleton = () => ({
  template: `<bx-slider-skeleton></bx-slider-skeleton>`,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
