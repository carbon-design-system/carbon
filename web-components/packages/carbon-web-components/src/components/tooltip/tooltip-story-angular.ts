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
import { Filter16Module } from '@carbon/icons-angular/lib/filter/16';
import baseStory, { Default as baseDefault, definition as baseDefinition, icon as baseIcon } from './tooltip-story';

export const Default = args => ({
  template: `
    <bx-tooltip [open]="open">
      <bx-tooltip-body [direction]="direction">
        <p>
          This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
          please use a modal instead.
        </p>
        <bx-tooltip-footer>
          <span><!-- TODO: Figure out how to style link in the story --></span><bx-btn kind="primary">Create</bx-btn>
        </bx-tooltip-footer>
      </bx-tooltip-body>
    </bx-tooltip>
  `,
  props: { ...args?.['bx-tooltip'], ...args?.['bx-tooltip-body'] },
});

Object.assign(Default, baseDefault);

export const definition = args => ({
  template: `
    <bx-tooltip-definition [alignment]="alignment" [bodyText]="bodyText" [direction]="direction">
      Definition Tooltip
    </bx-tooltip-definition>
  `,
  props: args?.['bx-tooltip-definition'],
});

Object.assign(definition, baseDefinition);

export const icon = args => ({
  template: `
    <bx-tooltip-icon [alignment]="alignment" [bodyText]="bodyText" [direction]="direction">
      <ibm-icon-filter16></ibm-icon-filter16>
    </bx-tooltip-icon>
  `,
  props: args?.['bx-tooltip-icon'],
});

Object.assign(icon, baseIcon, {
  decorators: [
    moduleMetadata({
      imports: [Filter16Module],
    }),
  ],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
