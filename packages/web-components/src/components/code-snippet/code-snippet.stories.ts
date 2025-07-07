/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../layer/index';
import '../../../.storybook/templates/with-layer';

const args = {
  copyButtonDescription: 'Copy to clipboard',
  copyText: '',
  disabled: false,
  feedback: '',
  feedbackTimeout: 0,
  hideCopyButton: false,
  maxCollapsedNumberOfRows: 15,
  maxExpandeddNumberOfRows: 0,
  minCollapsedNumberOfRows: 3,
  minExpandeddNumberOfRows: 16,
  showLessText: 'Show less',
  showMoreText: 'Show more',
  type: 'single',
  text: 'node -v',
  wrapText: false,
};

const argTypes = {
  copyButtonDescription: {
    control: 'text',
    description: 'Specify the description for the Copy Button.',
  },
  copyText: {
    control: 'text',
    description:
      "Optional text to copy. If not specified, the children node's <code>innerText</code> will be used as the copy value.",
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether or not the CodeSnippet should be disabled.',
  },
  feedback: {
    control: 'text',
    description: 'Specify the string displayed when the snippet is copied.',
  },
  feedbackTimeout: {
    control: 'number',
    description:
      'Specify the time it takes for the feedback message to timeout.',
  },
  hideCopyButton: {
    control: 'boolean',
    description:
      'Specify whether or not a copy button should be used/rendered.',
  },
  maxCollapsedNumberOfRows: {
    control: 'number',
    description:
      'Specify the maximum number of rows to be shown when in collapsed view.',
  },
  maxExpandeddNumberOfRows: {
    control: 'number',
    description:
      'Specify the maximum number of rows to be shown when in expanded view.',
  },
  minCollapsedNumberOfRows: {
    control: 'number',
    description:
      'Specify the minimum number of rows to be shown when in collapsed view.',
  },
  minExpandeddNumberOfRows: {
    control: 'number',
    description:
      'Specify the minimum number of rows to be shown when in expanded view.',
  },
  showLessText: {
    control: 'text',
    description:
      'Specify a string that is displayed when the Code Snippet has been interacted with to show more lines.',
  },
  showMoreText: {
    control: 'text',
    description:
      'Specify a string that is displayed when the Code Snippet text is more than 15 lines.',
  },
  type: {
    control: 'radio',
    options: ['single', 'inline', 'multi'],
  },
  text: {
    control: 'text',
    description: 'Specify the text that is inside the code snippet',
  },
  wrapText: {
    control: 'boolean',
    description: 'Specify whether or not to wrap the text.',
  },
};

export const Inline = {
  args: {
    ...args,
    type: 'inline',
  },
  argTypes,
  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};
    return html`
      <cds-code-snippet
        type="${type}"
        copy-text="${copyText}"
        ?disabled="${disabled}"
        maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
        maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
        minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
        minExpandedNumberOfRows="${minExpandedNumberOfRows}"
        ?hide-copy-button="${hideCopyButton}"
        show-less-text="${showLessText}"
        show-more-text="${showMoreText}"
        ?wrap-text="${wrapText}"
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        tooltip-content="${copyButtonDescription}"
        >${text}
      </cds-code-snippet>
    `;
  },
};

export const InlineWithLayer = {
  args: {
    ...args,
    type: 'inline',
  },
  argTypes,
  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};
    return html`
      <sb-template-layers>
        <cds-code-snippet
          type="${type}"
          copy-text="${copyText}"
          ?disabled="${disabled}"
          maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
          maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
          minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
          minExpandedNumberOfRows="${minExpandedNumberOfRows}"
          ?hide-copy-button="${hideCopyButton}"
          show-less-text="${showLessText}"
          show-more-text="${showMoreText}"
          ?wrap-text="${wrapText}"
          feedback=${feedback}
          feedback-timeout=${feedbackTimeout}
          tooltip-content="${copyButtonDescription}"
          >${text}
        </cds-code-snippet>
      </sb-template-layers>
    `;
  },
};

