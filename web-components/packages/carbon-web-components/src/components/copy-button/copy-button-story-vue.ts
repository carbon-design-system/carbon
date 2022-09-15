/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './copy-button-story';

export { default } from './copy-button-story';

export const Default = args => ({
  template: `
    <bx-copy-button
      :button-assistive-text="buttonAssistiveText"
      :feedback-text="feedbackText || undefined"
      :feedback-timeout="feedbackTimeout"
      @click="onClick"
    ></bx-copy-button>
  `,
  ...createVueBindingsFromProps(args?.['bx-copy-button']),
});

Object.assign(Default, baseDefault);
