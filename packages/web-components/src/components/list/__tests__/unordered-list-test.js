/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/list/index.js';

describe('cds-unordered-list', () => {
  it('should be an ul element', async () => {
    const list = html` <cds-unordered-list>
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul).to.exist;

    await expect(el).dom.to.equalSnapshot();
  });

  it('should render children as expected', async () => {
    const list = html` <cds-unordered-list>
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

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
    expect(listItem.textContent.trim()).to.equal('Item');
  });

  it('should render nested lists', async () => {
    const list = html` <cds-unordered-list>
      <cds-list-item>
        Ordered List level 1
        <cds-unordered-list>
          <cds-list-item>Ordered List level 2</cds-list-item>
          <cds-list-item>Ordered List level 2</cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--nested')).to.be.false;

    const nested = document.querySelector('cds-unordered-list[slot="nested"]');
    const nestedUl = nested.shadowRoot.querySelector('ul');

    expect(nestedUl.classList.contains('cds--list--nested')).to.be.true;
    expect(nestedUl.classList.contains('cds--list--unordered')).to.be.true;
  });

  it('should render expressive lists', async () => {
    const list = html` <cds-unordered-list is-expressive>
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--expressive')).to.be.true;
  });

  it('should render with disc marker type', async () => {
    const list = html` <cds-unordered-list type="disc">
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-disc')).to.be.true;
  });

  it('should render with circle marker type', async () => {
    const list = html` <cds-unordered-list type="circle">
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-circle')).to.be.true;
  });

  it('should render with square marker type', async () => {
    const list = html` <cds-unordered-list type="square">
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-square')).to.be.true;
  });

  it('should render with hyphen marker type', async () => {
    const list = html` <cds-unordered-list type="hyphen">
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-hyphen')).to.be.true;
  });

  it('should render with custom marker type', async () => {
    const list = html` <cds-unordered-list type="custom" custom-marker="→">
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-custom')).to.be.true;
    expect(ul.style.getPropertyValue('--cds--list--marker-content')).to.equal(
      "'→'"
    );
  });

  it('should default to hyphen marker for top-level lists', async () => {
    const list = html` <cds-unordered-list>
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-hyphen')).to.be.true;
  });

  it('should default to square marker for nested lists', async () => {
    const list = html` <cds-unordered-list nested>
      <cds-list-item>Item</cds-list-item>
    </cds-unordered-list>`;

    const el = await fixture(list);

    const ul = el.shadowRoot.querySelector('ul');
    expect(ul.classList.contains('cds--list--marker-square')).to.be.true;
  });
});
