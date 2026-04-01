/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/combo-box/index.js';

const comboBox = html`
  <cds-combo-box title-text="Combo box Label" value="option-1">
    <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
    <cds-combo-box-item value="option-2">Option 2</cds-combo-box-item>
    <cds-combo-box-item value="option-3">Option 3</cds-combo-box-item>
  </cds-combo-box>
`;

describe('cds-combo-box', function () {
  it('should not commit selection when beingselected is prevented', async () => {
    const el = await fixture(comboBox);
    const items = el.querySelectorAll('cds-combo-box-item');

    el.addEventListener('cds-combo-box-beingselected', (event) => {
      event.preventDefault();
    });

    items[1].click();
    await el.updateComplete;

    expect(el.value).to.equal('option-1');
    expect(items[0].selected).to.be.true;
    expect(items[1].selected).to.be.false;
  });

  it('should not clear selection when beingselected is prevented', async () => {
    const el = await fixture(comboBox);

    el.addEventListener('cds-combo-box-beingselected', (event) => {
      event.preventDefault();
    });

    const clearButton = el.shadowRoot.querySelector('#selection-button');
    clearButton.click();
    await el.updateComplete;

    const input = el.shadowRoot.querySelector('#trigger-button');
    expect(el.value).to.equal('option-1');
    expect(input.value).to.equal('Option 1');
  });
});
