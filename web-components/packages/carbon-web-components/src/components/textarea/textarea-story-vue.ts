/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  Default as baseDefault,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './textarea-story';

export { default } from './textarea-story';

export const Default = args => ({
  template: `
    <bx-textarea
      :color-scheme="colorScheme"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      :invalid="invalid"
      @input="onInput"
    ></bx-textarea>
  `,
  ...createVueBindingsFromProps(args?.['bx-textarea']),
});

Object.assign(Default, baseDefault);

export const formItem = args => ({
  template: `
    <bx-form-item>
      <bx-textarea
        :value="value"
        :color-scheme="colorScheme"
        :placeholder="placeholder"
        @input="onInput"
        :invalid="invalid"
        :disabled="disabled"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-textarea>
    </bx-form-item>
  `,
  ...createVueBindingsFromProps(args?.['bx-textarea']),
});

Object.assign(formItem, baseFormItem);

export const withoutFormItemWrapper = args => ({
  template: `
    <bx-textarea
      :value="value"
      :color-scheme="colorScheme"
      :placeholder="placeholder"
      @input="onInput"
      :invalid="invalid"
      :disabled="disabled"
    >
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-textarea>
  `,
  ...createVueBindingsFromProps(args?.['bx-textarea']),
});

Object.assign(withoutFormItemWrapper, baseWithoutFormItemWrapper);

export const skeleton = () => ({
  template: `<bx-textarea-skeleton></bx-textarea-skeleton>`,
});
