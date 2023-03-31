/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CodeSnippet from '../';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('copy-to-clipboard', () => {
  return jest.fn();
});

const inline = `node -v`;

const single = `yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest`;

const multiLong = `  "scripts": {
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
  `;

const multiShort = `  "scripts": {
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
  },`;

const multi15 = `  "scripts": {
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
    "react": "~16.9.0",`;

describe('CodeSnippet', () => {
  it('should use the appropriate snippet class when it is type single', () => {
    render(
      <CodeSnippet type="single" data-testid="code-1">
        {single}
      </CodeSnippet>
    );
    expect(screen.getByTestId('code-1')).toHaveClass('cds--snippet--single');
  });

  it('should use the appropriate snippet class when it is type multi', () => {
    render(
      <CodeSnippet type="multi" data-testid="code-2">
        {multiLong}
      </CodeSnippet>
    );

    expect(screen.getByTestId('code-2')).toHaveClass('cds--snippet--multi');
  });

  it('should use the appropriate snippet class when it is type inline', () => {
    render(
      <CodeSnippet type="inline" data-testid="code-3">
        {inline}
      </CodeSnippet>
    );

    expect(screen.getByTestId('code-3')).toHaveClass('cds--snippet--inline');
  });

  it('should render children as expected', () => {
    render(
      <CodeSnippet type="inline" data-testid="code-4">
        {inline}
      </CodeSnippet>
    );

    expect(screen.getByTestId('code-4')).toHaveTextContent(inline);
  });

  it('should allow custom classes to be applied when passed in via className', () => {
    const { container } = render(
      <CodeSnippet type="inline" data-testid="code-5" className="custom-class">
        {inline}
      </CodeSnippet>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should allow hiding the copy button', () => {
    render(
      <CodeSnippet type="single" hideCopyButton>
        {single}
      </CodeSnippet>
    );

    expect(document.querySelector('button')).not.toBeInTheDocument();
  });

  it('should set disabled on copy button if it is passed via props', () => {
    render(
      <CodeSnippet type="single" disabled>
        {single}
      </CodeSnippet>
    );

    expect(document.querySelector('button')).toHaveAttribute('disabled');
  });
});

describe('CodeSnippet events', () => {
  it('should call the click handler when the copy button is clicked', () => {
    const onClick = jest.fn();
    render(
      <CodeSnippet type="single" onClick={onClick}>
        {single}
      </CodeSnippet>
    );

    const button = document.querySelector('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should call the click handler with type inline', () => {
    const onClick = jest.fn();
    render(
      <CodeSnippet type="inline" data-testid="code-6" onClick={onClick}>
        {inline}
      </CodeSnippet>
    );

    const button = screen.getByTestId('code-6');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Show more button', () => {
  it('should not have show more button when less then 15 rows', () => {
    render(<CodeSnippet type="multi">{multiShort}</CodeSnippet>);

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });

  it('should not have show more button when exactly 15 rows', () => {
    render(<CodeSnippet type="multi">{multi15}</CodeSnippet>);

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });
});
