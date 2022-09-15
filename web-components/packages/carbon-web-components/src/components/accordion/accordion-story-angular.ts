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
import baseStory, { Default as baseDefault } from './accordion-story';

export const Default = args => ({
  template: `
    <bx-accordion
      (bx-accordion-item-beingtoggled)="handleBeforeToggle($event)"
      (bx-accordion-item-toggled)="handleToggle($event)"
      [size]="size"
    >
      <bx-accordion-item [open]="open" [titleText]="titleText" [disabled]="disabled">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item [open]="open" [titleText]="titleText">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item [open]="open" [titleText]="titleText">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <span slot="title">{{ titleText }}</span>
      </bx-accordion-item>
    </bx-accordion>
  `,
  props: (({ disableToggle, onBeforeToggle, onToggle, ...rest }) => ({
    ...rest,
    handleBeforeToggle: (event: CustomEvent) => {
      onBeforeToggle(event);
      if (disableToggle) {
        event.preventDefault();
      }
    },
    handleToggle: onToggle,
  }))(args?.['bx-accordion']),
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
