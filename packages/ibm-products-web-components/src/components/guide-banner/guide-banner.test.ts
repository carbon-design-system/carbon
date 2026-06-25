/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import CDSGuideBanner, { blockClass } from './guide-banner';

const defaultEvents = {
  handleToggle: () => {},
  handleClose: () => {},
};

const defaultProps = {
  collapseText: 'Collapse',
  expandText: 'Expand',
  open: false,
  titleText: 'Test title',
};

const defaultSlots = {
  header: 'Test header content',
  body: 'Test body content',
  footer: 'Test footer content',
};

const templateArgs = {
  events: defaultEvents,
  props: defaultProps,
  slots: defaultSlots,
};

const template = (args = {}) => {
  const { props, slots, events } = { ...templateArgs, ...args };
  return html`
    <c4p-guide-banner
      @c4p-guidebanner-toggle=${events.handleToggle}
      @c4p-guidebanner-close=${events.handleClose}
      class=${blockClass}
      collapseText=${props.collapseText}
      expandText=${props.expandText}
      ?open=${props.open}
      titleText=${props.titleText}
    >
      <div slot="header">
        <div class="header">${slots.header}</div>
      </div>
      <div slot="body">
        <div class="body">${slots.body}</div>
      </div>
      <div slot="footer">
        <div class="footer">${slots.footer}</div>
      </div>
    </c4p-guide-banner>
  `;
};

describe('c4p-guide-banner', () => {
  it('renders guide-banner', async () => {
    const el: CDSGuideBanner = await fixture(template());
    expect(el).toBeDefined();
  });

  it('renders a title', async () => {
    const el: CDSGuideBanner = await fixture(template());
    expect(el).toBeDefined();
    expect(el.titleText).to.equal(defaultProps.titleText);
    const titleEl = el.shadowRoot?.querySelector(`.${blockClass}__title`);
    expect(titleEl).toBeDefined();
  });

  it('renders a header', async () => {
    const el: CDSGuideBanner = await fixture(template());
    const slot = el.shadowRoot?.querySelector(
      `slot[name="header"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.header);
  });

  it('renders a body', async () => {
    const el: CDSGuideBanner = await fixture(
      template({ props: { open: true } })
    );
    const slot = el.shadowRoot?.querySelector(
      `slot[name="body"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.body);
  });

  it('renders a footer', async () => {
    const el: CDSGuideBanner = await fixture(
      template({ props: { open: true } })
    );
    const slot = el.shadowRoot?.querySelector(
      `slot[name="footer"]`
    ) as HTMLSlotElement;
    expect(slot).toBeTruthy();
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe(defaultSlots.footer);
  });

  it('fires toggle handler', async () => {
    const el: CDSGuideBanner = await fixture(template());
    const toggleBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__toggle-button`
    ) as HTMLElement;
    const listener = oneEvent(el, 'c4p-guidebanner-toggle');
    toggleBtn?.click();
    const { detail } = await listener;
    expect(detail).toBeTruthy();
  });

  it('fires close handler', async () => {
    const el: CDSGuideBanner = await fixture(
      template({ props: { open: true } })
    );
    const closeBtn = el.shadowRoot?.querySelector(
      `.${blockClass}__close-button`
    ) as HTMLElement;
    const listener = oneEvent(el, 'c4p-guidebanner-close');
    closeBtn?.click();
    const { detail } = await listener;
    expect(detail).toBeTruthy();
  });
});
