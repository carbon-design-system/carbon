/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/contained-list/index.js';
import '@carbon/web-components/es/components/search/index.js';

const prefix = 'cds';

describe('cds-contained-list', function () {
  const basicContainedList = html`
    <cds-contained-list label="Heading">
      <cds-contained-list-item>List item</cds-contained-list-item>
    </cds-contained-list>
  `;

  it('should render', async () => {
    const el = await fixture(basicContainedList);
    expect(el).to.exist;
  });

  it('should apply correct class for kind="on-page"', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading" kind="on-page">
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const container = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list`
    );
    expect(container).to.exist;
    expect(container?.classList.contains(`${prefix}--contained-list--on-page`))
      .to.be.true;
  });

  it('should apply correct class for kind="disclosed"', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading" kind="disclosed">
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const container = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list`
    );
    expect(container).to.exist;
    expect(
      container?.classList.contains(`${prefix}--contained-list--disclosed`)
    ).to.be.true;
  });

  it('should apply inset class when isInset is true', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading" is-inset>
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const container = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list`
    );
    expect(container).to.exist;
    expect(
      container?.classList.contains(`${prefix}--contained-list--inset-rulers`)
    ).to.be.true;
  });

  it('should not apply inset class when isInset is false', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const container = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list`
    );
    expect(container).to.exist;
    expect(
      container?.classList.contains(`${prefix}--contained-list--inset-rulers`)
    ).to.be.false;
  });

  it('list and label ids match', async () => {
    const el = await fixture(basicContainedList);

    const list = el.shadowRoot?.querySelector('ul');
    const label = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list__label`
    );

    expect(list).to.exist;
    expect(label).to.exist;
    expect(list?.getAttribute('aria-labelledby')).to.equal(
      label?.getAttribute('id')
    );
  });

  it('renders props.label', async () => {
    const el = await fixture(basicContainedList);

    const label = el.shadowRoot?.querySelector(
      `.${prefix}--contained-list__label`
    );
    expect(label).to.exist;
    expect(label?.textContent?.trim()).to.equal('Heading');
  });

  it('supports additional css class names', async () => {
    const className = 'some-class';
    const el = await fixture(html`
      <cds-contained-list label="Heading" class="${className}">
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    expect(el).to.have.class(className);
  });

  it('should render action slot content', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <button slot="action" data-testid="action-button">Add</button>
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const actionSlot = el.shadowRoot?.querySelector('slot[name="action"]');
    expect(actionSlot).to.exist;
    const assignedNodes = actionSlot?.assignedNodes({ flatten: true });
    const button = assignedNodes?.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.getAttribute('data-testid') === 'action-button'
    );

    expect(button).to.exist;
  });

  it('should render search as a child', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-search label-text="Search" data-testid="search"></cds-search>
        <cds-contained-list-item>List item</cds-contained-list-item>
      </cds-contained-list>
    `);

    const search = el.querySelector('[data-testid="search"]');
    expect(search).to.exist;
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(basicContainedList);
      await expect(el).to.be.accessible();
    });
  });
});

describe('cds-contained-list-item', function () {
  const basicItem = html`
    <cds-contained-list label="Heading">
      <cds-contained-list-item>List item content</cds-contained-list-item>
    </cds-contained-list>
  `;

  it('should render', async () => {
    const el = await fixture(basicItem);
    const item = el.querySelector('cds-contained-list-item');
    expect(item).to.exist;
  });

  it('renders children content', async () => {
    const el = await fixture(basicItem);
    const item = el.querySelector('cds-contained-list-item');

    expect(item?.textContent?.trim()).to.equal('List item content');
  });

  it('supports additional css class names', async () => {
    const className = 'some-class';
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-contained-list-item class="${className}">
          List item
        </cds-contained-list-item>
      </cds-contained-list>
    `);

    const item = el.querySelector('cds-contained-list-item');
    expect(item).to.have.class(className);
  });

  it('renders action slot adjacent to content', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-contained-list-item>
          List item
          <button slot="action" data-testid="item-action">Edit</button>
        </cds-contained-list-item>
      </cds-contained-list>
    `);

    const item = el.querySelector('cds-contained-list-item');
    const actionSlot = item?.shadowRoot?.querySelector('slot[name="action"]');
    expect(actionSlot).to.exist;
    const assignedNodes = actionSlot?.assignedNodes({ flatten: true });
    const button = assignedNodes?.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.getAttribute('data-testid') === 'item-action'
    );

    expect(button).to.exist;
  });

  it('renders icon slot', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-contained-list-item>
          <svg slot="icon" data-testid="test-icon">
            <circle cx="8" cy="8" r="8" />
          </svg>
          List item
        </cds-contained-list-item>
      </cds-contained-list>
    `);

    const item = el.querySelector('cds-contained-list-item');
    const icon = item?.querySelector('[data-testid="test-icon"]');

    expect(icon).to.exist;
    expect(icon?.getAttribute('slot')).to.equal('icon');
  });

  describe('interactive', () => {
    it('renders content as button when clickable', async () => {
      const el = await fixture(html`
        <cds-contained-list label="Heading">
          <cds-contained-list-item clickable>
            List item
          </cds-contained-list-item>
        </cds-contained-list>
      `);

      await el.updateComplete;
      const item = el.querySelector('cds-contained-list-item');
      expect(item).to.exist;
      await item?.updateComplete;

      const button = item?.shadowRoot?.querySelector('button');
      expect(button).to.exist;
      expect(
        button?.classList.contains(`${prefix}--contained-list-item__content`)
      ).to.be.true;
    });

    it('should emit click event when clickable item is clicked', async () => {
      let eventFired = false;
      const el = await fixture(html`
        <cds-contained-list label="Heading">
          <cds-contained-list-item
            clickable
            @cds-contained-list-item-click=${() => {
              eventFired = true;
            }}>
            List item
          </cds-contained-list-item>
        </cds-contained-list>
      `);

      const item = el.querySelector('cds-contained-list-item');
      expect(item).to.exist;
      const button = item?.shadowRoot?.querySelector('button');

      expect(eventFired).to.be.false;
      expect(button).to.exist;
      button?.click();
      await item?.updateComplete;

      expect(eventFired).to.be.true;
    });

    it('should apply disabled attribute', async () => {
      const el = await fixture(html`
        <cds-contained-list label="Heading">
          <cds-contained-list-item clickable disabled>
            List item
          </cds-contained-list-item>
        </cds-contained-list>
      `);

      const item = el.querySelector('cds-contained-list-item');
      expect(item).to.exist;
      const button = item?.shadowRoot?.querySelector('button');

      expect(button).to.exist;
      expect(button).to.have.attribute('disabled');
    });
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(basicItem);
      const item = el.querySelector('cds-contained-list-item');
      await expect(item).to.be.accessible();
    });
  });
});

describe('cds-contained-list-description', function () {
  it('should render with correct styles', async () => {
    const el = await fixture(html`
      <cds-contained-list label="Heading">
        <cds-contained-list-item>
          <div>
            List item<br />
            <cds-contained-list-description>
              Description text
            </cds-contained-list-description>
          </div>
        </cds-contained-list-item>
      </cds-contained-list>
    `);

    const description = el.querySelector('cds-contained-list-description');
    expect(description).to.exist;
    expect(description?.textContent?.trim()).to.equal('Description text');
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(html`
        <cds-contained-list-description>
          Description text
        </cds-contained-list-description>
      `);
      await expect(el).to.be.accessible();
    });
  });
});
