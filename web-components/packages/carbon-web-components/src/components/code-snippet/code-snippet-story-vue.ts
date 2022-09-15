/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  singleLine as baseSingleLine,
  multiLine as baseMultiLine,
  inline as baseInline,
  skeletonSingleLine as baseSkeletonSingleLine,
  skeletonMultiLine as baseSkeletonMultiLine,
} from './code-snippet-story';

export { default } from './code-snippet-story';

export const singleLine = args => ({
  template: `
    <bx-code-snippet
      :code-assistive-text="codeAssistiveText"
      :copy-button-assistive-text="copyButtonAssistiveText"
      :copy-button-feedback-text="copyButtonFeedbackText || undefined"
      :copy-button-feedback-timeout="copyButtonFeedbackTimeout"
      :color-scheme="colorScheme"
      @click="onClick"
    >node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
    officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga
    laboriosam!</bx-code-snippet>
  `,
  ...createVueBindingsFromProps(args?.['bx-code-snippet']),
});

Object.assign(singleLine, baseSingleLine);

export const multiLine = args => ({
  template: `
    <bx-code-snippet
      type="multi"
      :code-assistive-text="codeAssistiveText"
      :copy-button-assistive-text="copyButtonAssistiveText"
      :copy-button-feedback-text="copyButtonFeedbackText || undefined"
      :copy-button-feedback-timeout="copyButtonFeedbackTimeout"
      :collapse-button-text="collapseButtonText"
      :expand-button-text="expandButtonText"
      :color-scheme="colorScheme"
      @click="onClick"
    >@mixin grid-container {
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
);</bx-code-snippet>
  `,
  ...createVueBindingsFromProps(args?.['bx-code-snippet']),
});

Object.assign(multiLine, baseMultiLine);

export const inline = args => ({
  template: `
    <bx-code-snippet
      type="inline"
      :code-assistive-text="codeAssistiveText"
      :copy-button-assistive-text="copyButtonAssistiveText"
      :copy-button-feedback-text="copyButtonFeedbackText || undefined"
      :copy-button-feedback-timeout="copyButtonFeedbackTimeout"
      :color-scheme="colorScheme"
      @click="onClick"
    >node -v</bx-code-snippet>
  `,
  ...createVueBindingsFromProps(args?.['bx-code-snippet']),
});

export const skeletonSingleLine = () => ({
  template: `<bx-code-snippet-skeleton type="single"></bx-code-snippet-skeleton>`,
});

Object.assign(skeletonSingleLine, baseSkeletonSingleLine);

export const skeletonMultiLine = () => ({
  template: `<bx-code-snippet-skeleton type="multi"></bx-code-snippet-skeleton>`,
});

Object.assign(skeletonMultiLine, baseSkeletonMultiLine);

Object.assign(inline, baseInline);
