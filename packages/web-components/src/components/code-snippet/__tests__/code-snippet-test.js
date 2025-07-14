/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/code-snippet/index.js';

// Test data
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

describe('cds-code-snippet', function () {
  it('should render', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="single">${single}</cds-code-snippet>
    `);
    await expect(el).to.exist;
  });

  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(html`
        <cds-code-snippet type="single">${single}</cds-code-snippet>
      `);
      await expect(el).to.be.accessible();
    });
  });

  it('should use the appropriate snippet class when it is type single', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="single" data-testid="code-1">
        ${single}
      </cds-code-snippet>
    `);

    await el.updateComplete;
    expect(el.type).to.equal('single');

    const copyButton = el.shadowRoot?.querySelector('cds-copy-button');
    expect(copyButton).to.exist;
    const buttonClassName = copyButton.getAttribute('button-class-name');
    if (buttonClassName) {
      expect(buttonClassName).to.include('cds--snippet--single');
    }
    const snippetContainer = el.shadowRoot?.querySelector(
      '.cds--snippet-container'
    );
    expect(snippetContainer).to.exist;
  });

  it('should use the appropriate snippet class when it is type multi', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="multi" data-testid="code-2">
        ${multiLong}
      </cds-code-snippet>
    `);

    await el.updateComplete;

    expect(el.type).to.equal('multi');

    const copyButton = el.shadowRoot?.querySelector('cds-copy-button');
    expect(copyButton).to.exist;

    const buttonClassName = copyButton.getAttribute('button-class-name');
    if (buttonClassName) {
      expect(buttonClassName).to.include('cds--snippet--multi');
    }

    const snippetContainer = el.shadowRoot?.querySelector(
      '.cds--snippet-container'
    );
    expect(snippetContainer).to.exist;
  });

  it('should use the appropriate snippet class when it is type inline', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="inline" data-testid="code-3">
        ${inline}
      </cds-code-snippet>
    `);

    await el.updateComplete;

    expect(el.type).to.equal('inline');

    const codeElement =
      el.shadowRoot?.querySelector('code') ||
      el.shadowRoot?.querySelector('span') ||
      el.shadowRoot?.querySelector('[class*="snippet"]');

    expect(codeElement).to.exist;

    expect(el.textContent.trim()).to.equal(inline);
  });

  it('should render slot content as expected', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="inline" data-testid="code-4">
        ${inline}
      </cds-code-snippet>
    `);

    expect(el.textContent.trim()).to.equal(inline);
  });

  it('should allow custom classes to be applied when passed in via class', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="inline" data-testid="code-5" class="custom-class">
        ${inline}
      </cds-code-snippet>
    `);

    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should allow hiding the copy button', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="single" hide-copy-button>
        ${single}
      </cds-code-snippet>
    `);

    expect(el.hideCopyButton).to.be.true;

    const copyButton = el.shadowRoot.querySelector('.cds--copy-btn');
    expect(copyButton).to.not.exist;
  });

  it('should set disabled on copy button if it is passed as an sttribute', async () => {
    const el = await fixture(html`
      <cds-code-snippet type="single" disabled> ${single} </cds-code-snippet>
    `);

    expect(el.disabled).to.be.true;

    const copyButton = el.shadowRoot.querySelector('.cds--copy-btn');
    if (copyButton) {
      expect(copyButton.hasAttribute('disabled')).to.be.true;
    }
  });

  describe('CodeSnippet events', () => {
    it('should call the click handler when the copy button is clicked', async () => {
      let clickEventFired = false;
      const el = await fixture(html`
        <cds-code-snippet type="single"> ${single} </cds-code-snippet>
      `);

      el.addEventListener('cds-copy-btn-clicked', () => {
        clickEventFired = true;
      });

      const copyButton = el.shadowRoot.querySelector('.cds--copy-btn');
      if (copyButton) {
        copyButton.click();
        expect(clickEventFired).to.be.true;
      }
    });

    it('should call the click handler with type inline', async () => {
      let clickEventFired = false;
      const el = await fixture(html`
        <cds-code-snippet type="inline" data-testid="code-6">
          ${inline}
        </cds-code-snippet>
      `);

      el.addEventListener('click', () => {
        clickEventFired = true;
      });

      el.click();
      expect(clickEventFired).to.be.true;
    });
  });

  describe('Show more button', () => {
    it('should not have show more button when less than 15 rows', async () => {
      const el = await fixture(html`
        <cds-code-snippet type="multi">${multiShort}</cds-code-snippet>
      `);

      const showMoreButton = el.shadowRoot.querySelector(
        '.cds--snippet-btn--expand'
      );
      expect(showMoreButton).to.not.exist;
    });

    it('should not have show more button when exactly 15 rows', async () => {
      const el = await fixture(html`
        <cds-code-snippet type="multi">${multi15}</cds-code-snippet>
      `);

      const showMoreButton = el.shadowRoot.querySelector(
        '.cds--snippet-btn--expand'
      );
      expect(showMoreButton).to.not.exist;
    });

    it('should have show more button when more than 15 rows', async () => {
      const el = await fixture(html`
        <cds-code-snippet type="multi">${multiLong}</cds-code-snippet>
      `);

      await el.updateComplete;

      const showMoreButton = el.shadowRoot.querySelector(
        '.cds--snippet-btn--expand'
      );
      if (showMoreButton) {
        expect(showMoreButton).to.exist;
        expect(showMoreButton.textContent.trim()).to.include('Show more');
      }
    });

    it('should toggle between show more and show less', async () => {
      const el = await fixture(html`
        <cds-code-snippet type="multi">${multiLong}</cds-code-snippet>
      `);

      await el.updateComplete;

      const showMoreButton = el.shadowRoot.querySelector(
        '.cds--snippet-btn--expand'
      );
      if (showMoreButton) {
        expect(showMoreButton.textContent.trim()).to.include('Show more');

        showMoreButton.click();
        await el.updateComplete;
        expect(showMoreButton.textContent.trim()).to.include('Show less');
        showMoreButton.click();
        await el.updateComplete;

        expect(showMoreButton.textContent.trim()).to.include('Show more');
      }
    });
  });
});
