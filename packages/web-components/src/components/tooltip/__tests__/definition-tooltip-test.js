/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/tooltip/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('cds-definition-tooltip', () => {
  it('should support a custom class', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip class="test-class">
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip data-testid="test-id">
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
      >
    `);

    expect(el).to.have.attribute('data-testid', 'test-id');
  });

  it('should display the definition when clicked', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');

    expect(trigger).to.have.attribute('aria-expanded', 'false');

    trigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'true');
  });

  it('should display the definition when focused', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');

    expect(trigger).to.have.attribute('aria-expanded', 'false');

    trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'true');
  });

  it('should support initially showing the definition-tooltip with `defaultOpen`', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip default-open>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
      >
    `);

    expect(el.shadowRoot.querySelector('button')).to.have.attribute(
      'aria-expanded',
      'true'
    );
  });

  it('should close the definition when Escape is clicked', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip default-open>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');
    expect(trigger).to.have.attribute('aria-expanded', 'true');

    // press Escape
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      })
    );

    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'false');
  });

  it('should close the definition when the trigger is blurred', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip default-open>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');
    expect(trigger).to.have.attribute('aria-expanded', 'true');

    trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }));

    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'false');
  });

  it('should close on mouseleave', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip default-open>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');
    expect(trigger).to.have.attribute('aria-expanded', 'true');

    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'false');
  });

  it('should open on hover when `open-on-hover` is true', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip open-on-hover>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');
    expect(trigger).to.have.attribute('aria-expanded', 'false');

    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'true');
  });

  it('should not open on hover by default', async () => {
    const el = await fixture(html`
      <cds-definition-tooltip>
        <span slot="definition">Example definition</span>
        URL
      </cds-definition-tooltip>
    `);

    const trigger = el.shadowRoot.querySelector('button');
    expect(trigger).to.have.attribute('aria-expanded', 'false');

    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    await el.updateComplete;

    expect(trigger).to.have.attribute('aria-expanded', 'false');
  });
});
