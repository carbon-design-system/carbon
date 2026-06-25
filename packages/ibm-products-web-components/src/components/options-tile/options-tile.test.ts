/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { describe, expect, it } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import CDSOptionsTile, { blockClass } from './options-tile';

const defaultEvents = {
  handleOpen: () => {},
  handleClose: () => {},
};

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

const templateArgs = {
  events: defaultEvents,
  props: defaultProps,
  slots: defaultSlots,
};

const template = (args = {}) => {
  const { props, slots, events } = { ...templateArgs, ...args };
  return html`
    <c4p-options-tile
      id="my-tile"
      ?defaultOpen=${props.defaultOpen}
      size=${props.size}
      titleText=${props.titleText}
      titleId=${props.titleId}
      @c4p-options-tile-open=${events.handleOpen}
      @c4p-options-tile-close=${events.handleClose}
    >
      <div slot="summary">
        <span class="summary">${slots.summary}</span>
      </div>
      <div slot="toggle">
        <span class="toggle">${slots.toggle}</span>
      </div>
      <div slot="body">
        <span class="body">${slots.body}</span>
      </div>
    </c4p-options-tile>
  `;
};

describe('c4p-options-tile', () => {
  it('renders options tile', async () => {
    const el: CDSOptionsTile = await fixture(template());
    expect(el).toBeDefined();
  });

  it('renders a title', async () => {
    const el: CDSOptionsTile = await fixture(template());
    expect(el).toBeDefined();
    expect(el.titleText).to.equal(defaultProps.titleText);
    const titleEl = el.shadowRoot?.querySelector(`.${blockClass}__title`);
    expect(titleEl).toBeDefined();
    const id = titleEl?.getAttribute('id');
    expect(id).to.equal(defaultProps.titleId);
  });

  it('renders a summary', async () => {
    const el: CDSOptionsTile = await fixture(template());
    const slot = el.shadowRoot?.querySelector(
      `slot[name="summary"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.summary);
  });

  it('renders a toggle', async () => {
    const el: CDSOptionsTile = await fixture(template());
    const slot = el.shadowRoot?.querySelector(
      `slot[name="toggle"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.toggle);
  });

  it('renders a body', async () => {
    const el: CDSOptionsTile = await fixture(
      template({ props: { defaultOpen: true } })
    );
    const slot = el.shadowRoot?.querySelector(
      `slot[name="body"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.body);
  });

  it('fires open handler', async () => {
    const el: CDSOptionsTile = await fixture(template());
    const header = el.shadowRoot?.querySelector(
      `.${blockClass}__header`
    ) as HTMLElement;
    const listener = oneEvent(el, 'c4p-options-tile-open');
    header?.click();
    const { detail } = await listener;
    expect(detail).toBeTruthy();
  });

  it('fires close handler', async () => {
    const el: CDSOptionsTile = await fixture(
      template({ props: { defaultOpen: true } })
    );
    const header = el.shadowRoot?.querySelector(
      `.${blockClass}__header`
    ) as HTMLElement;
    const listener = oneEvent(el, 'c4p-options-tile-close');
    header?.click();
    const { detail } = await listener;
    expect(detail).toBeTruthy();
  });

  it('has xl class when size is xl', async () => {
    const el: CDSOptionsTile = await fixture(
      template({ props: { size: 'xl' } })
    );
    const node = el.shadowRoot?.querySelector(
      `.${blockClass}--xl`
    ) as HTMLSlotElement;
    expect(node).toBeTruthy();
  });
});
