/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';
import mdx from './CodeSnippet.mdx';

export default {
  title: 'Components/CodeSnippet',
  component: CodeSnippet,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
    knobs: {
      escapeHTML: false,
    },
  },
};

const multiSnippet = `"scripts": {
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
    "@commitlint/cli": "^8.3.5",`;

const shortSnippet = `yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest`;

const inlineSnippet = `node -v`;

const snippetText = () => ({
  inline: text('Text to be displayed in the inline CodeSnippet', inlineSnippet),
  single: text(
    'Text to be displayed in the single-line CodeSnippet',
    shortSnippet
  ),
  multi: text(
    'Text to be displayed in the multi-line CodeSnippet',
    multiSnippet
  ),
});

const props = () => ({
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  feedback: text('Feedback text (feedback)', 'Copied'),
  feedbackTimeout: number('Feedback text timeout (feedbackTimeout)', 2000),
  showMoreText: text('Text for "show more" button (showMoreText)', 'Show more'),
  showLessText: text('Text for "show less" button (showLessText)', 'Show less'),
  hideCopyButton: boolean('Hide copy button (hideCopyButton)', false),
  onClick: action('onClick'),
  copyButtonDescription: text(
    'Copy button title (copyButtonDescription)',
    'Copy code snippet'
  ),
  ariaLabel: text('ARIA label (ariaLabel)', 'Container label'),
  wrapText: boolean('Wrap text (wrapText)', true),
  maxCollapsedNumberOfRows: number(
    'Maximum number of rows to be shown when collapsed (maxCollapsedNumberOfRows)',
    15
  ),
  maxExpandedNumberOfRows: number(
    'Maximum number of rows to be shown when expanded (maxExpandedNumberOfRows)',
    0
  ),
  minCollapsedNumberOfRows: number(
    'Minimum number of rows to be shown when collapsed (minCollapsedNumberOfRows)',
    3
  ),
  minExpandedNumberOfRows: number(
    'Minimum number of rows to be shown when expanded (minExpandedNumberOfRows)',
    16
  ),
});

export const inline = () => (
  <CodeSnippet type="inline" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const multiline = () => (
  <CodeSnippet type="multi" feedback="Copied to clipboard">
    {`  "scripts": {
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
    "@commitlint/cli": "^8.3.5",`}
  </CodeSnippet>
);

export const singleline = () => (
  <CodeSnippet type="single" feedback="Copied to clipboard">
    yarn add carbon-components@latest carbon-components-react@latest
    @carbon/icons-react@latest carbon-icons@latest
  </CodeSnippet>
);

export const skeleton = () => (
  <div>
    <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
    <CodeSnippetSkeleton type="multi" />
  </div>
);

const lightPropMessage = (
  <small style={{ display: 'block', paddingBottom: '1rem' }}>
    The snippet container should never be the same color as the page background.
    <br />
    {'Do not use the '}
    <CodeSnippet type="inline" light>
      light
    </CodeSnippet>
    {' variant on '}
    <CodeSnippet type="inline" light>
      $ui-background
    </CodeSnippet>
    {' or '}
    <CodeSnippet type="inline" light>
      $ui-02
    </CodeSnippet>
    .
  </small>
);

export const playground = () => (
  <div className={props().light ? 'bx--tile' : ''}>
    {props().light && lightPropMessage}
    <br />
    <h4>Inline snippet</h4>
    <br />
    <CodeSnippet type="inline" {...props()}>
      {snippetText().inline}
    </CodeSnippet>
    <br />
    <br />
    <h4>Single-line snippet</h4>
    <br />
    <CodeSnippet type="single" {...props()}>
      {snippetText().single}
    </CodeSnippet>

    <br />
    <h4>Multi-line snippet</h4>
    <br />
    <CodeSnippet type="multi" {...props()}>
      {snippetText().multi}
    </CodeSnippet>
  </div>
);
