/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/toggle-tip/index.js';

describe('cds-toggletip', function () {
  it('should render', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);
    expect(el).to.exist;
  });

  it('should have no Axe violations', async () => {
    const el = await fixture(
      html`<cds-toggletip button-label="More info"
        >Toggle content</cds-toggletip
      >`
    );
    await expect(el).to.be.accessible();
  });

  it('should pass in extra classes that are passed via class', async () => {
    const el = await fixture(
      html`<cds-toggletip class="custom-class"></cds-toggletip>`
    );
    expect(el.classList.contains('custom-class')).to.be.true;
  });

  it('should not be open by default', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);
    expect(el.open).to.be.false;
  });

  it('should render trigger button by default', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);
    const button = el.shadowRoot.querySelector('.cds--toggletip-button');
    expect(button).to.exist;
  });

  it('should toggle visibility on click', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);
    const button = el.shadowRoot.querySelector('.cds--toggletip-button');

    button.click();
    await el.updateComplete;
    expect(el.open).to.be.true;

    button.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should close on Escape key', async () => {
    const el = await fixture(html`<cds-toggletip open></cds-toggletip>`);
    expect(el.open).to.be.true;

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    el.dispatchEvent(event);
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should close on focus out', async () => {
    const el = await fixture(html`<cds-toggletip open></cds-toggletip>`);
    const event = new FocusEvent('focusout', {
      relatedTarget: document.body,
    });
    el.dispatchEvent(event);
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should render body text when provided via slot', async () => {
    const el = await fixture(html`
      <cds-toggletip open>
        <span slot="body-text">Custom body text</span>
      </cds-toggletip>
    `);
    const bodySlot = el.shadowRoot.querySelector('slot[name="body-text"]');
    expect(bodySlot).to.exist;
  });

  it('should render actions when provided via slot', async () => {
    const el = await fixture(html`
      <cds-toggletip open>
        <div slot="actions">
          <button>Action</button>
        </div>
      </cds-toggletip>
    `);
    const actionsSlot = el.shadowRoot.querySelector('slot[name="actions"]');
    expect(actionsSlot).to.exist;
  });

  it('should add has-actions attribute when actions slot has content', async () => {
    const el = await fixture(html`
      <cds-toggletip>
        <div slot="actions"><button>Action</button></div>
      </cds-toggletip>
    `);
    const actionsSlot = el.shadowRoot.querySelector('slot[name="actions"]');
    actionsSlot.dispatchEvent(new Event('slotchange'));
    await el.updateComplete;

    expect(el.hasAttribute('has-actions')).to.be.true;
  });

  it('should support different alignment values', async () => {
    const alignments = ['top', 'bottom', 'left', 'right'];

    for (const alignment of alignments) {
      const el = await fixture(
        html`<cds-toggletip alignment="${alignment}"></cds-toggletip>`
      );
      expect(el.alignment).to.equal(alignment);
    }
  });

  it('should reflect open property to attribute', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);

    el.open = true;
    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.true;

    el.open = false;
    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('should reflect alignment property to attribute', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);

    el.alignment = 'bottom';
    await el.updateComplete;
    expect(el.getAttribute('alignment')).to.equal('bottom');
  });

  it('should render label content when provided via default slot', async () => {
    const el = await fixture(html`<cds-toggletip>Label Text</cds-toggletip>`);
    const labelSlot = el.shadowRoot.querySelector('.cds--toggletip-label slot');
    expect(labelSlot).to.exist;

    const assignedNodes = labelSlot.assignedNodes();
    const hasLabelText = assignedNodes.some(
      (node) => node.textContent && node.textContent.includes('Label Text')
    );
    expect(hasLabelText).to.be.true;
  });

  it('should render information icon in trigger button', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);
    const icon = el.shadowRoot.querySelector('.cds--toggletip-button svg');
    expect(icon).to.exist;
  });

  it('should render popover caret', async () => {
    const el = await fixture(html`<cds-toggletip open></cds-toggletip>`);
    const caret = el.shadowRoot.querySelector('.cds--popover-caret');
    expect(caret).to.exist;
  });

  it('should render different content structure based on autoalign', async () => {
    const el1 = await fixture(html`<cds-toggletip open></cds-toggletip>`);
    const nestedPopover = el1.shadowRoot.querySelector(
      '.cds--popover .cds--popover-content'
    );
    expect(nestedPopover).to.exist;

    const el2 = await fixture(
      html`<cds-toggletip autoalign open></cds-toggletip>`
    );
    const directContent = el2.shadowRoot.querySelector('.cds--popover-content');
    const noNestedPopover = el2.shadowRoot.querySelector(
      '.cds--popover .cds--popover-content'
    );

    expect(directContent).to.exist;
    expect(noNestedPopover).to.not.exist;
  });

  it('should have default property values', async () => {
    const el = await fixture(html`<cds-toggletip></cds-toggletip>`);

    expect(el.alignment).to.equal('top');
    expect(el.autoalign).to.be.false;
    expect(el.open).to.be.false;
  });

  it('should not close when focus stays within toggletip', async () => {
    const el = await fixture(html`<cds-toggletip open></cds-toggletip>`);
    const button = el.shadowRoot.querySelector('.cds--toggletip-button');
    const event = new FocusEvent('focusout', {
      relatedTarget: button,
    });
    el.dispatchEvent(event);
    await el.updateComplete;

    expect(el.open).to.be.true;
  });
});
