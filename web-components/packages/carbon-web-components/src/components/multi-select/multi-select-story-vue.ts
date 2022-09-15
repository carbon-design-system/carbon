/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault, Filterable as filterableStory } from './multi-select-story';

export { default } from './multi-select-story';

export const Default = args => ({
  template: `
    <bx-multi-select
      :color-scheme="colorScheme"
      :disabled="disabled"
      :invalid="invalid"
      :open="open"
      :clear-selection-label="clearSelectionLabel"
      :helper-text="helperText"
      :label-text="labelText"
      :size="size"
      :toggle-label-closed="toggleLabelClosed"
      :toggle-label-open="toggleLabelOpen"
      :trigger-content="triggerContent"
      :type="type"
      :validity-message="validityMessage"
      @bx-multi-select-beingselected="handleBeforeSelect"
      @bx-multi-select-beingtoggled="handleBeforeToggle"
      @bx-multi-select-selected="handleSelect"
      @bx-multi-select-toggled="handleToggle"
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
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
    })(args?.['bx-multi-select'])
  ),
});

Object.assign(Default, baseDefault);

export const Filterable = args => ({
  template: `
    <bx-multi-select
      :filterable="true"
      :color-scheme="colorScheme"
      :disabled="disabled"
      :invalid="invalid"
      :open="open"
      :clear-selection-label="clearSelectionLabel"
      :helper-text="helperText"
      :label-text="labelText"
      :size="size"
      :toggle-label-closed="toggleLabelClosed"
      :toggle-label-open="toggleLabelOpen"
      :trigger-content="triggerContent"
      :type="type"
      :validity-message="validityMessage"
      @bx-multi-select-beingselected="handleBeforeSelect"
      @bx-multi-select-beingtoggled="handleBeforeToggle"
      @bx-multi-select-selected="handleSelect"
      @bx-multi-select-toggled="handleToggle"
    >
      <bx-multi-select-item value="example"
        >An example option that is really long to show what should be done to handle long text</bx-multi-select-item
      >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
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
    })(args?.['bx-multi-select'])
  ),
});

Object.assign(Filterable, filterableStory);
