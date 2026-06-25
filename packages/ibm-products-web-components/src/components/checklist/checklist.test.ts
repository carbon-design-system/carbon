/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { html, fixture, oneEvent, elementUpdated } from '@open-wc/testing';
import { carbonPrefix, prefix } from '../../globals/settings';
import CDSChecklist from './checklist';
import CDSChecklistGroup from './checklist-group.js';
import CDSChecklistItem from './checklist-item.js';
import { Kinds } from './checklist.types.js';
import './index.ts';

const blockClass = `${prefix}--checklist`;

describe('c4p-checklist', () => {
  let el: CDSChecklist;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-checklist
        title="Test Title"
        chart-label="5 out of 10 tasks completed"
        chart-value="0.5"
        toggle-label="Toggle"
        toggle-label-align="top"
        toggle-aria-label="Toggle"
        view-all-label="View All"
      ></c4p-checklist>
    `);
  });

  it('renders with default properties', () => {
    const shadow = el.shadowRoot!;
    // Render title
    expect(shadow!.textContent!).to.include('Test Title');
    // Render chartLabel
    expect(shadow!.textContent!).to.include('5 out of 10 tasks completed');
    // Render chart
    const chart = shadow!.querySelector(`.${blockClass}__chart`)!;
    expect(chart).to.exist;
    // Render toggle button
    const toggleButton = shadow!.querySelector(`.${blockClass}__toggle`)!;
    expect(toggleButton).to.exist;
    // Checklist should be in collapsed state
    expect(el.open).to.be.false;
  });

  it('toggles open state and fires checklistToggle event', async () => {
    const shadow = el.shadowRoot!;
    const toggleButton = shadow!.querySelector(
      `.${blockClass}__toggle`
    ) as HTMLButtonElement | null;

    // Listen for event before clicking
    setTimeout(() => toggleButton?.click());
    const ev = await oneEvent(el, CDSChecklist.checklistToggle);

    // Verify open property updated
    expect(el.open).to.be.true;
    expect(ev).to.exist;
  });

  it('fires checklistViewAll event on viewAll button click', async () => {
    const shadow = el.shadowRoot!;
    const link = Array.from(
      shadow!.querySelectorAll(`${carbonPrefix}-link`)
    ).find((a) => a.textContent?.trim() === 'View All') as HTMLElement | null;
    expect(link).toBeTruthy();
    setTimeout(() => link?.click());
    const ev = await oneEvent(el, CDSChecklist.checklistViewAll);
    expect(ev).to.exist;
  });

  it('does not render toggle button if disableToggle is true', async () => {
    el = await fixture(html`
      <c4p-checklist
        title="Test Title"
        chart-label="5 out of 10 tasks completed"
        chart-value="0.5"
        disable-toggle
        toggle-label="Toggle"
        toggle-label-align="top"
        toggle-aria-label="Toggle"
        view-all-label="View All"
      ></c4p-checklist>
    `);
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    const toggleBtn = shadow!.querySelector(`.${blockClass}__toggle`);
    expect(toggleBtn).to.be.null;
  });
});

describe('c4p-checklist-group', () => {
  let el: CDSChecklistGroup;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-checklist-group title="Test Title"></c4p-checklist-group>
    `);
  });

  it('renders group title', () => {
    expect(
      el
        .shadowRoot!.querySelector(`.${blockClass}__list-title`)
        ?.textContent?.trim()
    ).toBe('Test Title');
  });

  it('renders an empty list when no content is provided', () => {
    const ol = el.shadowRoot!.querySelector('ol') as HTMLOListElement;
    expect(ol).to.exist;
    expect(ol.querySelector('li')).to.be.null;
  });

  it('renders checklist items provided via slot', async () => {
    el = await fixture(html`
      <c4p-checklist-group title="Test Title">
        <c4p-checklist-item
          label="task 1"
          status="completed"
        ></c4p-checklist-item>
        <c4p-checklist-item
          label="task 2"
          status="in progress"
        ></c4p-checklist-item>
        <c4p-checklist-item
          label="task 3"
          status="not started"
        ></c4p-checklist-item>
      </c4p-checklist-group>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    expect(slot).toBeDefined();

    // Retrieve the assigned custom elements
    const checklistItems = slot
      .assignedElements()
      .filter((el) => el.tagName.toLowerCase() === 'c4p-checklist-item');

    expect(checklistItems).toHaveLength(3);
  });
});

describe('c4p-checklist-item', () => {
  const label = 'Test Label';
  const status = 'in progress';
  const clickable = true;

  let el: CDSChecklistItem;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-checklist-item
        .label=${label}
        .status=${status}
        .clickable=${clickable}
      ></c4p-checklist-item>
    `);
  });

  it('renders item with correct classes', async () => {
    const itemEl = el.shadowRoot?.querySelector(`.${blockClass}__label`);
    expect(itemEl).to.exist;
    expect(itemEl?.classList.contains(`${blockClass}__label--clickable`)).to.be
      .true;
    expect(itemEl?.textContent?.trim()).to.equal(label);
  });

  it('dispatches "checklistItemClicked" event on click', async () => {
    const itemEl = el.shadowRoot?.querySelector(
      `.${blockClass}__label--clickable`
    ) as HTMLElement | null;

    // Use oneEvent to await the custom event
    setTimeout(() => itemEl?.click());
    const event = await oneEvent(el, CDSChecklistItem.checklistItemClicked);

    expect(event).to.exist;
  });

  it('maps status to correct kind', () => {
    expect(el['_mapStatusToKind'](status)).to.equal(Kinds.indeterminate);
    expect(el['_mapStatusToKind']('unknown')).to.equal(Kinds.error);
  });
});
