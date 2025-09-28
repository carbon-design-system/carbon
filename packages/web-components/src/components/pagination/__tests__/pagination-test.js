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

describe('cds-pagination', () => {
  it('should respect backward-text and forward-text attributes', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" backward-text="Back" forward-text="Next">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    expect(buttons?.[0]?.getAttribute('tooltip-text')).to.equal('Back');
    expect(buttons?.[1]?.getAttribute('tooltip-text')).to.equal('Next');
  });

  it('should disable navigation buttons when disabled', async () => {
    const el = await fixture(html`
      <cds-pagination disabled total-items="20">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    expect(buttons?.[0]?.hasAttribute('disabled')).to.be.true;
    expect(buttons?.[1]?.hasAttribute('disabled')).to.be.true;
  });

  it('should dispatch cds-page-sizes-select-changed on page size change', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="40" page="1" page-size="10">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector('#page-size-select');
    await select?.updateComplete;

    const listener = oneEvent(el, 'cds-page-sizes-select-changed');
    select?.dispatchEvent(
      new CustomEvent('cds-select-selected', {
        bubbles: true,
        composed: true,
        detail: { value: '20' },
      })
    );

    const { detail } = await listener;
    expect(detail.pageSize).to.equal(20);
  });

  it('should render indeterminate status when pagesUnknown is true', async () => {
    const originalUpdated =
      customElements.get('cds-pagination').prototype.updated;
    customElements.get('cds-pagination').prototype.updated = function () {};
    const el = await fixture(html`
      <cds-pagination pages-unknown page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const status = el.shadowRoot?.querySelector(
      '.cds--pagination__items-count'
    );
    expect(status?.textContent?.trim()).to.contain('1–10');

    customElements.get('cds-pagination').prototype.updated = originalUpdated;
  });

  it('should disable next button when totalItems is 0', async () => {
    const proto = customElements.get('cds-pagination').prototype;
    const originalUpdated = proto.updated;
    proto.updated = function () {};

    const el = await fixture(html`
      <cds-pagination total-items="0" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    expect(buttons?.[1]?.hasAttribute('disabled')).to.be.true;

    proto.updated = originalUpdated;
  });

  it('should update status when page attribute changes externally', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const pageSelect = el.shadowRoot?.querySelector('#pages-select');
    await pageSelect?.updateComplete;

    pageSelect?.dispatchEvent(
      new CustomEvent('cds-select-selected', {
        bubbles: true,
        composed: true,
        detail: { value: '2' },
      })
    );

    await el.updateComplete;
    const status = el.shadowRoot?.querySelector(
      '.cds--pagination__items-count'
    );
    expect(status?.textContent?.trim()).to.equal('11–20 of 20 items');
  });

  it('should support custom class and attributes', async () => {
    const el = await fixture(html`
      <cds-pagination
        class="custom-class"
        data-testid="pagination"
        total-items="20">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    expect(el.classList.contains('custom-class')).to.be.true;
    expect(el.getAttribute('data-testid')).to.equal('pagination');
  });

  it('should respect items-per-page-text attribute', async () => {
    const el = await fixture(html`
      <cds-pagination items-per-page-text="éléments par page" total-items="20">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    const label = el.shadowRoot?.querySelector(`.cds--pagination__text`);
    expect(label?.textContent?.trim()).to.equal('éléments par page');
  });

  it('should disable page and pageSize selects with attributes', async () => {
    const el = await fixture(html`
      <cds-pagination
        page-input-disabled
        page-size-input-disabled
        total-items="20">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const pageSizeSelect = el.shadowRoot?.querySelector('#page-size-select');
    const pagesSelect = el.shadowRoot?.querySelector('#pages-select');
    expect(pageSizeSelect?.hasAttribute('disabled')).to.be.true;
    expect(pagesSelect?.hasAttribute('disabled')).to.be.true;
  });

  it('should navigate pages when clicking prev and next buttons', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="2">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    const prevBtn = buttons?.[0];
    const nextBtn = buttons?.[1];

    prevBtn?.click();
    await el.updateComplete;
    expect(el.page).to.equal(1);

    nextBtn?.click();
    await el.updateComplete;
    expect(el.page).to.equal(2);
  });

  it('should update status when pageSize changes externally', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);
    el.pageSize = 20;
    await el.updateComplete;

    const status = el.shadowRoot?.querySelector(
      '.cds--pagination__items-count'
    );
    expect(status?.textContent?.trim()).to.equal('1–20 of 20 items');
  });

  it('should respect custom status formatter', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="10" page-size="5" page="1">
        <cds-select-item value="5">5</cds-select-item>
      </cds-pagination>
    `);
    el.formatStatusWithDeterminateTotal = ({ start, end, count }) =>
      `${start}-${end} items out of ${count}`;
    await el.updateComplete;

    const status = el.shadowRoot?.querySelector(
      '.cds--pagination__items-count'
    );
    expect(status?.textContent?.trim()).to.equal('1-5 items out of 10');
  });

  it('should disable next button when is-last-page is true', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="50" page-size="10" page="5" is-last-page>
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    expect(buttons?.[1]?.hasAttribute('disabled')).to.be.true;
  });

  it('should clamp page to totalPages when page is out of range', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="5">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const pageSelect = el.shadowRoot?.querySelector('#pages-select');
    expect(pageSelect?.value).to.equal('2');
  });

  it('should respect custom formatStatusWithIndeterminateTotal', async () => {
    const proto = customElements.get('cds-pagination').prototype;
    const originalUpdated = proto.updated;
    proto.updated = function () {};

    const el = await fixture(html`
      <cds-pagination pages-unknown total-items="50" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    el.formatStatusWithIndeterminateTotal = ({ start, end }) =>
      `${start}-${end} elements`;
    await el.updateComplete;

    const status = el.shadowRoot?.querySelector(
      '.cds--pagination__items-count'
    );
    expect(status?.textContent?.trim()).to.equal('1-10 elements');

    proto.updated = originalUpdated;
  });

  it('should respect custom formatSupplementalText', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="2">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);

    el.formatSupplementalText = ({ count }) => `${count} pages`;
    await el.updateComplete;

    const allTexts = el.shadowRoot?.querySelectorAll(
      '.cds--pagination__text:not(.cds--pagination__items-count)'
    );
    const supplemental = allTexts?.[allTexts.length - 1];
    expect(supplemental?.textContent?.trim()).to.equal('2 pages');
  });

  it('should respect custom formatLabelText', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    el.formatLabelText = ({ count }) => `Page of ${count} total`;
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector(
      '.cds--label.cds--visually-hidden'
    );
    expect(label?.textContent?.trim()).to.equal('Page of 2 total');
  });

  it('should go to first page when clicking previous from page 2', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="2">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    const prevBtn = buttons?.[0];

    prevBtn?.click();
    await el.updateComplete;

    expect(el.page).to.equal(1);
  });

  it('should change pageSize when selecting from dropdown', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="40" page="1" page-size="10">
        <cds-select-item value="10">10</cds-select-item>
        <cds-select-item value="20">20</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector('#page-size-select');
    select?.dispatchEvent(
      new CustomEvent('cds-select-selected', {
        bubbles: true,
        composed: true,
        detail: { value: '20' },
      })
    );

    await el.updateComplete;
    expect(el.pageSize).to.equal(20);
  });

  it('should disable previous button on the first page', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="1">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    const prevBtn = buttons?.[0];

    expect(prevBtn?.hasAttribute('disabled')).to.be.true;
  });

  it('should disable next button on the last page', async () => {
    const el = await fixture(html`
      <cds-pagination total-items="20" page-size="10" page="2">
        <cds-select-item value="10">10</cds-select-item>
      </cds-pagination>
    `);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll('cds-button');
    const nextBtn = buttons?.[1];

    expect(nextBtn?.hasAttribute('disabled')).to.be.true;
  });
});
