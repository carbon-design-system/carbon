/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './radio-button-story';

export { default } from './radio-button-story';

export const Default = args => ({
  template: `
    <bx-radio-button-group
      :disabled="disabled"
      :label-position="labelPosition"
      :orientation="orientation"
      :name="name"
      :value="value"
      @bx-radio-button-group-changed="onChange"
    >
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="all"></bx-radio-button>
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="cloudFoundry"></bx-radio-button>
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="staging"></bx-radio-button>
    </bx-radio-button-group>
  `,
  ...createVueBindingsFromProps({ ...args?.['bx-radio-button-group'], ...args?.['bx-radio-button'] }),
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-radio-button-skeleton></bx-radio-button-skeleton>`,
});
