/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, triggerFocusFor } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/link/index.js';

describe('cds-link', function () {
  const basicLink = html`<cds-link href="https://carbondesignsystem.com"
    >test</cds-link
  >`;

  it('should render', async () => {
    const el = await fixture(basicLink);

    await expect(el).dom.to.equalSnapshot();
  });

  it('should render an <a> element', async () => {
    const el = await fixture(basicLink);
    const elA = el.shadowRoot.querySelector('a');

    expect(Array.from(elA.classList)).to.contain('cds--link');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should inherit the href property', async () => {
    const el = await fixture(basicLink);

    expect(el).to.have.attribute('href', 'https://carbondesignsystem.com');
  });

  it('should include child content', async () => {
    const child = 'test';
    const el = await fixture(
      html`<cds-link href="https://carbondesignsystem.com">${child}</cds-link>`
    );

    expect(el).to.have.text(child);
    await expect(el).dom.to.equalSnapshot();
  });

  // Custom classes are not yet supported in the web components version
  xit('should support a custom class on the element with a link role', async () => {
    const el = await fixture(
      html`<cds-link href="https://carbondesignsystem.com" class="custom-class"
        >test</cds-link
      >`
    );

    expect(Array.from(el.classList)).to.contain('custom-class');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should support being disabled', async () => {
    const el = await fixture(
      html`<cds-link href="https://carbondesignsystem.com" disabled
        >test</cds-link
      >`
    );
    // Disabled links should be rendered as <p> elements
    const elP = el.shadowRoot.querySelector('p');

    expect(el.hasAttribute('disabled'));
    expect(elP).to.exist;
    expect(Array.from(elP.classList)).to.contain('cds--link--disabled');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should support the inline link variant', async () => {
    const el = await fixture(
      html`<cds-link href="https://carbondesignsystem.com" inline
        >test</cds-link
      >`
    );
    const elA = el.shadowRoot.querySelector('a');

    expect(el.hasAttribute('inline'));
    expect(Array.from(elA.classList)).to.contain('cds--link--inline');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  // Not sure about this one. It will pass no matter what is passed
  // as the size attribute
  ['sm', 'md', 'lg'].forEach((size) => {
    it(`should support the ${size} size variant`, async () => {
      const el = await fixture(
        html`<cds-link href="https://carbondesignsystem.com" size="${size}"
          >test</cds-link
        >`
      );
      const elA = el.shadowRoot.querySelector('a');

      expect(el.hasAttribute('size', size));
      expect(Array.from(elA.classList)).to.contain(`cds--link--${size}`);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  // The target attribute is not yet customizable in the web components version
  xit('should add rel="noopener" automatically if target="_blank"', async () => {
    const el = await fixture(
      html`<cds-link href="https://carbondesignsystem.com" target="_blank"
        >test</cds-link
      >`
    );
    const elA = el.shadowRoot.querySelector('a');

    expect(elA.hasAttribute('target', '_blank'));
    expect(elA.hasAttribute('rel', 'noopener'));
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should receive keyboard focus', async () => {
    const el = await fixture(basicLink);

    await triggerFocusFor(el);
    expect(document.activeElement).to.equal(el);
  });

  it('should not receive keyboard focus when disabled', async () => {
    const el = await fixture(
      html`<cds-link href="/" disabled>A simple link</cds-link>`
    );

    expect(document.activeElement).to.equal(document.body);
    await sendKeys({ press: 'Tab' });
    expect(document.activeElement).to.equal(document.body);
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(basicLink);

      await expect(el).to.be.accessible();
    });
  });
});
