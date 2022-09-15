/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './combo-box-story';

export { default } from './combo-box-story';

export const Default = args => ({
  template: `
    <bx-combo-box
      :open="open"
      :color-scheme="colorScheme"
      :disabled="disabled"
      :invalid="invalid"
      :light="light"
      :helper-text="helperText"
      :label-text="labelText"
      :size="size"
      :type="type"
      :validity-message="validityMessage"
      :value="value"
      :trigger-content="triggerContent"
      @bx-combo-box-beingselected="handleBeforeSelect"
      @bx-combo-box-beingtoggled="handleBeforeToggle"
      @bx-combo-box-selected="handleSelect"
      @bx-combo-box-toggled="handleToggle"
    >
      <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
      <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
      <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
      <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
      <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
    </bx-combo-box>
  `,
  ...createVueBindingsFromProps(
    (({ onBeforeSelect, onBeforeToggle, onSelect, onToggle, ...rest }) => {
      function handleBeforeSelect(this: any, event: CustomEvent) {
        if (onBeforeSelect) {
          onBeforeSelect(event);
        }
        // NOTE: Using class property ref instead of closure ref (from `original`)
        // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
        if (this.disableSelection) {
          event.preventDefault();
        }
      }
      function handleBeforeToggle(this: any, event: CustomEvent) {
        if (onBeforeToggle) {
          onBeforeToggle(event);
        }
        // NOTE: Using class property ref instead of closure ref (from `original`)
        // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
        if (this.disableToggle) {
          event.preventDefault();
        }
      }
      return {
        ...rest,
        handleBeforeSelect,
        handleBeforeToggle,
        handleSelect: onSelect,
        handleToggle: onToggle,
      };
    })(args?.['bx-combo-box'])
  ),
});

Object.assign(Default, baseDefault);
