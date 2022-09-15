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
import baseStory, { Default as baseDefault } from './dropdown-story';

export const Default = args => ({
  template: `
    <bx-dropdown
      [open]="open"
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [helperText]="helperText"
      [labelText]="labelText"
      [size]="size"
      [value]="value"
      [triggerContent]="triggerContent"
      (bx-dropdown-beingselected)="handleBeforeSelect($event)"
      (bx-dropdown-beingtoggled)="handleBeforeToggle($event)"
      (bx-dropdown-selected)="handleSelect($event)"
      (bx-dropdown-toggled)="handleToggle($event)"
    >
      <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
      <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
      <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
      <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
      <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
    </bx-dropdown>
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
  })(args?.['bx-dropdown']),
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-dropdown-skeleton></bx-dropdown-skeleton>`,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
