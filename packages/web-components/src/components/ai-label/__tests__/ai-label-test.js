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

  it('should use the ai-text attribute to set the AI label text', async () => {
    const el = await fixture(html`<cds-ai-label ai-text="IA"></cds-ai-label>`);
    const textSpan = el.shadowRoot.querySelector('.cds--slug__text');
    expect(textSpan.textContent).to.equal('IA');
  });

  it('should render ai-text-label if kind is inline', async () => {
    const el = await fixture(
      html`<cds-ai-label
        kind="inline"
        ai-text-label="Test text"></cds-ai-label>`
    );
    const additionalTextSpan = el.shadowRoot.querySelector(
      '.cds--slug__additional-text'
    );

    expect(additionalTextSpan).to.exist;
    expect(additionalTextSpan.textContent.trim()).to.equal('Test text');
  });

  it('should not render ai-text-label if kind is not inline', async () => {
    const el = await fixture(
      html`<cds-ai-label ai-text-label="Test text"></cds-ai-label>`
    );
    const additionalTextSpan = el.shadowRoot.querySelector(
      '.cds--slug__additional-text'
    );
    expect(additionalTextSpan).to.not.exist;
  });

  it('should set the appropriate class when kind is inline', async () => {
    const el = await fixture(html`<cds-ai-label kind="inline"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button).to.have.class('cds--slug__button--inline');
  });

  it('should set the appropriate class for the given size', async () => {
    const el = await fixture(html`<cds-ai-label size="xl"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button).to.have.class('cds--slug__button--xl');
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

  it('should render icon button if revert-active attribute is true', async () => {
    const el = await fixture(html`<cds-ai-label revert-active></cds-ai-label>`);
    const iconButton = el.shadowRoot.querySelector('cds-icon-button');
    const tooltipButton = el.shadowRoot.querySelector('.cds--slug__button');

    expect(el.revertActive).to.be.true;
    expect(iconButton).to.exist;
    expect(tooltipButton).to.not.exist;
  });

  it('should use the revert-label attribute for the revert button tooltip', async () => {
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

  it('should use default revert label if revert-label is not provided', async () => {
    const el = await fixture(html`<cds-ai-label revert-active></cds-ai-label>`);
    const tooltipContent = el.shadowRoot.querySelector(
      'span[slot="tooltip-content"]'
    );
    expect(tooltipContent.textContent.trim()).to.equal('Revert to AI input');
  });

  it('should set aria-label using button-label attribute', async () => {
    const el = await fixture(
      html`<cds-ai-label
        ai-text="AI"
        button-label="Custom info"></cds-ai-label>`
    );
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button.getAttribute('aria-label')).to.equal('AI - Custom info');
  });

  it('should use default button label if button-label is not provided', async () => {
    const el = await fixture(html`<cds-ai-label ai-text="AI"></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button.getAttribute('aria-label')).to.equal('AI - Show information');
  });

  it('should add inline-with-content class when kind is inline and ai-text-label is provided', async () => {
    const el = await fixture(
      html`<cds-ai-label
        kind="inline"
        ai-text-label="Text here"></cds-ai-label>`
    );
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    expect(button).to.have.class('cds--slug__button--inline-with-content');
  });

  it('should render body text content when provided via body-text slot', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">Custom body content</div>
      </cds-ai-label>
    `);

    const bodySlot = el.shadowRoot.querySelector('slot[name="body-text"]');
    const assigned = bodySlot.assignedNodes({ flatten: true });

    const bodyContent = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.textContent.includes('Custom body content')
    );
    expect(bodyContent).to.exist;
  });

  it('should render action elements when provided via actions slot', async () => {
    const el = await fixture(html`
      <cds-ai-label>
        <div slot="body-text">Content</div>
        <button slot="actions">Action Button</button>
      </cds-ai-label>
    `);

    const actionsSlot = el.shadowRoot.querySelector('slot[name="actions"]');
    const assigned = actionsSlot.assignedNodes({ flatten: true });

    const actionButton = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'button'
    );
    expect(actionButton).to.exist;
  });

  it('should have no Axe violations', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    await expect(el).to.be.accessible();
  });
});
