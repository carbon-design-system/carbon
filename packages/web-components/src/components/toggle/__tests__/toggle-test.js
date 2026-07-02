/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/toggle/index.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

describe('cds-toggle', () => {
  it('should match button and label ids', async () => {
    const el = await fixture(html`
      <cds-toggle
        label-text="test label"
        label-a="On"
        label-b="Off"></cds-toggle>
    `);

    const switchEl = el.shadowRoot.querySelector('[role="switch"]');
    const labelEl = el.shadowRoot.querySelector('label');

    expect(switchEl).to.exist;
    expect(labelEl).to.exist;
    expect(switchEl.id).to.equal(labelEl.getAttribute('for'));
  });

  it('renders labelA when unchecked and labelB when checked', async () => {
    const el = await fixture(html`
      <cds-toggle
        label-text="Airplane mode"
        label-a="On"
        label-b="Off"></cds-toggle>
    `);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).to.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');

    el.toggled = true;
    await el.updateComplete;

    expect(el.shadowRoot.textContent).to.contain('On');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
  });

  it('supports sm size', async () => {
    let el = await fixture(html`
      <cds-toggle
        label-text="Test label"
        label-a="On"
        label-b="Off"
        size="sm"></cds-toggle>
    `);
    await el.updateComplete;

    const inputDiv = el.shadowRoot.querySelector('label > div');
    const classList = inputDiv?.classList || [];
    expect(
      Array.from(classList).some((cls) =>
        cls.includes('--toggle__appearance--sm')
      )
    ).to.be.true;
  });

  it('supports to use top label as side label', async () => {
    const el = await fixture(html`
      <cds-toggle
        label-text="Test label"
        label-a="On"
        label-b="Off"
        hideLabel></cds-toggle>
    `);
    await el.updateComplete;

    const label = el.shadowRoot.querySelector('label > span');
    const classList = label?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--visually-hidden'))
    ).to.be.true;

    expect(el.shadowRoot.textContent).to.contain('Test label');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');

    el.toggled = true;

    expect(el.shadowRoot.textContent).to.contain('Test label');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');
  });

  it("doesn't render sideLabel if hideLabel is true and no label-text is provided", async () => {
    const elRegular = await fixture(html`<cds-toggle></cds-toggle>`);
    await elRegular.updateComplete;

    expect(elRegular.shadowRoot.textContent).to.contain('Off');

    const buttonRegular = elRegular.shadowRoot.querySelector('button');
    buttonRegular.click();

    await elRegular.updateComplete;
    expect(elRegular.shadowRoot.textContent).to.contain('On');

    const elHideLabel = await fixture(
      html`<cds-toggle hideLabel></cds-toggle>`
    );
    await elHideLabel.updateComplete;

    expect(elHideLabel.shadowRoot.textContent.trim()).to.equal('');

    const buttonHideLabel = elHideLabel.shadowRoot.querySelector('button');
    buttonHideLabel.click();

    await elHideLabel.updateComplete;
    expect(elHideLabel.shadowRoot.textContent.trim()).to.equal('');
  });

  it('supports disabled', async () => {
    const el = await fixture(html` <cds-toggle disabled> </cds-toggle> `);
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
  });

  it('respects disabled to prevent changes', async () => {
    const el = await fixture(html` <cds-toggle disabled> </cds-toggle> `);
    await el.updateComplete;

    expect(el.toggled).to.be.false;
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    expect(el.toggled).to.be.false;
  });

  it('respects readonly to prevent changes', async () => {
    const el = await fixture(html` <cds-toggle read-only> </cds-toggle> `);
    await el.updateComplete;

    expect(el.toggled).to.be.false;
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    expect(el.toggled).to.be.false;
  });

  it('can be controlled with using toggled', async () => {
    const el = await fixture(html` <cds-toggle> </cds-toggle> `);
    await el.updateComplete;

    expect(el.toggled).to.be.false;
    el.toggled = true;
    await el.updateComplete;
    expect(el.toggled).to.be.true;
  });

  it('should fire cds-toggle-changed event when toggle is changed', async () => {
    const el = await fixture(html`<cds-toggle></cds-toggle>`);

    await el.updateComplete;

    const button = el.shadowRoot.querySelector('button');
    const listener = oneEvent(el, 'cds-toggle-changed');
    button.click();
    const event = await listener;

    expect(event).to.exist;
    expect(event.detail).to.deep.equal({
      checked: true, // TODO: remove in v12
      toggled: true,
    });
  });

  it('should not fire changed event when readonly', async () => {
    const toggle = html`<cds-toggle read-only></cds-toggle>`;
    const el = await fixture(toggle);

    await el.updateComplete;

    const button = el.shadowRoot.querySelector('button');

    const eventPromise = oneEvent(el, 'cds-toggle-changed');
    button.click();

    const result = await Promise.race([
      eventPromise.then(() => 'cds-toggle-changed event fired'),
      new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
    ]);

    expect(result).to.equal(
      'timeout',
      'cds-toggle-changed event should not fire when readonly'
    );
  });

  it('should not fire changed event when disabled', async () => {
    const toggle = html`<cds-toggle disabled></cds-toggle>`;
    const el = await fixture(toggle);

    await el.updateComplete;

    const button = el.shadowRoot.querySelector('button');

    const eventPromise = oneEvent(el, 'cds-toggle-changed');
    button.click();

    const result = await Promise.race([
      eventPromise.then(() => 'cds-toggle-changed event fired'),
      new Promise((resolve) => setTimeout(() => resolve('timeout'), 100)),
    ]);

    expect(result).to.equal(
      'timeout',
      'cds-toggle-changed event should not fire when disabled'
    );
  });
});
