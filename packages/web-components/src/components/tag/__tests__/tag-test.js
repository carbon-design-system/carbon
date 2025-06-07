/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import Add16 from '@carbon/web-components/es/icons/add/16.js';
import '@carbon/web-components/es/components/tag/index.js';

describe('cds-tag', function () {
  const tag = html`<cds-tag type="red">test-tag</cds-tag>`;
  it('should render', async () => {
    const el = await fixture(tag);
    await expect(el).dom.to.equalSnapshot();
  });

  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(tag);
      await expect(el).to.be.accessible();
    });
  });

  describe('cds-dismissible-tag', () => {
    const dismissibleTag = html`<cds-dismissible-tag
      tag-title="Close tag"
      text="Tag content"></cds-dismissible-tag>`;

    it('should render', async () => {
      const el = await fixture(dismissibleTag);
      await expect(el).dom.to.equalSnapshot();
    });

    it('should support onClose event', async () => {
      const el = await fixture(dismissibleTag);
      await el.updateComplete;

      const buttonElement = el.shadowRoot.querySelector('button');
      const listener = oneEvent(el, 'cds-dismissible-tag-closed');
      buttonElement.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail).to.deep.equal({
        triggeredBy: buttonElement,
      });
    });

    it('should respect decorator prop', async () => {
      const dismissibleTag = html` <cds-dismissible-tag
        tag-title="Close tag"
        text="Tag content">
        <cds-ai-label slot="decorator" alignment="bottom-left">
          <div slot="body-text">
            <p class="secondary">AI Explained</p>
            <h2 class="ai-label-heading">84%</h2>
            <p class="secondary bold">Confidence score</p>
            <p class="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p class="secondary">Model type</p>
            <p class="bold">Foundation model</p>
          </div>
        </cds-ai-label>
      </cds-dismissible-tag>`;

      const el = await fixture(dismissibleTag);

      const slot = el.shadowRoot.querySelector('slot[name="decorator"]');
      const assigned = slot.assignedNodes({ flatten: true });

      const aiLabel = assigned.find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName.toLowerCase() === 'cds-ai-label'
      );

      expect(aiLabel).to.exist;
    });

    it('should respect deprecated slug prop', async () => {
      const dismissibleTag = html` <cds-dismissible-tag
        tag-title="Close tag"
        text="Tag content">
        <cds-ai-label slot="slug" alignment="bottom-left">
          <div slot="body-text">
            <p class="secondary">AI Explained</p>
            <h2 class="ai-label-heading">84%</h2>
            <p class="secondary bold">Confidence score</p>
            <p class="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p class="secondary">Model type</p>
            <p class="bold">Foundation model</p>
          </div>
        </cds-ai-label>
      </cds-dismissible-tag>`;

      const el = await fixture(dismissibleTag);

      const slot = el.shadowRoot.querySelector('slot[name="slug"]');
      const assigned = slot.assignedNodes({ flatten: true });

      const aiLabel = assigned.find(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName.toLowerCase() === 'cds-ai-label'
      );

      expect(aiLabel).to.exist;
    });
  });

  it('should allow for a custom label', async () => {
    const tag = html`<cds-tag type="red">Johnny Ramone</cds-tag>`;
    const el = await fixture(tag);

    const slot = el.shadowRoot.querySelector('.cds--tag__label slot');
    const assigned = slot.assignedNodes({ flatten: true });

    const label = assigned.find(
      (node) => node.textContent.trim() === 'Johnny Ramone'
    );

    expect(label).to.exist;
  });

  it('should allow for a custom icon', async () => {
    const tag = html`<cds-tag type="red"
      >${Add16({ slot: 'icon' })} Dee Dee Ramone</cds-tag
    >`;
    const el = await fixture(tag);

    await el.updateComplete;

    const slot = el.shadowRoot.querySelector('slot[name="icon"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const icon = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'svg'
    );

    expect(icon).to.exist;
  });

  it('should respect decorator prop', async () => {
    const tag = html` <cds-tag type="red">
      <cds-ai-label slot="decorator" alignment="bottom-left">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">84%</h2>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-ai-label>
    </cds-tag>`;
    const el = await fixture(tag);

    const slot = el.shadowRoot.querySelector('slot[name="decorator"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  it('should respect deprecated slug prop', async () => {
    const tag = html` <cds-tag type="red">
      <cds-ai-label slot="slug" alignment="bottom-left">
        <div slot="body-text">
          <p class="secondary">AI Explained</p>
          <h2 class="ai-label-heading">84%</h2>
          <p class="secondary bold">Confidence score</p>
          <p class="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p class="secondary">Model type</p>
          <p class="bold">Foundation model</p>
        </div>
      </cds-ai-label>
    </cds-tag>`;
    const el = await fixture(tag);

    const slot = el.shadowRoot.querySelector('slot[name="slug"]');
    const assigned = slot.assignedNodes({ flatten: true });

    const aiLabel = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === 'cds-ai-label'
    );

    expect(aiLabel).to.exist;
  });

  describe('cds-selectable-tag', () => {
    const selectableTag = html`<cds-selectable-tag
      text="Tag content"></cds-selectable-tag>`;

    it('should render a selectable tag', async () => {
      const el = await fixture(selectableTag);

      await expect(el).dom.to.equalSnapshot();
    });

    it('should select the selectable tag', async () => {
      const el = await fixture(selectableTag);

      const buttonElement = el.shadowRoot.querySelector('cds-tag');
      buttonElement.click();

      await el.updateComplete;

      expect(el.hasAttribute('selected')).to.be.true;

      const tag = el.shadowRoot.querySelector('cds-tag');
      expect(tag.hasAttribute('aria-pressed')).to.be.true;
    });

    it('should call cds-selectable-tag-beingselected', async () => {
      const el = await fixture(selectableTag);
      await el.updateComplete;

      const buttonElement = el.shadowRoot.querySelector('cds-tag');
      const listener = oneEvent(el, 'cds-selectable-tag-beingselected');
      buttonElement.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail).to.deep.equal({
        triggeredBy: buttonElement,
      });
    });

    it('should call cds-selectable-tag-selected', async () => {
      const el = await fixture(selectableTag);
      await el.updateComplete;

      const buttonElement = el.shadowRoot.querySelector('cds-tag');
      const listener = oneEvent(el, 'cds-selectable-tag-selected');
      buttonElement.click();
      const event = await listener;

      expect(event).to.exist;
      expect(event.detail).to.deep.equal({
        triggeredBy: buttonElement,
      });
    });
  });

  describe('cds-skeleton-tag', () => {
    it('should render a skeleton state', async () => {
      const skeletonTag = html`<cds-tag-skeleton></cds-tag-skeleton>`;
      const el = await fixture(skeletonTag);

      await expect(el).dom.to.equalSnapshot();
    });

    it('should render a skeleton state with a small size', async () => {
      const skeletonTag = html`<cds-tag-skeleton size="sm"></cds-tag-skeleton>`;
      const el = await fixture(skeletonTag);

      const spanElement = el.shadowRoot.querySelector('span');

      expect(spanElement.classList.contains('cds--layout--size-sm')).to.be.true;
    });
  });

  describe('cds-operational-tag', () => {
    it('should render a operational state', async () => {
      const operationalTag = html`<cds-operational-tag
        type="red"
        text="Tag content"></cds-operational-tag>`;
      const el = await fixture(operationalTag);

      await expect(el).dom.to.equalSnapshot();
    });
  });

  it('should render as a filter tag', async () => {
    const tag = html`<cds-tag filter>Tag content</cds-tag>`;
    const el = await fixture(tag);

    const closeIcon = el.shadowRoot.querySelector(
      'button.cds--tag__close-icon'
    );

    expect(closeIcon).to.exist;
  });

  it('should handle close button click', async () => {
    const tag = html`<cds-tag filter title="Close tag">onClose</cds-tag>`;
    const el = await fixture(tag);
    await el.updateComplete;

    const buttonElement = el.shadowRoot.querySelector(
      'button.cds--tag__close-icon'
    );
    const listener = oneEvent(el, 'cds-tag-closed');
    buttonElement.click();
    const event = await listener;

    expect(event).to.exist;
    expect(event.detail).to.deep.equal({
      triggeredBy: buttonElement,
    });
  });
});
