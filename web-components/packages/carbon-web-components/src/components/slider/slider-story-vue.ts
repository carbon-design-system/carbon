/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault, withInputBox as baseWithInputBox } from './slider-story';

export { default } from './slider-story';

export const Default = args => ({
  template: `
    <bx-slider
      :disabled="disabled"
      :label-text="labelText"
      :max="max"
      :min="min"
      :name="name"
      :step="step"
      :value="value"
      @bx-slider-changed="onChange"
    ></bx-slider>
  `,
  ...createVueBindingsFromProps(args?.['bx-slider']),
});

Object.assign(Default, baseDefault);

export const withInputBox = args => ({
  template: `
    <bx-slider
      :disabled="disabled"
      :label-text="labelText"
      :max="max"
      :min="min"
      :name="name"
      :step="step"
      :value="value"
      @bx-slider-changed="onChange"
    >
      <bx-slider-input aria-label="Slider value" type="number"></bx-slider-input>
    </bx-slider>
  `,
  ...createVueBindingsFromProps(args?.['bx-slider']),
});

Object.assign(withInputBox, baseWithInputBox);

export const skeleton = () => ({
  template: `<bx-slider-skeleton></bx-slider-skeleton>`,
});
