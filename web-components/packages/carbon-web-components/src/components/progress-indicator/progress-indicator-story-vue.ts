/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './progress-indicator-story';

export { default } from './progress-indicator-story';

export const Default = args => ({
  template: `
    <bx-progress-indicator
      :vertical="vertical"
    >
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="invalid"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="complete"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="current"
      ></bx-progress-step>
      <bx-progress-step
        disabled
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
      ></bx-progress-step>
    </bx-progress-indicator>
  `,
  ...createVueBindingsFromProps({ ...args?.['bx-progress-indicator'], ...args?.['bx-progress-step'] }),
});

Object.assign(Default, baseDefault);

export const skeleton = args => ({
  template: `
    <bx-progress-indicator-skeleton :vertical="vertical">
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
    </bx-progress-indicator-skeleton>
  `,
  ...createVueBindingsFromProps(args?.['bx-progress-indicator-skeleton']),
});
