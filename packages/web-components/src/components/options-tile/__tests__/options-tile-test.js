/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fixture, html, oneEvent, expect } from '@open-wc/testing';
import '@carbon/web-components/es/components/options-tile/index.js';
import CDSOptionsTile, {
  blockClass,
} from '@carbon/web-components/es/components/options-tile/options-tile.js';

const defaultProps = {
  defaultOpen: false,
  size: 'lg',
  titleText: 'Test title',
  titleId: 'test-title',
};

const defaultSlots = {
  body: 'Test body content.',
  summary: 'Test summary',
  toggle: 'Toggle element',
};

const template = (props = defaultProps, slots = defaultSlots) => html`
  <cds-options-tile
    id="my-tile"
    ?defaultOpen=${props.defaultOpen}
    size=${props.size}
    titleText=${props.titleText}
    titleId=${props.titleId}>
    <div slot="summary">
      <span class="summary">${slots.summary}</span>
    </div>
    <div slot="toggle">
      <span class="toggle">${slots.toggle}</span>
    </div>
    <div slot="body">
      <span class="body">${slots.body}</span>
    </div>
  </cds-options-tile>
`;

describe('cds-options-tile', () => {
  it('renders options tile', async () => {
    const el = await fixture(template());
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-options-tile');
  });

  it('renders a title', async () => {
    const el = await fixture(template());
    expect(el.titleText).to.equal(defaultProps.titleText);

    const titleEl = el.shadowRoot?.querySelector(`.${blockClass}__title`);
    expect(titleEl).to.exist;
    expect(titleEl?.getAttribute('id')).to.equal(defaultProps.titleId);
  });

  it('renders a summary', async () => {
    const el = await fixture(template());
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector('slot[name="summary"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node.innerText).to.equal(defaultSlots.summary);
  });

  it('renders a toggle', async () => {
    const el = await fixture(template());
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector('slot[name="toggle"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node.innerText).to.equal(defaultSlots.toggle);
  });

  it('renders a body', async () => {
    const el = await fixture(template({ ...defaultProps, defaultOpen: true }));
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector('slot[name="body"]');
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0];
    expect(node.innerText).to.equal(defaultSlots.body);
  });

  it('fires open handler', async () => {
    const el = await fixture(template());
    await el.updateComplete;

    const header = el.shadowRoot?.querySelector(`.${blockClass}__header`);
    const listener = oneEvent(el, CDSOptionsTile.eventOpen);
    header?.click();
    const { detail } = await listener;
    expect(detail).to.exist;
  });

  it('fires close handler', async () => {
    const el = await fixture(template({ ...defaultProps, defaultOpen: true }));
    await el.updateComplete;

    const header = el.shadowRoot?.querySelector(`.${blockClass}__header`);
    const listener = oneEvent(el, CDSOptionsTile.eventClose);
    header?.click();
    const { detail } = await listener;
    expect(detail).to.exist;
  });

  it('has xl class when size is xl', async () => {
    const el = await fixture(template({ ...defaultProps, size: 'xl' }));
    await el.updateComplete;

    const node = el.shadowRoot?.querySelector(`.${blockClass}--xl`);
    expect(node).to.exist;
  });
});
