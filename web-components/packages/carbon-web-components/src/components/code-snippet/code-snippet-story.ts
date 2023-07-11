/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { number, boolean } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './code-snippet-story.mdx';
import './index';

export const inline = () => {
  return html`
    <cds-code-snippet type="inline"
      >node -v<span slot="button-description">Copy to clipboard</span>
    </cds-code-snippet>
  `;
};

export const inlineWithLayer = () => {
  return html`
    <sb-template-layers>
      <cds-code-snippet type="inline"
        >node -v<span slot="button-description">Copy to clipboard</span>
      </cds-code-snippet>
    </sb-template-layers>
  `;
};

export const multiline = () => {
  const children = `"scripts": {
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
`;
  // prettier-ignore
  return html`
    <cds-code-snippet
      type="multi" tooltip-content="Copy to Clipboard">${children}
    </cds-code-snippet>
`;
};

export const multilineWithLayer = () => {
  const children = `"scripts": {
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
`;
  // prettier-ignore
  return html`
  <sb-template-layers>
  <cds-code-snippet
      type="multi" tooltip-content="Copy to Clipboard">${children}
    </cds-code-snippet>
  </sb-template-layers>
`;
};

export const singleline = () => {
  return html`
    <cds-code-snippet type="single" tooltip-content="Copy to Clipboard">
      yarn add carbon-components@latest carbon-components-react@latest
      @carbon/icons-react@latest carbon-icons@latest
    </cds-code-snippet>
  `;
};

export const singlelineWithLayer = () => {
  return html`
    <sb-template-layers>
      <cds-code-snippet type="single" tooltip-content="Copy to Clipboard"
        >yarn add carbon-components@latest carbon-components-react@latest
        @carbon/icons-react@latest carbon-icons@latest ></cds-code-snippet
      >
    </sb-template-layers>
  `;
};

export const skeleton = () =>
  html`
    <cds-code-snippet-skeleton
      type="single"
      style="margin-bottom: 8px"></cds-code-snippet-skeleton>
    <cds-code-snippet-skeleton type="multi"></cds-code-snippet-skeleton>
  `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
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
    wrapText,
  } = args?.[`${prefix}-code-snippet`] ?? {};
  return html`
    <cds-code-snippet
      type="single"
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
      >yarn add @carbon/reacttooltip-content="Copy to Clipboard"
    </cds-code-snippet>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-code-snippet`]: () => ({
      copyButtonDescription: textNullable(
        'Copy button description',
        'Copy to clipboard'
      ),
      copyText: textNullable('Copy text', ''),
      disabled: boolean('Disabled', false),
      feedback: textNullable('Feedback', ''),
      feedbackTimeout: number('Feedback timeout', 0),
      hideCopyButton: boolean('Hide copy button', false),
      maxCollapsedNumberOfRows: number('Max collapsed number of rows', 15),
      maxExpandeddNumberOfRows: number('Max expanded number of rows', 0),
      minCollapsedNumberOfRows: number('Min collapsed number of rows', 3),
      minExpandeddNumberOfRows: number('Min expanded number of rows', 16),
      showLessText: textNullable('Show less text', 'Show less'),
      showMoreText: textNullable('Show more text', 'Show more'),
      wrapText: boolean('Wrap text', false),
    }),
  },
};

export default {
  title: 'Components/Code snippet',
  parameters: {
    ...storyDocs.parameters,
  },
};
