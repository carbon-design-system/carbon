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

const query = (el, element) =>
  el.shadowRoot.querySelector(`.${blockClass}__${element}`);

describe('cds-options-tile', () => {
  it('renders options tile', async () => {
    const el = await fixture(template());
    expect(el.tagName.toLowerCase()).to.equal('cds-options-tile');
  });

  it('renders a title', async () => {
    const el = await fixture(template());
    expect(query(el, 'title').id).to.equal(defaultProps.titleId);
    expect(query(el, 'title').textContent.trim()).to.equal(
      defaultProps.titleText
    );
    expect(query(el, 'title').getAttribute('role')).to.equal('heading');
    expect(query(el, 'title').getAttribute('aria-level')).to.equal('2');
  });

  for (const name of ['summary', 'toggle', 'body']) {
    it(`renders a ${name}`, async () => {
      const el = await fixture(
        template({ ...defaultProps, defaultOpen: true })
      );
      const slot = el.shadowRoot.querySelector(`slot[name="${name}"]`);
      expect(slot.assignedNodes()[0].textContent.trim()).to.equal(
        defaultSlots[name]
      );
    });
  }

  it('fires open handler', async () => {
    const el = await fixture(template());
    const listener = oneEvent(el, CDSOptionsTile.eventOpen);
    query(el, 'chevron-button').click();
    const { detail } = await listener;
    expect(detail.open).to.be.true;
  });

  it('fires close handler', async () => {
    const el = await fixture(template({ ...defaultProps, defaultOpen: true }));
    const listener = oneEvent(el, CDSOptionsTile.eventClose);
    query(el, 'chevron-button').click();
    const { detail } = await listener;
    expect(detail.open).to.be.false;
  });

  it('toggles only from the chevron button', async () => {
    const el = await fixture(template());
    const button = query(el, 'chevron-button');
    const content = query(el, 'content');
    expect(button.getAttribute('aria-expanded')).to.equal('false');
    expect(button.getAttribute('aria-controls')).to.equal(content.id);
    expect(button.getAttribute('aria-labelledby')).to.equal(
      defaultProps.titleId
    );
    expect(content.hidden).to.be.true;

    query(el, 'title').click();
    await el.updateComplete;
    expect(button.getAttribute('aria-expanded')).to.equal('false');

    button.click();
    await el.updateComplete;
    expect(button.getAttribute('aria-expanded')).to.equal('true');
    expect(content.hidden).to.be.false;
  });

  it('renders the action slot in place of the toggle', async () => {
    const el = await fixture(html`
      <cds-options-tile titleText="Audio">
        <button slot="action">Mute</button>
        <span slot="toggle">Toggle</span>
      </cds-options-tile>
    `);
    const action = query(el, 'action');
    const toggleSlot = el.shadowRoot.querySelector('slot[name="toggle"]');
    expect(action.hidden).to.be.false;
    expect(
      action.querySelector('slot[name="action"]').assignedElements()[0]
        .textContent
    ).to.equal('Mute');
    expect(toggleSlot.hidden).to.be.true;
  });

  it('hides the action area when neither action nor toggle is slotted', async () => {
    const el = await fixture(
      html`<cds-options-tile titleText="Plain"></cds-options-tile>`
    );
    expect(query(el, 'action').hidden).to.be.true;
  });

  it('shows invalid, then warn, then locked text in the summary', async () => {
    const el = await fixture(html`
      <cds-options-tile
        titleText="Tile"
        invalid
        invalidText="Invalid"
        warn
        warnText="Warn"
        locked
        lockedText="Locked"></cds-options-tile>
    `);
    const summary = () => query(el, 'summary');
    expect(summary().textContent.trim()).to.equal('Invalid');
    expect(summary().classList.contains(`${blockClass}__summary--invalid`)).to
      .be.true;

    el.invalid = false;
    await el.updateComplete;
    expect(summary().textContent.trim()).to.equal('Warn');

    el.warn = false;
    await el.updateComplete;
    expect(summary().textContent.trim()).to.equal('Locked');
  });

  it('keeps the summary and shows lockedText in the body when locked', async () => {
    const el = await fixture(html`
      <cds-options-tile titleText="Tile" locked lockedText="Locked" open>
        <span slot="summary">Summary</span>
        <div slot="body">Body</div>
      </cds-options-tile>
    `);
    await el.updateComplete;
    const summarySlot = el.shadowRoot.querySelector('slot[name="summary"]');
    expect(summarySlot.hidden).to.be.false;
    expect(query(el, 'locked-text').textContent.trim()).to.equal('Locked');
  });

  it('can be controlled with the open property', async () => {
    const el = await fixture(template());
    el.open = true;
    await el.updateComplete;
    expect(query(el, 'chevron-button').getAttribute('aria-expanded')).to.equal(
      'true'
    );
    expect(query(el, 'content').hidden).to.be.false;
  });

  it('has xl class when size is xl', async () => {
    const el = await fixture(template({ ...defaultProps, size: 'xl' }));
    expect(el.shadowRoot.querySelector(`.${blockClass}--xl`)).to.exist;
  });
});
