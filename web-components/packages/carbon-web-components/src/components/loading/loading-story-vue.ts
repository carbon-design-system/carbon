/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './loading-story';

export { default } from './loading-story';

export const Default = args => ({
  template: `
    <bx-loading :inactive="inactive" :type="type"></bx-loading>
  `,
  ...createVueBindingsFromProps(args?.['bx-loading']),
});

Object.assign(Default, baseDefault);
