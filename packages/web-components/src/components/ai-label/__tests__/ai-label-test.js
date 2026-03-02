/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, nextFrame } from '@open-wc/testing';
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

  it('should close when clicking outside the component', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    document.body.appendChild(el);

    const button = el.shadowRoot.querySelector('.cds--slug__button');
    button.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    const handler = (e) => {
      const path = e.composedPath?.() || [];
      if (!path.includes(el)) {
        el.open = false;
      }
    };

    document.addEventListener('click', handler, true);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );

    await new Promise((r) => setTimeout(r, 10));
    expect(el.open).to.be.false;

    document.removeEventListener('click', handler, true);
    document.body.removeChild(outside);
    document.body.removeChild(el);
  });

  it('should not close when clicking inside the component', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    //Open
    button.click();

    const event = new MouseEvent('click', { bubbles: true, composed: true });
    button.dispatchEvent(event);

    expect(el.open).to.be.false;
  });

  it('should close when focus moves outside the component', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    document.body.appendChild(el);

    const button = el.shadowRoot.querySelector('.cds--slug__button');
    button.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    const handler = (e) => {
      if (!(e.target instanceof Node) || !el.contains(e.target)) {
        el.open = false;
      }
    };
    document.addEventListener('focusin', handler, true);

    const outside = document.createElement('input');
    document.body.appendChild(outside);
    outside.tabIndex = 0;
    outside.focus();

    const focusEvent = new FocusEvent('focusin', {
      bubbles: true,
      composed: true,
    });
    outside.dispatchEvent(focusEvent);

    await new Promise((r) => setTimeout(r, 10));
    expect(el.open).to.be.false;

    document.removeEventListener('focusin', handler, true);
    document.body.removeChild(outside);
    document.body.removeChild(el);
  });

  // a11y
  it('should remain open when focus stays inside, and retains focus', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');
    button.focus();
    button.click();
    expect(el.open).to.be.true;
    expect(document.activeElement).to.equal(el);
  });

  it('should close when Escape is pressed', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    // Open the label
    button.click();
    await el.updateComplete;

    const keyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      composed: true,
    });
    button.dispatchEvent(keyEvent);

    await nextFrame();
    expect(el.open).to.be.false;
  });

  it('should not close on Enter (but toggle works if coded that way)', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    const button = el.shadowRoot.querySelector('.cds--slug__button');

    button.focus();

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(el.open).to.be.false;
  });

  it('should handle focus change gracefully when target is not Node', async () => {
    const el = await fixture(html`<cds-ai-label></cds-ai-label>`);
    document.body.appendChild(el);

    const button = el.shadowRoot.querySelector('.cds--slug__button');
    button.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    const handler = (e) => {
      if (!(e.target instanceof Node) || !el.contains(e.target)) {
        el.open = false;
      }
    };
    document.addEventListener('focusin', handler, true);

    const fakeFocusEvent = new FocusEvent('focusin', {
      bubbles: true,
      composed: true,
    });
    Object.defineProperty(fakeFocusEvent, 'target', {
      value: 'non-node',
      writable: false,
    });

    document.dispatchEvent(fakeFocusEvent);
    await new Promise((r) => setTimeout(r, 10));
    expect(el.open).to.be.false;

    document.removeEventListener('focusin', handler, true);
    document.body.removeChild(el);
  });
});
