/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/toggle/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-toggle', () => {
  it('should match button and label ids', async () => {
    const el = await fixture(html`
      <cds-toggle
        label-text="test label"
        label-a="Off"
        label-b="On"></cds-toggle>
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
        label-a="Off"
        label-b="On"></cds-toggle>
    `);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).to.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');

    el.checked = true;

    expect(el.shadowRoot.textContent).to.contain('On');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
  });

  it('supports sm size', async () => {
    let el = await fixture(html`
      <cds-toggle
        label-text="Test label"
        label-a="Off"
        label-b="On"
        size="sm"></cds-toggle>
    `);
    await el.updateComplete;

    input = el.shadowRoot.querySelector('input');
    classList = input?.classList || [];
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
        label-a="Off"
        label-b="On"
        hideLabel></cds-toggle>
    `);
    await el.updateComplete;

    const label = el.shadowRoot.querySelector('label');
    const classList = label?.classList || [];
    expect(
      Array.from(classList).some((cls) => cls.includes('--visually-hidden'))
    ).to.be.true;

    expect(el.shadowRoot.textContent).to.contain('Test label');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');

    el.checked = true;

    expect(el.shadowRoot.textContent).to.contain('Test label');
    expect(el.shadowRoot.textContent).to.not.contain('Off');
    expect(el.shadowRoot.textContent).to.not.contain('On');
  });

  it("doesn't render sideLabel if hideLabel is true and no label-text is provided", async () => {
    const elRegular = await fixture(html`<cds-toggle></cds-toggle>`);
    await elRegular.updateComplete;

    const sideLabelElRegular = [
      ...elRegular.shadowRoot.querySelectorAll('*'),
    ].find(
      (node) =>
        node.classList &&
        [...node.classList].some((cls) => cls.endsWith('--toggle__text'))
    );

    expect(sideLabelElRegular).to.exist;

    const elHideLabel = await fixture(
      html`<cds-toggle hideLabel></cds-toggle>`
    );
    await elHideLabel.updateComplete;

    const sideLabelElHideLabel = [
      ...elHideLabel.shadowRoot.querySelectorAll('*'),
    ].find(
      (node) =>
        node.classList &&
        [...node.classList].some((cls) => cls.endsWith('--toggle__text'))
    );

    expect(sideLabelElHideLabel).to.not.exist;
  });

  it('supports disabled', async () => {
    const el = await fixture(html` <cds-toggle disabled> </cds-toggle> `);
    await el.updateComplete;
    const input = el.shadowRoot.querySelector('input');
    expect(input.disabled).to.be.true;
  });

  it('respects disabled to prevent changes', async () => {
    const el = await fixture(html` <cds-toggle disabled> </cds-toggle> `);
    await el.updateComplete;

    expect(el.checked).to.be.false;
    el.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('can be controlled with using checked', async () => {
    const el = await fixture(html` <cds-toggle> </cds-toggle> `);
    await el.updateComplete;
    expect(el.checked).to.be.false;
    el.checked = true;
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('respects readonly to prevent changes', async () => {
    const el = await fixture(html` <cds-toggle read-only> </cds-toggle> `);
    await el.updateComplete;

    expect(el.checked).to.be.false;
    el.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });
});
