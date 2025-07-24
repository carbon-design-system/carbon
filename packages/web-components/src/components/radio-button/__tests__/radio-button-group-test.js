/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/radio-button/index.js';
import { html, fixture, expect } from '@open-wc/testing';

describe('cds-radio-button-group', () => {
  it('should render `legend-text`', async () => {
    const el = await fixture(html`
      <cds-radio-button-group legend-text="test">
        <cds-radio-button></cds-radio-button>
        <cds-radio-button></cds-radio-button>
      </cds-radio-button-group>
    `);
    const legend = el.shadowRoot?.querySelector('legend');
    expect(legend).to.exist;
    expect(legend?.textContent).to.contain('test');
  });

  it('should render a <fieldset> wrapper', async () => {
    const el = await fixture(html`
      <cds-radio-button-group legend-text="test">
        <cds-radio-button></cds-radio-button>
        <cds-radio-button></cds-radio-button>
      </cds-radio-button-group>
    `);
    const fieldset = el.shadowRoot?.querySelector('fieldset');
    expect(fieldset).to.exist;
  });

  it('should render `legend-text` inside a <fieldset>', async () => {
    const el = await fixture(html`
      <cds-radio-button-group legend-text="test">
        <cds-radio-button></cds-radio-button>
        <cds-radio-button></cds-radio-button>
      </cds-radio-button-group>
    `);
    const legend = el.shadowRoot?.querySelector('legend');
    expect(legend, 'legend should exist').to.exist;
    expect(legend?.textContent).to.contain('test');
    const fieldset = legend?.closest('fieldset');
    expect(fieldset, 'legend should be inside a fieldset').to.exist;
  });

  it('should render <cds-radio-button> children', async () => {
    const el = await fixture(html`
      <cds-radio-button-group>
        <cds-radio-button value="test-1"></cds-radio-button>
        <cds-radio-button value="test-2"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb1 = el.querySelector(`cds-radio-button[value="test-1"]`);
    const rb2 = el.querySelector(`cds-radio-button[value="test-2"]`);
    expect(rb1).to.exist;
    expect(rb2).to.exist;
  });

  it('supports a custom class', async () => {
    const el = await fixture(html`
      <cds-radio-button-group class="test-class">
        <cds-radio-button></cds-radio-button>
        <cds-radio-button></cds-radio-button
      ></cds-radio-button-group>
    `);
    expect(el.classList.contains('test-class')).to.be.true;
  });

  it('disables the <fieldset> when disabled', async () => {
    const el = await fixture(html`
      <cds-radio-button-group disabled>
        <cds-radio-button></cds-radio-button>
        <cds-radio-button></cds-radio-button>
      </cds-radio-button-group>
    `);
    const fieldset = el.shadowRoot?.querySelector('fieldset');
    expect(fieldset.disabled).to.be.true;
  });

  it('respects disabled to prevent changes', async () => {
    const el = await fixture(html`
      <cds-radio-button-group disabled>
        <cds-radio-button value="test-1"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb = el.querySelector(`cds-radio-button[value="test-1"]`);
    expect(rb?.checked).to.be.false;

    // attempt user click
    rb?.click();
    await el.updateComplete;

    expect(rb?.checked).to.be.false;
  });

  it('respects readOnly to prevent changes', async () => {
    const el = await fixture(html`
      <cds-radio-button-group readonly>
        <cds-radio-button value="test-1"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb = el.querySelector(`cds-radio-button[value="test-1"]`);
    expect(rb?.checked).to.be.false;

    // attempt user click
    rb?.click();
    await el.updateComplete;

    expect(rb?.checked).to.be.false;
  });

  it('selects initial value', async () => {
    const el = await fixture(html`
      <cds-radio-button-group value="test-1">
        <cds-radio-button value="test-1"></cds-radio-button>
        <cds-radio-button value="test-2"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb1 = el.querySelector(`cds-radio-button[value="test-1"]`);
    expect(rb1?.checked).to.be.true;
  });

  it('should support `checked` attribute in radio-button when there is no value in group', async () => {
    const el = await fixture(html`
      <cds-radio-button-group>
        <cds-radio-button checked value="test-1"></cds-radio-button>
        <cds-radio-button value="test-2"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb1 = el.querySelector('cds-radio-button[value="test-1"]');
    expect(rb1?.checked).to.be.true;
  });

  it('updates selection when `value` prop changes programmatically', async () => {
    const el = await fixture(html`
      <cds-radio-button-group value="test-1">
        <cds-radio-button value="test-1"></cds-radio-button>
        <cds-radio-button value="test-2"></cds-radio-button>
      </cds-radio-button-group>
    `);
    const rb1 = el.querySelector(`cds-radio-button[value="test-1"]`);
    const rb2 = el.querySelector(`cds-radio-button[value="test-2"]`);
    expect(rb1?.checked).to.be.true;
    expect(rb2?.checked).to.be.false;

    el.value = 'test-2';
    await el.updateComplete;
    expect(rb1?.checked).to.be.false;
    expect(rb2?.checked).to.be.true;
  });
});
