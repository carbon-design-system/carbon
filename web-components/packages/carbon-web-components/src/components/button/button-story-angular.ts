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
import { Add16Module } from '@carbon/icons-angular/lib/add/16';
import baseStory, {
  Default as baseDefault,
  icon as baseIcon,
  textAndIcon as baseTextAndIcon,
  skeleton as baseSkeleton,
} from './button-story';

export const Default = args => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" [isExpressive]="isExpressive"
            (click)="onClick($event)">Button</bx-btn>
  `,
  props: args?.['bx-btn'],
});

Object.assign(Default, baseDefault);

export const icon = args => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" [isExpressive]="isExpressive"
            (click)="onClick($event)">
      <ibm-icon-add16 slot="icon"></ibm-icon-add16>
    </bx-btn>
  `,
  props: args?.['bx-btn'],
});

Object.assign(icon, baseIcon, {
  decorators: [
    moduleMetadata({
      imports: [Add16Module],
    }),
  ],
});

export const textAndIcon = args => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [size]="size" [href]="href" [iconLayout]="iconLayout"
            [isExpressive]="isExpressive" (click)="onClick($event)">
      Button <ibm-icon-add16 slot="icon"></ibm-icon-add16>
    </bx-btn>
  `,
  props: args?.['bx-btn'],
});

Object.assign(textAndIcon, baseTextAndIcon, {
  decorators: [
    moduleMetadata({
      imports: [Add16Module],
    }),
  ],
});

export const skeleton = args => ({
  template: `
    <bx-btn-skeleton [disabled]="disabled" [small]="small" [href]="href" [isExpressive]="isExpressive"
                     (click)="onClick($event)"></bx-btn-skeleton>
  `,
  props: args?.['bx-btn-skeleton'],
});

Object.assign(skeleton, baseSkeleton);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
