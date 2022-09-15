/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { Default as baseDefault, Filterable as filterableStory } from './multi-select-story';

export const Default = args => ({
  template: `
    <bx-multi-select
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [invalid]="invalid"
      [open]="open"
      [clearSelectionLabel]="clearSelectionLabel"
      [helperText]="helperText"
      [labelText]="labelText"
      [toggleLabelClosed]="toggleLabelClosed"
      [toggleLabelOpen]="toggleLabelOpen"
      [size]="size"
      [triggerContent]="triggerContent"
      [type]="type"
      [validityMessage]="validityMessage"
      (bx-multi-select-beingselected)="handleBeforeSelect($event)"
      (bx-multi-select-beingtoggled)="handleBeforeToggle($event)"
      (bx-multi-select-selected)="handleSelect($event)"
      (bx-multi-select-toggled)="handleToggle($event)"
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
  `,
  props: (({ disableSelection, disableToggle, onBeforeSelect, onBeforeToggle, onSelect, onToggle, ...rest }) => {
    const handleBeforeSelect = (event: CustomEvent) => {
      if (onBeforeSelect) {
        onBeforeSelect(event);
      }
      if (disableSelection) {
        event.preventDefault();
      }
    };
    const handleBeforeToggle = (event: CustomEvent) => {
      if (onBeforeToggle) {
        onBeforeToggle(event);
      }
      if (disableToggle) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeSelect,
      handleBeforeToggle,
      handleSelect: onSelect,
      handleToggle: onToggle,
    };
  })(args?.['bx-multi-select']),
});

Object.assign(Default, baseDefault);

export const Filterable = args => ({
  template: `
    <bx-multi-select
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [invalid]="invalid"
      [open]="open"
      [clearSelectionLabel]="clearSelectionLabel"
      [helperText]="helperText"
      [labelText]="labelText"
      [toggleLabelClosed]="toggleLabelClosed"
      [toggleLabelOpen]="toggleLabelOpen"
      [size]="size"
      [triggerContent]="triggerContent"
      [type]="type"
      [validityMessage]="validityMessage"
      (bx-multi-select-beingselected)="handleBeforeSelect($event)"
      (bx-multi-select-beingtoggled)="handleBeforeToggle($event)"
      (bx-multi-select-selected)="handleSelect($event)"
      (bx-multi-select-toggled)="handleToggle($event)"
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
  `,
  props: (({ disableSelection, disableToggle, onBeforeSelect, onBeforeToggle, onSelect, onToggle, ...rest }) => {
    const handleBeforeSelect = (event: CustomEvent) => {
      if (onBeforeSelect) {
        onBeforeSelect(event);
      }
      if (disableSelection) {
        event.preventDefault();
      }
    };
    const handleBeforeToggle = (event: CustomEvent) => {
      if (onBeforeToggle) {
        onBeforeToggle(event);
      }
      if (disableToggle) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeSelect,
      handleBeforeToggle,
      handleSelect: onSelect,
      handleToggle: onToggle,
    };
  })(args?.['bx-multi-select']),
});

Object.assign(Filterable, filterableStory);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
