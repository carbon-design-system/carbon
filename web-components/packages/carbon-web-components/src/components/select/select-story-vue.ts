/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './select-story';

export { default } from './select-story';

export const Default = args => ({
  template: `
    <bx-select
      :autofocus="autofocus"
      :color-scheme="colorScheme"
      :disabled="disabled"
      :helper-text="helperText"
      :invalid="invalid"
      :label-text="labelText"
      :name="name"
      :placeholder="placeholder"
      :size="size"
      :validity-message="validityMessage"
      :value="value"
      @input="onInput"
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
  ...createVueBindingsFromProps(args?.['bx-select']),
});

Object.assign(Default, baseDefault);
