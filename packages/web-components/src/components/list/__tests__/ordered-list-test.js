/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/list/index.js';

describe('cds-ordered-list', function () {
  describe('Renders as expected', () => {
    it('should be an ol element', async () => {
      const list = html` <cds-ordered-list>
        <cds-list-item>Item</cds-list-item>
      </cds-ordered-list>`;

      const el = await fixture(list);
      const ol = el.shadowRoot.querySelector('ol');
      expect(ol).to.exist;

      expect(el).dom.to.equalSnapshot();
    });

    it('should render children as expected', async () => {
      const list = html` <cds-ordered-list>
        <cds-list-item>Item 1</cds-list-item>
      </cds-ordered-list>`;

      const el = await fixture(list);

      const slot = el.shadowRoot.querySelector('slot');
      const assigned = slot.assignedNodes({ flatten: true });

      const listItem = assigned.find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName.toLowerCase() === 'cds-list-item'
      );

      expect(listItem).to.exist;
      expect(listItem.getAttribute('role')).to.equal('listitem');
      expect(listItem.textContent.trim()).to.equal('Item 1');
    });

    it('should render nested lists', async () => {
      const list = html` <cds-ordered-list>
        <cds-list-item>
          Ordered List level 1
          <cds-ordered-list>
            <cds-list-item>Ordered List level 2</cds-list-item>
            <cds-list-item>Ordered List level 2</cds-list-item>
          </cds-ordered-list>
        </cds-list-item>
      </cds-ordered-list>`;

      const el = await fixture(list);

      const ol = el.shadowRoot.querySelector('ol');
      expect(ol.classList.contains('cds--list--nested')).to.be.false;

      const nested = document.querySelector('cds-ordered-list[slot="nested"');
      const nestedOl = nested.shadowRoot.querySelector('ol');

      expect(nestedOl.classList.contains('cds--list--nested')).to.be.true;
      expect(nestedOl.classList.contains('cds--list--ordered')).to.be.true;
    });

    it('should render native lists', async () => {
      const list = html` <cds-ordered-list native>
        <cds-list-item>Item</cds-list-item>
      </cds-ordered-list>`;

      const el = await fixture(list);

      const ol = el.shadowRoot.querySelector('ol');
      expect(ol.classList.contains('cds--list--ordered--native')).to.be.true;
    });

    it('should render expressive lists', async () => {
      const list = html` <cds-ordered-list is-expressive>
        <cds-list-item>Item</cds-list-item>
      </cds-ordered-list>`;

      const el = await fixture(list);

      const ol = el.shadowRoot.querySelector('ol');
      expect(ol.classList.contains('cds--list--expressive')).to.be.true;
    });
  });
});
