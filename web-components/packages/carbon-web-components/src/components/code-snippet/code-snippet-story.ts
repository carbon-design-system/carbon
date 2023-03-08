/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import { CODE_SNIPPET_COLOR_SCHEME } from './code-snippet';
import storyDocs from './code-snippet-story.mdx';
import './code-snippet-skeleton';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${CODE_SNIPPET_COLOR_SCHEME.LIGHT})`]:
    CODE_SNIPPET_COLOR_SCHEME.LIGHT,
};

const defaultKnobs = {
  [`${prefix}-code-snippet`]: () => ({
    codeAssistiveText: textNullable(
      'Assistive text for the code portion (code-assistive-text)',
      ''
    ),
    copyButtonAssistiveText: textNullable(
      'Assistive text for the copy button (copy-button-assistive-text)',
      ''
    ),
    copyButtonFeedbackText: textNullable(
      'Feedback text for copy button (copy-button-feedback-text)',
      ''
    ),
    copyButtonFeedbackTimeout: number(
      'Feedback timeout for copy button (copy-buttobn-feedback-timeout)',
      2000
    ),
    colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
    onClick: action('click'),
  }),
};

export const singleLine = (args) => {
  const {
    codeAssistiveText,
    copyButtonAssistiveText,
    copyButtonFeedbackText,
    copyButtonFeedbackTimeout,
    colorScheme,
    onClick,
  } = args?.[`${prefix}-code-snippet`] ?? {};
  const children = `
    node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae
    officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae
    laboriosam!
  `;
  return html`
    <cds-code-snippet
      code-assistive-text="${ifDefined(codeAssistiveText)}"
      copy-button-assistive-text="${ifDefined(copyButtonAssistiveText)}"
      copy-button-feedback-text="${ifDefined(copyButtonFeedbackText)}"
      copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
      color-scheme="${ifDefined(colorScheme)}"
      @click="${onClick}"
      >${children}</cds-code-snippet
    >
  `;
};

singleLine.storyName = 'Single line';

singleLine.parameters = {
  knobs: defaultKnobs,
};

export const multiLine = (args) => {
  const {
    codeAssistiveText,
    copyButtonAssistiveText,
    copyButtonFeedbackText,
    copyButtonFeedbackTimeout,
    collapseButtonText,
    expandButtonText,
    colorScheme,
    onClick,
  } = args?.[`${prefix}-code-snippet`] ?? {};
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
  <cds-code-snippet
    type="multi"
    code-assistive-text="${ifDefined(codeAssistiveText)}"
    copy-button-assistive-text="${ifDefined(copyButtonAssistiveText)}"
    copy-button-feedback-text="${ifDefined(copyButtonFeedbackText)}"
    copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
    collapse-button-text="${ifDefined(collapseButtonText)}"
    expand-button-text="${ifDefined(expandButtonText)}"
    color-scheme="${ifDefined(colorScheme)}"
    @click="${onClick}"
  >${children}</cds-code-snippet>
`;
};

multiLine.storyName = 'Multi line';

multiLine.parameters = {
  knobs: {
    [`${prefix}-code-snippet`]: () => ({
      ...defaultKnobs[`${prefix}-code-snippet`](),
      collapseButtonText: textNullable(
        'The text for the collapse button (collapse-button-text)',
        ''
      ),
      expandButtonText: textNullable(
        'The text for the expand button (expand-button-text)',
        ''
      ),
    }),
  },
};

export const inline = (args) => {
  const {
    codeAssistiveText,
    copyButtonAssistiveText,
    copyButtonFeedbackText,
    copyButtonFeedbackTimeout,
    colorScheme,
    onClick,
  } = args?.[`${prefix}-code-snippet`] ?? {};
  return html`
    <cds-code-snippet
      type="inline"
      code-assistive-text="${ifDefined(codeAssistiveText)}"
      copy-button-assistive-text="${ifDefined(copyButtonAssistiveText)}"
      copy-button-feedback-text="${ifDefined(copyButtonFeedbackText)}"
      copy-button-feedback-timeout="${copyButtonFeedbackTimeout}"
      color-scheme="${ifDefined(colorScheme)}"
      @click="${onClick}"
      >node -v</cds-code-snippet
    >
  `;
};

inline.storyName = 'Inline';

inline.parameters = {
  knobs: defaultKnobs,
};

export const skeletonSingleLine = () =>
  html` <cds-code-snippet-skeleton type="single"></cds-code-snippet-skeleton> `;

skeletonSingleLine.storyName = 'Skeleton single line';

skeletonSingleLine.parameters = {
  percy: {
    skip: true,
  },
};

export const skeletonMultiLine = () =>
  html` <cds-code-snippet-skeleton type="multi"></cds-code-snippet-skeleton> `;

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
