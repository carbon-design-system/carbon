/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'carbon-components/scss/globals/scss/styles.scss';

import React from 'react';
import { mount } from '@cypress/react';
import { default as CodeSnippet } from '../CodeSnippet';
import { default as CodeSnippetSkeleton } from '../CodeSnippet.Skeleton';

describe('CodeSnippet', () => {
  beforeEach(() => {
    mount(
      <>
        <CodeSnippet
          className="some-class"
          type="single"
          style={{ marginBottom: 8 }}>
          {'node -v'}
        </CodeSnippet>

        <CodeSnippet
          type="inline"
          feedback="Copied to clipboard"
          style={{ marginBottom: 8 }}>
          {'node -v'}
        </CodeSnippet>

        <CodeSnippet
          type="multi"
          feedback="Copied to clipboard"
          style={{ marginBottom: 8 }}>
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

        <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
        <CodeSnippetSkeleton type="multi" style={{ marginBottom: 8 }} />
      </>
    );
  });

  it('should render', () => {
    cy.findAllByText(/node/).should('be.visible');
    cy.findAllByText(/Show more/).should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });

  it('should render expanded snippet on show more', () => {
    cy.findAllByText(/Show more/)
      .should('be.visible')
      .first()
      .click();
    cy.findAllByText(/Show less/)
      .first()
      .should('be.visible');

    // snapshots should always be taken _after_ an assertion that
    // a element/component should be visible. This is to ensure
    // the DOM has settled and the element has fully loaded.
    cy.percySnapshot();
  });
});

// https://github.com/cypress-io/cypress/issues/8418
const resizeObserverLoopErrRe = /^ResizeObserver loop limit exceeded/;
cy.on('uncaught:exception', (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  }
});
