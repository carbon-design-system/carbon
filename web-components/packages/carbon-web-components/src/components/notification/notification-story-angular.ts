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
import baseStory, { inline as baseInline, toast as baseToast } from './notification-story';

export const inline = args => ({
  template: `
    <bx-inline-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      [kind]="kind"
      [title]="title"
      [subtitle]="subtitle"
      [hideCloseButton]="hideCloseButton"
      [lowContrast]="lowContrast"
      [closeButtonLabel]="closeButtonLabel"
      [iconLabel]="iconLabel"
      [open]="open"
      [timeout]="timeout"
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-inline-notification>
  `,
  props: (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
    ...rest,
    handleBeforeClose: (event: CustomEvent) => {
      onBeforeClose(event);
      if (disableClose) {
        event.preventDefault();
      }
    },
    handleClose: onClose,
  }))(args?.['bx-inline-notification']),
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

Object.assign(inline, baseInline);

export const toast = args => ({
  template: `
    <bx-toast-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      [kind]="kind"
      [title]="title"
      [subtitle]="subtitle"
      [caption]="caption"
      [hideCloseButton]="hideCloseButton"
      [lowContrast]="lowContrast"
      [closeButtonLabel]="closeButtonLabel"
      [iconLabel]="iconLabel"
      [open]="open"
      [timeout]="timeout"
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-toast-notification>
  `,
  props: (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
    ...rest,
    handleBeforeClose: (event: CustomEvent) => {
      onBeforeClose(event);
      if (disableClose) {
        event.preventDefault();
      }
    },
    handleClose: onClose,
  }))(args?.['bx-toast-notification']),
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

Object.assign(toast, baseToast);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
