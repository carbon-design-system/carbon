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
  singleLine as baseSingleLine,
  multiLine as baseMultiLine,
  inline as baseInline,
  skeletonSingleLine as baseSkeletonSingleLine,
  skeletonMultiLine as baseSkeletonMultiLine,
} from './code-snippet-story';

const multilineCode = `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`;

export const singleLine = args => ({
  template: `
    <bx-code-snippet
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      [colorScheme]="colorScheme"
      (click)="onClick($event)"
      >node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
      officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga
      laboriosam!</bx-code-snippet
    >
  `,
  props: args?.['bx-code-snippet'],
});

Object.assign(singleLine, baseSingleLine);

export const multiLine = args => ({
  template: `
    <bx-code-snippet
      type="multi"
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      [collapseButtonText]="collapseButtonText"
      [expandButtonText]="expandButtonText"
      [colorScheme]="colorScheme"
      (click)="onClick($event)"
      >{{code}}</bx-code-snippet>
  `,
  props: { ...args?.['bx-code-snippet'], code: multilineCode },
});

Object.assign(multiLine, baseMultiLine);

export const inline = args => ({
  template: `
    <bx-code-snippet
      type="inline"
      [codeAssistiveText]="codeAssistiveText"
      [copyButtonAssistiveText]="copyButtonAssistiveText"
      [attr.copy-button-feedback-text]="copyButtonFeedbackText || null"
      [copyButtonFeedbackTimeout]="copyButtonFeedbackTimeout"
      [colorScheme]="colorScheme"
      (click)="onClick($event)"
      >node -v</bx-code-snippet
    >
  `,
  props: args?.['bx-code-snippet'],
});

Object.assign(inline, baseInline);

export const skeletonSingleLine = () => ({
  template: `<bx-code-snippet-skeleton type="single"></bx-code-snippet-skeleton>`,
});

Object.assign(skeletonSingleLine, baseSkeletonSingleLine);

export const skeletonMultiLine = () => ({
  template: `<bx-code-snippet-skeleton type="multi"></bx-code-snippet-skeleton>`,
});

Object.assign(skeletonMultiLine, baseSkeletonMultiLine);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
