/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, triggerFocusFor } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/accordion/index.js';

const accordion = html`
  <cds-accordion>
    <cds-accordion-item title="Heading A">
      <p>Panel A</p>
    </cds-accordion-item>
    <cds-accordion-item title="Heading B">
      <p>Panel B</p>
    </cds-accordion-item>
    <cds-accordion-item title="Heading C">
      <p>Panel C</p>
    </cds-accordion-item>
  </cds-accordion>
`;

describe('cds-accordion', function () {
  it('should render', async () => {
    const el = await fixture(accordion);

    await expect(el).dom.to.equalSnapshot();
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(accordion);
      const firstItem = el.firstElementChild;

      await expect(firstItem).to.be.accessible();

      // click to open
      await firstItem.click();

      // test when open
      await expect(firstItem).to.be.accessible();
    });
  });

  describe('basic keyboard accessibility testing', () => {
    it('should receive focus', async () => {
      const el = await fixture(accordion);
      const firstItem = el.firstElementChild;

      await triggerFocusFor(firstItem);
      expect(document.activeElement).to.equal(firstItem);
    });

    it('should open with enter', async () => {
      const el = await fixture(accordion);
      const firstItem = el.firstElementChild;

      await triggerFocusFor(firstItem);
      await sendKeys({ press: 'Enter' });

      expect(firstItem.hasAttribute('open'));
    });

    it('should open with spacebar', async () => {
      const el = await fixture(accordion);
      const firstItem = el.firstElementChild;

      await triggerFocusFor(firstItem);
      await sendKeys({ press: 'Space' });

      expect(firstItem.hasAttribute('open'));
    });
  });

  describe('Flush align', () => {
    it('should align to the left if prop isFlush is passed', async () => {
      const el = await fixture(
        html`<cds-accordion isFlush>
          <cds-accordion-item title="Heading A">
            <p>Panel A</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading B">
            <p>Panel B</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading C">
            <p>Panel C</p>
          </cds-accordion-item>
        </cds-accordion>`
      );

      expect(el.hasAttribute('isFlush'));
    });

    it('should not align to left if alignment="start"', async () => {
      const el = await fixture(
        html`<cds-accordion isFlush alignment="start">
          <cds-accordion-item title="Heading A" alignment="start">
            <p>Panel A</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading B" alignment="start">
            <p>Panel B</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading C" alignment="start">
            <p>Panel C</p>
          </cds-accordion-item>
        </cds-accordion>`
      );
      const firstItem = el.firstElementChild;

      expect(firstItem.hasAttribute('isFlush')).to.be.false;
    });
  });

  describe('Expand/Collapse All', async () => {
    const el = await fixture(accordion);
    const elItems = el.querySelectorAll('cds-accordion-item');
    const expandAllButton = document.createElement('cds-button');
    const collapseAllButton = document.createElement('cds-button');

    expandAllButton.addEventListener('click', () => {
      elItems.forEach((item) => {
        item.setAttribute('open', '');
      });
    });

    collapseAllButton.addEventListener('click', () => {
      elItems.forEach((item) => {
        item.removeAttribute('open');
      });
    });

    it('should expand All on click to button', async () => {
      await expandAllButton.click();

      elItems.forEach((item) => {
        expect(item.hasAttribute('open'));
      });
    });

    it('should collapse All on click to button', async () => {
      await expandAllButton.click();
      await collapseAllButton.click();

      elItems.forEach((item) => {
        expect(item.hasAttribute('open')).to.be.false;
      });
    });
  });

  // The 'ordered' feature has not yet been added to the web component.
  // See the React component for more information.
  xdescribe('Ordered List', () => {
    it('should be an ol if prop ordered is passed as true', () => {});
    it('should be a ul if prop ordered is passed as false', () => {});
  });
});
