/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/pagination-nav/index.js';
import { fixture, html, expect } from '@open-wc/testing';

const prefix = 'cds';

describe('cds-pagination-nav', () => {
  describe('renders as expected', () => {
    it('should spread extra props onto outermost element', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="10" data-testid="test-id">
        </cds-pagination-nav>
      `);

      expect(el.getAttribute('data-testid')).to.equal('test-id');
    });

    it('should support a custom class', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          total-items="10"
          class="custom-class"></cds-pagination-nav>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should respect itemsShown prop', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          total-items="10"
          items-shown="4"></cds-pagination-nav>
      `);

      const pages = el.shadowRoot.querySelectorAll(
        `.${prefix}--pagination-nav__page`
      );
      expect(pages.length).to.equal(4);
    });

    it('should respect loop prop', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="3" loop></cds-pagination-nav>
      `);
      await el.updateComplete;

      expect(el.page).to.equal(3);

      const navButtons = el.shadowRoot.querySelectorAll('cds-icon-button');
      const prevButton = navButtons[0];
      const nextButton = navButtons[1];

      expect(nextButton.hasAttribute('disabled')).to.be.false;

      nextButton.click();
      await el.updateComplete;
      expect(el.page).to.equal(0);

      expect(prevButton.hasAttribute('disabled')).to.be.false;

      prevButton.click();
      await el.updateComplete;
      expect(el.page).to.equal(3);
    });

    it('should fire cds-page-changed event', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="10"></cds-pagination-nav>
      `);

      const navButtons = el.shadowRoot.querySelectorAll('cds-icon-button');
      const prevButton = navButtons[0];
      const nextButton = navButtons[1];

      let changeEventFired = false;
      let eventDetail = null;

      el.addEventListener('cds-page-changed', (e) => {
        changeEventFired = true;
        eventDetail = e.detail;
      });

      // event should fire when clicking page
      const page4Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('4'));

      page4Button.click();
      await el.updateComplete;

      expect(changeEventFired).to.be.true;
      expect(eventDetail).to.exist;
      expect(eventDetail.page).to.equal(3);

      // event should fire when clicking next button
      changeEventFired = false;
      nextButton.click();
      await el.updateComplete;

      expect(changeEventFired).to.be.true;
      expect(eventDetail).to.exist;
      expect(eventDetail.page).to.equal(4);

      // event should fire when clicking previous button
      changeEventFired = false;
      prevButton.click();

      await el.updateComplete;
      expect(changeEventFired).to.be.true;
      expect(eventDetail).to.exist;
      expect(eventDetail.page).to.equal(3);
    });

    it('should respect page prop', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="10" page="3"></cds-pagination-nav>
      `);

      const page4Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('4'));
      expect(page4Button.getAttribute('aria-current')).to.equal('page');
    });

    it('should respect totalItems prop', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="5"></cds-pagination-nav>
      `);

      const pages = el.shadowRoot.querySelectorAll(
        `.${prefix}--pagination-nav__page`
      );
      expect(pages.length).to.equal(5);
    });

    it('should disable "Previous" button when on first page and loop is false', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="0"></cds-pagination-nav>
      `);

      const prevButton = el.shadowRoot.querySelectorAll('cds-icon-button')[0];

      expect(prevButton.hasAttribute('disabled')).to.be.true;
    });

    it('should disable "Next" button when on last page and loop is false', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="3"></cds-pagination-nav>
      `);

      const nextButton = el.shadowRoot.querySelectorAll('cds-icon-button')[1];

      expect(nextButton.hasAttribute('disabled')).to.be.true;
    });

    it('should render in small size and let user render 4 pages', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          size="sm"
          total-items="10"
          items-shown="4"
          aria-label="pagination"></cds-pagination-nav>
      `);

      const nav = el.shadowRoot.querySelector('nav');
      expect(nav.classList.contains(`${prefix}--layout--size-sm`)).to.be.true;

      const select = el.shadowRoot.querySelector('select');
      expect(select).to.exist;
      expect(select.getAttribute('aria-label')).to.equal('Select Page number');
    });

    it('should render in medium size and let user render 4 pages', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          size="md"
          total-items="10"
          items-shown="4"
          aria-label="pagination"></cds-pagination-nav>
      `);

      const nav = el.shadowRoot.querySelector('nav');
      expect(nav.classList.contains(`${prefix}--layout--size-md`)).to.be.true;

      const select = el.shadowRoot.querySelector('select');
      expect(select).to.exist;
      expect(select.getAttribute('aria-label')).to.equal('Select Page number');
    });

    it('should render in default (large) size and let user render 4 pages', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          total-items="10"
          items-shown="4"
          aria-label="pagination"></cds-pagination-nav>
      `);

      const nav = el.shadowRoot.querySelector('nav');
      expect(nav.classList.contains(`${prefix}--layout--size-lg`)).to.be.true;

      const select = el.shadowRoot.querySelector('select');
      expect(select).to.exist;
      expect(select.getAttribute('aria-label')).to.equal('Select Page number');
    });

    it('should respect tooltipAlignment and tooltipPosition props', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          tooltip-alignment="end"
          tooltip-position="right"></cds-pagination-nav>
      `);

      const iconButtons = el.shadowRoot.querySelectorAll('cds-icon-button');
      expect(iconButtons[0].getAttribute('align')).to.equal('right-end');
      expect(iconButtons[1].getAttribute('align')).to.equal('right-end');
    });

    it('should support translateWithId', async () => {
      const paginationNavTranslationIds = {
        'carbon.pagination-nav.next': 'Test Next',
        'carbon.pagination-nav.previous': 'Test Previous',
        'carbon.pagination-nav.item': 'Test Page',
        'carbon.pagination-nav.active': 'Test Active',
        'carbon.pagination-nav.of': 'de',
      };

      const el = await fixture(html`
        <cds-pagination-nav
          total-items="26"
          .translateWithId="${(id) => paginationNavTranslationIds[id]}">
        </cds-pagination-nav>
      `);

      const iconButtons = el.shadowRoot.querySelectorAll('cds-icon-button');
      const prevButton = iconButtons[0];
      const nextButton = iconButtons[1];

      const prevTooltip = prevButton.querySelector('[slot="tooltip-content"]');
      const nextTooltip = nextButton.querySelector('[slot="tooltip-content"]');
      expect(prevTooltip.textContent).to.equal('Test Previous');
      expect(nextTooltip.textContent).to.equal('Test Next');

      const activePageLabel = el.shadowRoot.querySelector(
        `span.${prefix}--pagination-nav__accessibility-label`
      );
      expect(activePageLabel.textContent.trim()).to.equal(
        'Test Active, Test Page'
      );

      const pageStatusLiveLabel = el.shadowRoot.querySelector(
        `div.${prefix}--pagination-nav__accessibility-label[aria-live="polite"][aria-atomic="true"]`
      );
      expect(pageStatusLiveLabel.textContent.trim()).to.equal(
        'Test Page 1 de 26'
      );
    });
  });

  describe('behaves as expected', () => {
    it('should move to next page when "Next" is pressed', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="1"></cds-pagination-nav>
      `);
      await el.updateComplete;

      expect(el.page).to.equal(1);

      // click Next button
      const nextButton = el.shadowRoot.querySelectorAll('cds-icon-button')[1];

      nextButton.click();
      await el.updateComplete;

      expect(el.page).to.equal(2);
    });

    it('should move to previous page when "Previous" is pressed', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="1"></cds-pagination-nav>
      `);
      await el.updateComplete;

      expect(el.page).to.equal(1);

      const prevButton = el.shadowRoot.querySelectorAll('cds-icon-button')[0];

      prevButton.click();
      await el.updateComplete;

      expect(el.page).to.equal(0);
    });

    it('should move to page that is pressed', async () => {
      const el = await fixture(html`
        <cds-pagination-nav total-items="4" page="1"></cds-pagination-nav>
      `);

      const page4Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('4'));

      page4Button.click();
      await el.updateComplete;

      expect(el.page).to.equal(3);
      expect(page4Button.getAttribute('aria-current')).to.equal('page');
    });

    it('should render PaginationNav correctly and navigate through different page ranges using select elements', async () => {
      const el = await fixture(html`
        <cds-pagination-nav
          total-items="10"
          items-shown="4"></cds-pagination-nav>
      `);

      // Initial state: < 1 2 ... 10 >
      const page1Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('1'));

      expect(page1Button).to.exist;
      expect(page1Button.getAttribute('aria-current')).to.equal('page');

      const page2Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('2'));

      expect(page2Button).to.exist;

      const page10Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('10'));

      expect(page10Button).to.exist;

      let selectElements = el.shadowRoot.querySelectorAll('select');
      expect(selectElements.length).to.equal(1);

      // Select page 6 from the dropdown
      selectElements[0].value = '5';
      selectElements[0].dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 0));

      // New state: < ... 6 ... 10 >
      const page6Button = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('6'));
      expect(page6Button.getAttribute('aria-current')).to.equal('page');

      // Check for two select elements in this state
      selectElements = el.shadowRoot.querySelectorAll('select');
      expect(selectElements.length).to.equal(2);

      // Select page 1 from the first dropdown
      selectElements[0].value = '0';
      selectElements[0].dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 0));

      // Final state: < 1 2 ... 10 >
      const page1ButtonFinal = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('1'));
      expect(page1ButtonFinal.getAttribute('aria-current')).to.equal('page');

      const page2ButtonFinal = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('2'));
      expect(page2ButtonFinal).to.exist;

      const page10ButtonFinal = Array.from(
        el.shadowRoot.querySelectorAll(`.${prefix}--pagination-nav__page`)
      ).find((btn) => btn.textContent.trim().includes('10'));
      expect(page10ButtonFinal).to.exist;

      // Check that we're back to one select element
      selectElements = el.shadowRoot.querySelectorAll('select');
      expect(selectElements.length).to.equal(1);
    });
  });
});
