/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/ai-label/index.js';

describe('cds-ai-label', function () {
  it('should render', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    expect(el).to.exist;
  });

  it('should pass in extra classes that are passed via class', async () => {
    const el = await fixture(
      html`<cds-ai-label class="custom-class"></cds-ai-label>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should render children as expected', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">Test content</div>
      </cds-ai-label>
    `);
    const bodySlot = el.shadowRoot.querySelector('slot[name="body-text"]');
    expect(bodySlot).to.exist;
  });

  it('should respect aiText prop', async () => {
    const el = await fixture(html`<cds-ai-label ai-text="IA"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    const textSpan = button.querySelector('.cds--slug__text');

    expect(textSpan.textContent).to.equal('IA');
  });

  it('should not render ai-text-label when kind is not inline', async () => {
    const el = await fixture(
      html`<cds-ai-label ai-text-label="Test text"></cds-ai-label>`
    );
    const additionalTextSpan = el.shadowRoot.querySelector(
      '.cds--slug__additional-text'
    );

    expect(additionalTextSpan).to.not.exist;
  });

  it('should respect kind prop', async () => {
    const el = await fixture(html`<cds-ai-label kind="inline"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    expect(button).to.have.class('cds--slug__button--inline');
  });

  it('should respect revertActive prop when initially set', async () => {
    const el = await fixture(html`<cds-ai-label revert-active></cds-ai-label>`);
    const iconButton = el.shadowRoot.querySelector('cds-icon-button');

    expect(el.revertActive).to.be.true;
    expect(iconButton).to.exist;
  });

  it('should respect revertLabel prop', async () => {
    const el = await fixture(
      html`<cds-ai-label
        revert-active
        revert-label="Custom revert label"></cds-ai-label>`
    );
    const tooltipContent = el.shadowRoot.querySelector(
      'span[slot="tooltip-content"]'
    );

    expect(tooltipContent.textContent.trim()).to.equal('Custom revert label');
  });

  it('should respect size prop', async () => {
    const el = await fixture(html`<cds-ai-label size="xl"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    expect(button).to.have.class('cds--slug__button--xl');
  });

  it('should have correct aria-label on button', async () => {
    const el = await fixture(
      html`<cds-ai-label ai-text="AI" button-label="Show info"></cds-ai-label>`
    );
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    expect(button.getAttribute('aria-label')).to.equal('AI - Show info');
  });

  it('should toggle visibility on click', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    button.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    button.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should render body text when provided via slot', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">Custom body content</div>
      </cds-ai-label>
    `);
    const bodySlot = el.shadowRoot.querySelector('slot[name="body-text"]');
    expect(bodySlot).to.exist;
  });

  it('should render actions when provided via slot', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">Content</div>
        <button slot="actions">Action Button</button>
      </cds-ai-label>
    `);
    const actionsSlot = el.shadowRoot.querySelector('slot[name="actions"]');
    expect(actionsSlot).to.exist;
  });

  it('should support different size values', async () => {
    const sizes = ['mini', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

    for (const size of sizes) {
      const el = await fixture(
        html`<cds-ai-label size="${size}"></cds-ai-label>`
      );
      expect(el.size).to.equal(size);

      const button = el.shadowRoot.querySelector('.cds--slug__button');
      expect(button).to.have.class(`cds--slug__button--${size}`);
    }
  });

  it('should have default property values', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);

    expect(el.aiText).to.equal('AI');
    expect(el.aiTextLabel).to.equal('');
    expect(el.kind).to.equal('');
    expect(el.revertActive).to.be.false;
    expect(el.revertLabel).to.equal('Revert to AI input');
    expect(el.size).to.equal('xs');
    expect(el.buttonLabel).to.equal('Show information');
  });

  it('should render inline with content class when kind is inline and has ai-text-label', async () => {
    const el = await fixture(
      html`<cds-ai-label
        kind="inline"
        ai-text-label="Text here"></cds-ai-label>`
    );
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    expect(button).to.have.class('cds--slug__button--inline-with-content');
  });

  it('should not render tooltip button when revert is active', async () => {
    const el = await fixture(html`<cds-ai-label revert-active></cds-ai-label>`);
    const tooltipButton = el.shadowRoot.querySelector('.cds--slug__button');
    const iconButton = el.shadowRoot.querySelector('cds-icon-button');

    expect(tooltipButton).to.not.exist;
    expect(iconButton).to.exist;
  });

  it('should close on Escape key', async () => {
    const el = await fixture(html`<cds-ai-label open></cds-ai-label>`);
    expect(el.open).to.be.true;

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    el.dispatchEvent(event);
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should close on focus out', async () => {
    const el = await fixture(html`<cds-ai-label open></cds-ai-label>`);
    const event = new FocusEvent('focusout', {
      relatedTarget: document.body,
    });
    el.dispatchEvent(event);
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should have no Axe violations', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">AI content</div>
      </cds-ai-label>
    `);
    await expect(el).to.be.accessible();
  });

  it('should have deprecated slot attribute with default value', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    expect(el.slot).to.equal('ai-label');
  });

  it('should use empty label for inline kind', async () => {
    const el = await fixture(
      html`<cds-ai-label
        kind="inline"
        ai-text="AI"
        ai-text-label="Text goes here"></cds-ai-label>`
    );
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button.getAttribute('aria-label')).to.equal('AI - Show information');
  });

  it('should set aria-label when kind is default', async () => {
    const el = await fixture(html`<cds-ai-label ai-text="AI"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    expect(button.getAttribute('aria-label')).to.equal('AI - Show information');
  });
});
