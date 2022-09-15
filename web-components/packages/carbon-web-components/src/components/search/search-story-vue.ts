/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './search-story';

export { default } from './search-story';

export const Default = args => ({
  template: `
    <bx-search
      :close-button-assistive-text="closeButtonAssistiveText"
      :color-scheme="colorScheme"
      :disabled="disabled"
      :light="light"
      :label-text="labelText"
      :name="name"
      :placeholder="placeholder"
      :size="size"
      :type="type"
      :value="value"
      @bx-search-input="onInput"
    ></bx-search>
  `,
  ...createVueBindingsFromProps(args?.['bx-search']),
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-search-skeleton></bx-search-skeleton>`,
});
