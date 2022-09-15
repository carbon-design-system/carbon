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
import baseStory, { Default as baseDefault } from './copy-button-story';

export const Default = args => ({
  template: `
    <bx-copy-button
      [buttonAssistiveText]="buttonAssistiveText"
      [attr.feedbackText]="feedbackText || null"
      [feedbackTimeout]="feedbackTimeout"
      (click)="onClick($event)"
    ></bx-copy-button>
  `,
  props: args?.['bx-copy-button'],
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