export const Multiline = {
  args: {
    ...args,
    type: 'multi',
    text: `"scripts": {
    "build": "lerna run build --stream --prefix --npm-client yarn",
    "ci-check": "carbon-cli ci-check",
    "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'",
    "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages",
    "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "sync": "carbon-cli sync",
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-is": "~16.9.0",
    "react-test-renderer": "~16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-export-default-from": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.10.0",
    "@babel/preset-env": "^7.10.0",
    "@babel/preset-react": "^7.10.0",
    "@babel/runtime": "^7.10.0",
    "@commitlint/cli": "^8.3.5",
`,
  },
  argTypes,

  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};
    return html`
      <cds-code-snippet
        type="${type}"
        copy-text="${copyText}"
        ?disabled="${disabled}"
        maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
        maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
        minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
        minExpandedNumberOfRows="${minExpandedNumberOfRows}"
        ?hide-copy-button="${hideCopyButton}"
        show-less-text="${showLessText}"
        show-more-text="${showMoreText}"
        ?wrap-text="${wrapText}"
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        tooltip-content="${copyButtonDescription}"
        >${text}
      </cds-code-snippet>
    `;
  },
};

export const MultilineWithLayer = {
  args: {
    ...args,
    type: 'multi',
    text: `"scripts": {
    "build": "lerna run build --stream --prefix --npm-client yarn",
    "ci-check": "carbon-cli ci-check",
    "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'",
    "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages",
    "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "sync": "carbon-cli sync",
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-is": "~16.9.0",
    "react-test-renderer": "~16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-export-default-from": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.10.0",
    "@babel/preset-env": "^7.10.0",
    "@babel/preset-react": "^7.10.0",
    "@babel/runtime": "^7.10.0",
    "@commitlint/cli": "^8.3.5",
`,
  },
  argTypes,
  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};

    return html`
      <sb-template-layers>
        <cds-code-snippet
          type="${type}"
          copy-text="${copyText}"
          ?disabled="${disabled}"
          maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
          maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
          minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
          minExpandedNumberOfRows="${minExpandedNumberOfRows}"
          ?hide-copy-button="${hideCopyButton}"
          show-less-text="${showLessText}"
          show-more-text="${showMoreText}"
          ?wrap-text="${wrapText}"
          feedback=${feedback}
          feedback-timeout=${feedbackTimeout}
          tooltip-content="${copyButtonDescription}"
          >${text}
        </cds-code-snippet>
      </sb-template-layers>
    `;
  },
};

export const Singleline = {
  args: {
    ...args,
    type: 'single',
    text: 'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  },
  argTypes,
  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};
    return html`
      <cds-code-snippet
        type="${type}"
        copy-text="${copyText}"
        ?disabled="${disabled}"
        maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
        maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
        minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
        minExpandedNumberOfRows="${minExpandedNumberOfRows}"
        ?hide-copy-button="${hideCopyButton}"
        show-less-text="${showLessText}"
        show-more-text="${showMoreText}"
        ?wrap-text="${wrapText}"
        feedback=${feedback}
        feedback-timeout=${feedbackTimeout}
        tooltip-content="${copyButtonDescription}"
        >${text}
      </cds-code-snippet>
    `;
  },
};

export const SinglelineWithLayer = {
  args: {
    ...args,
    type: 'single',
    text: 'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  },
  argTypes,
  render: (args) => {
    const {
      copyButtonDescription,
      copyText,
      disabled,
      feedback,
      feedbackTimeout,
      hideCopyButton,
      maxCollapsedNumberOfRows,
      maxExpandedNumberOfRows,
      minCollapsedNumberOfRows,
      minExpandedNumberOfRows,
      showLessText,
      showMoreText,
      text,
      type,
      wrapText,
    } = args ?? {};
    return html`
      <sb-template-layers>
        <cds-code-snippet
          type="${type}"
          copy-text="${copyText}"
          ?disabled="${disabled}"
          maxCollapsedNumberOfRows="${maxCollapsedNumberOfRows}"
          maxExpandedNumberOfRows="${maxExpandedNumberOfRows}"
          minCollapsedNumberOfRows="${minCollapsedNumberOfRows}"
          minExpandedNumberOfRows="${minExpandedNumberOfRows}"
          ?hide-copy-button="${hideCopyButton}"
          show-less-text="${showLessText}"
          show-more-text="${showMoreText}"
          ?wrap-text="${wrapText}"
          feedback=${feedback}
          feedback-timeout=${feedbackTimeout}
          tooltip-content="${copyButtonDescription}"
          >${text}</cds-code-snippet
        >
      </sb-template-layers>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`
    <cds-code-snippet-skeleton
      type="single"
      style="margin-bottom: 8px;"></cds-code-snippet-skeleton>
    <cds-code-snippet-skeleton type="multi"></cds-code-snippet-skeleton>
  `,
};

const meta = {
  title: 'Components/Code snippet',
};

export default meta;
