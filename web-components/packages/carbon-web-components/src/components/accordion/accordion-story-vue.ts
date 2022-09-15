/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './accordion-story';

export { default } from './accordion-story';

export const Default = args => ({
  template: `
    <bx-accordion
      @bx-accordion-item-beingtoggled="handleBeforeToggle"
      @bx-accordion-item-toggled="handleToggle"
    >
      <bx-accordion-item :open="open" :title-text="titleText" :disabled="disabled" :size="size">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item :open="open" :title-text="titleText" :size="size">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item :open="open" :size="size">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <span slot="title">{{ titleText }}</span>
      </bx-accordion-item>
    </bx-accordion>
  `,
  ...createVueBindingsFromProps(
    (({ disableToggle, onBeforeToggle, onToggle, ...rest }) => ({
      ...rest,
      handleBeforeToggle: (event: CustomEvent) => {
        onBeforeToggle(event);
        if (disableToggle) {
          event.preventDefault();
        }
      },
      handleToggle: onToggle,
    }))(args?.['bx-accordion'])
  ),
});

Object.assign(Default, baseDefault);
