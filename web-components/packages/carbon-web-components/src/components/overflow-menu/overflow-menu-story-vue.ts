/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './overflow-menu-story';

export { default } from './overflow-menu-story';

export const Default = args => ({
  template: `
      <bx-overflow-menu :open="open" :color-scheme="colorScheme" :disabled="disabled" :size="size">
        <bx-overflow-menu-body :direction="direction">
          <bx-overflow-menu-item>Option 1</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 2</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 3</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 4</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 5</bx-overflow-menu-item>
        </bx-overflow-menu-body>
      </bx-overflow-menu>
    `,
  ...createVueBindingsFromProps(args?.['bx-overflow-menu']),
});

Object.assign(Default, baseDefault);
