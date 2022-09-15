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
import baseStory, { Default as baseDefault, filter as baseFilter } from './tag-story';

export const Default = args => ({
  template: `
    <bx-tag [size]="size" [type]="type" [title]="title" [disabled]="disabled">
      This is a tag
    </bx-tag>
  `,
  props: args?.['bx-tag'],
});

Object.assign(Default, baseDefault);

export const filter = args => ({
  template: `
    <bx-filter-tag
      [open]="open"
      [size]="size"
      [type]="type"
      [title]="title"
      [disabled]="disabled"
      (click)="onClick($event)"
      (bx-filter-tag-beingclosed)="handleBeforeClose($event)"
      (bx-filter-tag-closed)="handleClose($event)"
    >
      This is a tag
    </bx-filter-tag>
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
  }))(args?.['bx-filter-tag']),
});

Object.assign(filter, baseFilter);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
