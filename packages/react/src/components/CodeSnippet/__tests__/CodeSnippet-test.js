/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CodeSnippet from '../';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'copy-to-clipboard';

const mockUseResizeObserver = jest.fn();

jest.mock('copy-to-clipboard', () => jest.fn());

jest.mock('../../../internal/useResizeObserver', () => ({
  useResizeObserver: (args) => mockUseResizeObserver(args),
}));

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
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",`;

const triggerResizeObserver = () => {
  const latestCall =
    mockUseResizeObserver.mock.calls[
      mockUseResizeObserver.mock.calls.length - 1
    ];

  act(() => {
    latestCall[0].onResize();
  });
};

beforeEach(() => {
  copy.mockClear();
  mockUseResizeObserver.mockClear();
});

describe('CodeSnippet', () => {
  it('should use the appropriate snippet class when it is type single', () => {
    render(
      <CodeSnippet type="single" data-testid="code-1">
        {single}
      </CodeSnippet>
    );
    expect(screen.getByTestId('code-1')).toHaveClass('cds--snippet--single');
  });

  it('should default to the single snippet type when `type` is not provided', () => {
    render(<CodeSnippet>{single}</CodeSnippet>);

    triggerResizeObserver();

    expect(screen.getByRole('textbox')).toHaveClass('cds--snippet-container', {
      exact: true,
    });
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
    render(
      <CodeSnippet type="inline" data-testid="code-5" className="custom-class">
        {inline}
      </CodeSnippet>
    );
    // note: outermost component is a Tooltip
    expect(screen.getByTestId('code-5')).toHaveClass('custom-class');
  });

  it('should allow hiding the copy button', () => {
    render(
      <CodeSnippet type="single" hideCopyButton>
        {single}
      </CodeSnippet>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should allow hiding the copy button for inline snippets', () => {
    render(
      <CodeSnippet type="inline" hideCopyButton>
        {inline}
      </CodeSnippet>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(inline).tagName).toBe('CODE');
  });

  it('should set disabled on copy button if it is passed via props', () => {
    render(
      <CodeSnippet type="single" disabled>
        {single}
      </CodeSnippet>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should use fallback container attributes when `type` is not recognized', () => {
    const { container } = render(
      <CodeSnippet aria-label={null} type="other">
        {single}
      </CodeSnippet>
    );

    triggerResizeObserver();

    const snippetContainer = container.querySelector('.cds--snippet-container');

    expect(snippetContainer).not.toHaveAttribute('role');
    expect(snippetContainer).toHaveAttribute('aria-label', 'code-snippet');
    expect(snippetContainer).not.toHaveAttribute('aria-readonly');
  });

  it('should omit collapsed inline styles when collapsed row limits are zero', () => {
    render(
      <CodeSnippet
        type="multi"
        maxCollapsedNumberOfRows={0}
        minCollapsedNumberOfRows={0}>
        {multiLong}
      </CodeSnippet>
    );

    const textBox = screen.getByRole('textbox');

    expect(textBox.style.maxHeight).toBe('');
    expect(textBox.style.minHeight).toBe('');
  });
});

describe('CodeSnippet events', () => {
  it('should call the click handler when the copy button is clicked', async () => {
    const onClick = jest.fn();
    render(
      <CodeSnippet type="single" onClick={onClick}>
        {single}
      </CodeSnippet>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should copy text when the copy button is clicked without an `onClick` handler', async () => {
    render(
      <CodeSnippet copyText="copied value" type="single">
        {single}
      </CodeSnippet>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(copy).toHaveBeenCalledWith('copied value');
  });

  it('should call the click handler with type inline', async () => {
    const onClick = jest.fn();
    render(
      <CodeSnippet type="inline" data-testid="code-6" onClick={onClick}>
        {inline}
      </CodeSnippet>
    );

    const button = screen.getByTestId('code-6');
    await userEvent.click(button);
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

  it('should show, expand, collapse, and hide the multi-line toggle based on measured height', async () => {
    render(
      <CodeSnippet
        type="multi"
        maxCollapsedNumberOfRows={3}
        maxExpandedNumberOfRows={5}
        minExpandedNumberOfRows={4}>
        {multiLong}
      </CodeSnippet>
    );

    const textBox = screen.getByRole('textbox');
    const code = textBox.querySelector('code');
    const getBoundingClientRectSpy = jest
      .spyOn(code, 'getBoundingClientRect')
      .mockReturnValue({ height: 80 });

    triggerResizeObserver();

    await userEvent.click(screen.getByRole('button', { name: 'Show more' }));

    expect(
      screen.getByRole('button', { name: 'Show less' })
    ).toBeInTheDocument();
    expect(textBox).toHaveStyle({ maxHeight: '80px', minHeight: '64px' });

    getBoundingClientRectSpy.mockReturnValue({ height: 50 });
    triggerResizeObserver();

    expect(
      screen.getByRole('button', { name: 'Show more' })
    ).toBeInTheDocument();

    getBoundingClientRectSpy.mockReturnValue({ height: 32 });
    triggerResizeObserver();

    expect(
      screen.queryByRole('button', { name: 'Show more' })
    ).not.toBeInTheDocument();
  });

  it('should omit expanded inline styles when expanded row limits are zero', async () => {
    render(
      <CodeSnippet
        type="multi"
        maxCollapsedNumberOfRows={3}
        maxExpandedNumberOfRows={0}
        minExpandedNumberOfRows={0}>
        {multiLong}
      </CodeSnippet>
    );

    const textBox = screen.getByRole('textbox');
    const code = textBox.querySelector('code');

    jest.spyOn(code, 'getBoundingClientRect').mockReturnValue({ height: 80 });

    triggerResizeObserver();

    await userEvent.click(screen.getByRole('button', { name: 'Show more' }));

    expect(textBox.style.maxHeight).toBe('');
    expect(textBox.style.minHeight).toBe('');
  });
});
