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
import baseStory, { Default as baseDefault } from './progress-indicator-story';

export const Default = args => ({
  template: `
    <bx-progress-indicator
      [vertical]="vertical"
    >
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="invalid"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="complete"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="current"
      ></bx-progress-step>
      <bx-progress-step
        disabled
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
      ></bx-progress-step>
    </bx-progress-indicator>
  `,
  props: { ...args?.['bx-progress-indicator'], ...args?.['bx-progress-step'] },
});

Object.assign(Default, baseDefault);

export const skeleton = args => ({
  template: `
    <bx-progress-indicator-skeleton [vertical]="vertical">
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
    </bx-progress-indicator-skeleton>
  `,
  props: args?.['bx-progress-indicator-skeleton'],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
