/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { CODE_SNIPPET_COLOR_SCHEME } from './code-snippet';
import storyDocs from './code-snippet-story.mdx';
import './code-snippet-skeleton';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${CODE_SNIPPET_COLOR_SCHEME.LIGHT})`]: CODE_SNIPPET_COLOR_SCHEME.LIGHT,
};

const defaultKnobs = {
  'bx-code-snippet': () => ({
    codeAssistiveText: textNullable('Assistive text for the code portion (code-assistive-text)', ''),
    copyButtonAssistiveText: textNullable('Assistive text for the copy button (copy-button-assistive-text)', ''),
    copyButtonFeedbackText: textNullable('Feedback text for copy button (copy-button-feedback-text)', ''),
    copyButtonFeedbackTimeout: number('Feedback timeout for copy button (copy-buttobn-feedback-timeout)', 2000),
    colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
    onClick: action('click'),
  }),
};

export const singleLine = args => {
  const { codeAssistiveText, copyButtonAssistiveText, copyButtonFeedbackText, copyButtonFeedbackTimeout, colorScheme, onClick } =
    args?.['bx-code-snippet'] ?? {};
  const children = `
    node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
    officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae
    laboriosam!
  `;
  return html`
    <bx-code-snippet
      code-assistive-text="${ifNonNull(codeAssistiveText)}"
      copy-button-assistive-text="${ifNonNull(copyButtonAssistiveText)}"
      copy-button-feedback-text="${ifNonNull(copyButtonFeedbackText)}"
      copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
      color-scheme="${ifNonNull(colorScheme)}"
      @click="${onClick}"
      >${children}</bx-code-snippet
    >
  `;
};

singleLine.storyName = 'Single line';

singleLine.parameters = {
  knobs: defaultKnobs,
};

export const multiLine = args => {
  const {
    codeAssistiveText,
    copyButtonAssistiveText,
    copyButtonFeedbackText,
    copyButtonFeedbackTimeout,
    collapseButtonText,
    expandButtonText,
    colorScheme,
    onClick,
  } = args?.['bx-code-snippet'] ?? {};
  const children = `
@mixin grid-container {
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
);
`.trim();
  // prettier-ignore
  return html`
  <bx-code-snippet
    type="multi"
    code-assistive-text="${ifNonNull(codeAssistiveText)}"
    copy-button-assistive-text="${ifNonNull(copyButtonAssistiveText)}"
    copy-button-feedback-text="${ifNonNull(copyButtonFeedbackText)}"
    copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
    collapse-button-text="${ifNonNull(collapseButtonText)}"
    expand-button-text="${ifNonNull(expandButtonText)}"
    color-scheme="${ifNonNull(colorScheme)}"
    @click="${onClick}"
  >${children}</bx-code-snippet>
`;
};

multiLine.storyName = 'Multi line';

multiLine.parameters = {
  knobs: {
    'bx-code-snippet': () => ({
      ...defaultKnobs['bx-code-snippet'](),
      collapseButtonText: textNullable('The text for the collapse button (collapse-button-text)', ''),
      expandButtonText: textNullable('The text for the expand button (expand-button-text)', ''),
    }),
  },
};

export const inline = args => {
  const { codeAssistiveText, copyButtonAssistiveText, copyButtonFeedbackText, copyButtonFeedbackTimeout, colorScheme, onClick } =
    args?.['bx-code-snippet'] ?? {};
  return html`
    <bx-code-snippet
      type="inline"
      code-assistive-text="${ifNonNull(codeAssistiveText)}"
      copy-button-assistive-text="${ifNonNull(copyButtonAssistiveText)}"
      copy-button-feedback-text="${ifNonNull(copyButtonFeedbackText)}"
      copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
      color-scheme="${ifNonNull(colorScheme)}"
      @click="${onClick}"
      >node -v</bx-code-snippet
    >
  `;
};

inline.storyName = 'Inline';

inline.parameters = {
  knobs: defaultKnobs,
};

export const skeletonSingleLine = () => html` <bx-code-snippet-skeleton type="single"></bx-code-snippet-skeleton> `;

skeletonSingleLine.storyName = 'Skeleton single line';

skeletonSingleLine.parameters = {
  percy: {
    skip: true,
  },
};

export const skeletonMultiLine = () => html` <bx-code-snippet-skeleton type="multi"></bx-code-snippet-skeleton> `;

skeletonMultiLine.storyName = 'Skeleton multi line';

skeletonMultiLine.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Code snippet',
  parameters: {
    ...storyDocs.parameters,
  },
};
