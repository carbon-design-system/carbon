/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/copy-button/index.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';

describe('CopyButton kind and size', () => {
  it('should show feedback with an explicit kind and size', async () => {
    const el = await fixture(html`
      <cds-copy-button kind="secondary" size="sm" feedback="Copied snippet">
        Copy to clipboard
      </cds-copy-button>
    `);
    const copy = el.shadowRoot.querySelector('cds-copy');
    await copy.updateComplete;
    copy.shadowRoot.querySelector('button').click();

    await waitUntil(() => {
      return (
        copy.shadowRoot
          .querySelector('cds-tooltip-content')
          .textContent.trim() === 'Copied snippet'
      );
    });
  });

  it('should retain the default copy-button styling and large size', async () => {
    const el = await fixture(html`<cds-copy-button>Copy</cds-copy-button>`);
    const copy = el.shadowRoot.querySelector('cds-copy');
    await copy.updateComplete;
    const button = copy.shadowRoot.querySelector('button');

    expect(el.kind).to.be.undefined;
    expect(button).to.have.class('cds--copy-btn');
    expect(getComputedStyle(button).height).to.equal('48px');
  });

  ['sm', 'md', 'lg'].forEach((size, index) => {
    it(`should render the ${size} size`, async () => {
      const el = await fixture(html`
        <cds-copy-button size=${size}>Copy</cds-copy-button>
      `);
      const copy = el.shadowRoot.querySelector('cds-copy');
      await copy.updateComplete;
      const button = copy.shadowRoot.querySelector('button');

      expect(getComputedStyle(button).height).to.equal(`${32 + index * 8}px`);
      expect(getComputedStyle(button).width).to.equal(`${32 + index * 8}px`);
    });
  });

  [
    'primary',
    'secondary',
    'tertiary',
    'ghost',
    'danger',
    'danger-tertiary',
    'danger-ghost',
  ].forEach((kind) => {
    it(`should match the ${kind} icon-button colors`, async () => {
      const el = await fixture(html`
        <cds-copy-button kind=${kind} size="sm" button-class-name="extra-class"
          >Copy</cds-copy-button
        >
      `);
      const reference = await fixture(html`
        <cds-icon-button kind=${kind} size="sm">
          <svg slot="icon" width="16" height="16" fill="currentColor"></svg>
          <span slot="tooltip-content">Copy</span>
        </cds-icon-button>
      `);
      const copy = el.shadowRoot.querySelector('cds-copy');
      await copy.updateComplete;
      await reference.updateComplete;
      const button = copy.shadowRoot.querySelector('button');
      const referenceButton = reference.shadowRoot.querySelector('button');
      const buttonStyle = getComputedStyle(button);
      const referenceStyle = getComputedStyle(referenceButton);
      const icon = el.shadowRoot.querySelector('svg');

      expect(button).not.to.have.class('cds--copy-btn');
      expect(button).to.have.class('extra-class');
      expect(buttonStyle.backgroundColor).to.equal(
        referenceStyle.backgroundColor
      );
      expect(buttonStyle.color).to.equal(referenceStyle.color);
      expect(getComputedStyle(icon).fill).to.equal(
        getComputedStyle(reference.querySelector('svg')).fill
      );
    });
  });

  it('should update kind and size and restore the default styling', async () => {
    const el = await fixture(html`<cds-copy-button>Copy</cds-copy-button>`);
    const copy = el.shadowRoot.querySelector('cds-copy');
    el.kind = 'ghost';
    el.size = 'sm';
    await el.updateComplete;
    await copy.updateComplete;
    const button = copy.shadowRoot.querySelector('button');

    expect(button).to.have.class('cds--btn--ghost');
    expect(getComputedStyle(button).height).to.equal('32px');
    expect(button).not.to.have.class('cds--copy-btn');

    el.kind = undefined;
    el.size = 'lg';
    await el.updateComplete;
    await copy.updateComplete;

    expect(button).to.have.class('cds--copy-btn');
    expect(getComputedStyle(button).height).to.equal('48px');
  });

  it('should remain accessible with an explicit kind and size', async () => {
    const el = await fixture(html`
      <cds-copy-button kind="ghost" size="sm"
        >Copy to clipboard</cds-copy-button
      >
    `);
    const copy = el.shadowRoot.querySelector('cds-copy');
    await copy.updateComplete;

    await expect(el).to.be.accessible();
  });

  it('should preserve disabled behavior with an explicit kind', async () => {
    const el = await fixture(html`
      <cds-copy-button kind="primary" size="sm" disabled>Copy</cds-copy-button>
    `);
    const copy = el.shadowRoot.querySelector('cds-copy');
    await copy.updateComplete;
    const button = copy.shadowRoot.querySelector('button');

    expect(button.disabled).to.be.true;
    expect(getComputedStyle(el.shadowRoot.querySelector('svg')).fill).to.equal(
      getComputedStyle(button).color
    );
  });
});
