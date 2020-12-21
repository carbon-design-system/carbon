/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';
import mdx from './CodeSnippet.mdx';

export default {
  title: 'CodeSnippet',
  component: CodeSnippet,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const inline = () => (
  <CodeSnippet type="inline" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const multiline = () => (
  <CodeSnippet {...props()} type="multi" feedback="Copied to clipboard">
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

const props = () => ({
  type: select(
    'Type',
    {
      inline: 'inline',
      'single line': 'single',
      'multiple line': 'multi',
    },
    'inline'
  ),
  light: boolean('Light variant', false),
  feedback: text('Feedback text', 'Copied to clipboard'),
  showMoreText: text('Text for "show more" button', 'Show more'),
  showLessText: text('Text for "show less" button', 'Show less'),
  hideCopyButton: boolean('Hide copy button', false),
  onClick: action('onClick'),
  copyButtonDescription: text('Copy button title', 'Copy code snippet'),
  ariaLabel: text('ARIA label', 'Container label'),
  wrapText: boolean('Wrap text', true),
});

export const playground = () => (
  <div className={props().light ? 'bx--tile' : ''}>
    {props().light && lightPropMessage}
    <CodeSnippet {...props()}>
      {props().type === 'multi'
        ? `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);
}`
        : 'node -v'}
    </CodeSnippet>
  </div>
);
