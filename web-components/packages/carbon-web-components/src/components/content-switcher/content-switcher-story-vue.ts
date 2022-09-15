/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './content-switcher-story';

export { default } from './content-switcher-story';

export const Default = args => {
  const props = (({ onBeforeSelect, onSelect, ...rest }) => {
    function handleBeforeSelect(this: any, event: CustomEvent) {
      onBeforeSelect(event);
      // NOTE: Using class property ref instead of closure ref (from `original`)
      // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
      if (this.disableSelection) {
        event.preventDefault();
      }
    }
    return {
      ...rest,
      handleBeforeSelect,
      handleAfterSelect: onSelect,
    };
  })(args?.['bx-content-switcher']);
  return {
    template: `
      <bx-content-switcher
        :value="value"
        @bx-content-switcher-beingselected="handleBeforeSelect"
        @bx-content-switcher-selected="handleAfterSelect"
        :size="size"
      >
        <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
        <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
        <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
        <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
        <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
      </bx-content-switcher>
    `,
    ...createVueBindingsFromProps(props),
  };
};

Object.assign(Default, baseDefault);
