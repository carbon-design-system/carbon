/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './checkbox-story';

export { default } from './checkbox-story';

export const Default = args => ({
  template: `
    <bx-checkbox
      :checked="checked"
      :disabled="disabled"
      :hide-label="hideLabel"
      :indeterminate="indeterminate"
      :label-text="labelText"
      :name="name"
      :value="value"
      @bx-checkbox-changed="onChange"
    ></bx-checkbox>
  `,
  ...createVueBindingsFromProps(args?.['bx-checkbox']),
});

Object.assign(Default, baseDefault);
