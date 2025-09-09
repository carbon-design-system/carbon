/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/pagination/index.js';
import '@carbon/web-components/es/components/select/index.js';
import '@carbon/web-components/es/components/select/select-item.js';

describe('cds-pagination', function () {
  it('should render with default attributes', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="40">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    expect(el).shadowDom.to.exist;
    expect(el.getAttribute('page')).to.equal('1');
    expect(el.getAttribute('page-size')).to.equal('10');
  });

  it('should respect backward-text and forward-text attributes', async () => {
    const el = await fixture(html`
      <cds-pagination
        total-items="20"
        backward-text="Voltar"
        forward-text="Avançar">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const prevBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorPreviousButton}`
    );
    const nextBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorForwardButton}`
    );

    expect(prevBtn.getAttribute('tooltip-text')).to.equal('Voltar');
    expect(nextBtn.getAttribute('tooltip-text')).to.equal('Avançar');
  });

  it('should disable navigation buttons when disabled attribute is set', async () => {
    const el = await fixture(html`
      <cds-pagination disabled total-items="20">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const prevBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorPreviousButton}`
    );
    const nextBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorForwardButton}`
    );

    expect(prevBtn.disabled).to.be.true;
    expect(nextBtn.disabled).to.be.true;
  });

  it('should dispatch cds-pagination-changed-current when navigating pages', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const nextBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorForwardButton}`
    );

    setTimeout(() => nextBtn.click());
    const { detail } = await oneEvent(el, 'cds-pagination-changed-current');

    expect(detail.page).to.equal(2);
    expect(detail.pageSize).to.equal(10);
  });

  it('should dispatch cds-page-sizes-select-changed when changing page size', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="40" page="1" page-size="10">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);

    const select = el.shadowRoot.querySelector('#page-size-select');

    setTimeout(() => {
      select.value = '20';
      select.dispatchEvent(
        new CustomEvent('cds-select-selected', {
          bubbles: true,
          composed: true,
          detail: { value: '20' },
        })
      );
    });

    const { detail } = await oneEvent(el, 'cds-page-sizes-select-changed');
    expect(detail.pageSize).to.equal(20);
  });

  it('should render status text with totalItems', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="40" page-size="10" page="2">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const status = el.shadowRoot.querySelector('.cds--pagination__items-count');
    expect(status.textContent.trim()).to.equal('11–20 of 40 items');
  });

  it('should render indeterminate status text when pagesUnknown is true', async () => {
    const el = await fixture(html`
      <cds-pagination pages-unknown page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const status = el.shadowRoot.querySelector('.cds--pagination__items-count');
    expect(status.textContent.trim()).to.contain('1–10');
  });

  it('should disable next button when totalItems is 0', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="0" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const nextBtn = el.shadowRoot.querySelector(
      `.${el.constructor.selectorForwardButton}`
    );

    expect(nextBtn.disabled).to.be.true;
  });

  it('should respect page-size-input-disabled attribute', async () => {
    const el = await fixture(html`
      <cds-pagination page-size-input-disabled total-items="40">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const sizeSelect = el.shadowRoot.querySelector('#page-size-select');
    expect(sizeSelect.disabled).to.be.true;
  });

  it('should respect page-input-disabled attribute', async () => {
    const el = await fixture(html`
      <cds-pagination page-input-disabled total-items="40">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const pageSelect = el.shadowRoot.querySelector('#pages-select');
    expect(pageSelect.disabled).to.be.true;
  });

  it('should update status when page attribute changes externally', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    el.page = 2;
    await el.updateComplete;

    const status = el.shadowRoot.querySelector('.cds--pagination__items-count');
    expect(status.textContent.trim()).to.equal('11–20 of 20 items');
  });
});
