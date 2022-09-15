/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  Default as baseDefault,
  clickable as baseClickable,
  singleSelectable as baseSingleSelectable,
  multiSelectable as baseMultiSelectable,
  expandable as baseExpandable,
} from './tile-story';

export const Default = args => ({
  template: `
    <bx-tile [colorScheme]="colorScheme">Default tile</bx-tile>
  `,
  props: args?.['bx-tile'],
});

Object.assign(Default, baseDefault);

export const clickable = args => ({
  template: `
    <bx-clickable-tile [colorScheme]="colorScheme" [href]="href">Clickable tile</bx-clickable-tile>
  `,
  props: args?.['bx-clickable-tile'],
});

Object.assign(clickable, baseClickable);

export const singleSelectable = args => ({
  template: `
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [colorScheme]="colorScheme"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [colorScheme]="colorScheme"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [colorScheme]="colorScheme"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `,
  props: args?.['bx-radio-tile'],
});

Object.assign(singleSelectable, baseSingleSelectable);

export const multiSelectable = args => ({
  template: `
    <bx-selectable-tile
      [checkmarkLabel]="checkmarkLabel"
      [colorScheme]="colorScheme"
      [name]="name"
      [selected]="selected"
      [value]="value"
      (input)="onInput($event)"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `,
  props: args?.['bx-selectable-tile'],
});

Object.assign(multiSelectable, baseMultiSelectable);

export const expandable = args => ({
  template: `
    <bx-expandable-tile
      [colorScheme]="colorScheme"
      [expanded]="expanded"
      (bx-expandable-tile-beingchanged)="handleBeforeChange($event)"
      (bx-expandable-tile-changed)="handleAfterChange($event)"
    >
      <bx-tile-above-the-fold-content slot="above-the-fold-content" style="height: 200px">
        Above the fold content here
      </bx-tile-above-the-fold-content>
      <bx-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </bx-tile-below-the-fold-content>
    </bx-expandable-tile>
  `,
  props: (({ disableChange, onBeforeChange, onChange, ...rest }) => {
    const handleBeforeChange = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeChange,
      handleAfterChange: onChange,
    };
  })(args?.['bx-expandable-tile']),
});

Object.assign(expandable, baseExpandable);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
