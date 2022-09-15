/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './link-story';

export { default } from './link-story';

export const Default = args => ({
  template: `
    <bx-link :disabled="disabled" :href="href" @click="onClick" :size="size">
      Link
    </bx-link>
  `,
  ...createVueBindingsFromProps(args?.['bx-link']),
});

Object.assign(Default, baseDefault);
