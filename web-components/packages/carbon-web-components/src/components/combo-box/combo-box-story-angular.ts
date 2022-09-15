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
import baseStory, { Default as baseDefault } from './combo-box-story';

export const Default = args => ({
  template: `
    <bx-combo-box
      [open]="open"
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [invalid]="invalid"
      [helperText]="helperText"
      [labelText]="labelText"
      [size]="size"
      [type]="type"
      [validityMessage]="validityMessage"
      [value]="value"
      [triggerContent]="triggerContent"
      (bx-combo-box-beingselected)="handleBeforeSelect($event)"
      (bx-combo-box-beingtoggled)="handleBeforeToggle($event)"
      (bx-combo-box-selected)="handleSelect($event)"
      (bx-combo-box-toggled)="handleToggle($event)"
    >
      <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
      <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
      <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
      <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
      <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
    </bx-combo-box>
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
  })(args?.['bx-combo-box']),
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
