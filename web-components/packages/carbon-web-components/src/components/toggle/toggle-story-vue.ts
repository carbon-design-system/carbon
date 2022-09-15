/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './toggle-story';

export { default } from './toggle-story';

export const Default = args => ({
  template: `
    <bx-toggle
      :checked="checked"
      :checked-text="checkedText"
      :disabled="disabled"
      :label-text="labelText"
      :name="name"
      :size="size"
      :unchecked-text="uncheckedText"
      :value="value"
      @bx-toggle-changed="onChange"
    ></bx-toggle>
  `,
  ...createVueBindingsFromProps(args?.['bx-toggle']),
});

Object.assign(Default, baseDefault);
