/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/date-picker/next/index.js';
import { fixture, html, expect, oneEvent } from '@open-wc/testing';

/**
 * Parse an ISO date string to a Temporal.PlainDate.
 * Inline helper to avoid importing from @carbon-labs/primitives which requires
 * a bundler to resolve its package exports map in the test environment.
 *
 * @param {string} isoString - ISO 8601 date string (e.g. '2026-01-15')
 * @returns {Temporal.PlainDate} The parsed plain date
 */
function parseISOToPlainDate(isoString) {
  return Temporal.PlainDate.from(isoString);
}

/**
 * Helper: open the calendar via the state machine adapter (avoids relying on
 * focus events which are unreliable in headless browser environments).
 *
 * @param {HTMLElement} el - The cds-preview-date-picker element
 */
async function openCalendar(el) {
  el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
  el._adapter.send('CALENDAR_OPEN');
  await el.updateComplete;
  const cal = el.shadowRoot?.querySelector('cds-preview-date-picker-calendar');
  if (cal) {
    await cal.updateComplete;
  }
  return cal;
}

/**
 * Helper: select a date via the calendar element.
 *
 * @param {HTMLElement} el - The cds-preview-date-picker element
 * @param {HTMLElement} cal - The cds-preview-date-picker-calendar element
 * @param {string} isoDate - ISO date string to select
 */
async function selectDate(el, cal, isoDate) {
  const stateChange = oneEvent(el, 'cds-preview-date-picker-state-change');
  cal.dispatchEvent(
    new CustomEvent('cds-preview-date-picker-calendar-date-select', {
      detail: { date: parseISOToPlainDate(isoDate) },
      bubbles: true,
      composed: true,
    })
  );
  await stateChange;
  await el.updateComplete;
  // Allow the setTimeout(0) focus-restore callback to fire.
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('cds-preview-date-picker icon-click reopen', () => {
  it('reopens the calendar when the icon is clicked after a date has been selected', async () => {
    const el = await fixture(html`
      <cds-preview-date-picker close-on-select>
        <cds-preview-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `);
    await el.updateComplete;

    const inputEl = el.querySelector('cds-preview-date-picker-input');

    // 1. Open and select a date — calendar should close.
    const cal = await openCalendar(el);
    expect(cal).to.exist;
    await selectDate(el, cal, '2026-06-15');

    expect(el.open).to.be.false;
    expect(
      el.shadowRoot?.querySelector('cds-preview-date-picker-calendar')
    ).to.equal(null);

    // 2. Simulate clicking the calendar icon.
    //    The icon is a <button tabindex="-1"> that dispatches cds-preview-date-picker-icon-click
    //    without moving focus to the text input, so the calendar must reopen via the
    //    icon-click path alone — not via the input focus path.
    inputEl.dispatchEvent(
      new CustomEvent('cds-preview-date-picker-icon-click', {
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.shadowRoot?.querySelector('cds-preview-date-picker-calendar')).to
      .exist;
  });

  it('reopens the calendar when the icon is clicked after a date has been selected (FOCUSED state)', async () => {
    const el = await fixture(html`
      <cds-preview-date-picker close-on-select>
        <cds-preview-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `);
    await el.updateComplete;

    const inputEl = el.querySelector('cds-preview-date-picker-input');

    // 1. Select a date so state lands on DATE_SELECTED, then simulate an
    //    INPUT_FOCUS event (as if the focus was programmatically restored) so
    //    the machine advances to FOCUSED — which is the state the user is in
    //    when they then click the icon.
    const cal = await openCalendar(el);
    expect(cal).to.exist;
    await selectDate(el, cal, '2026-06-15');

    // Simulate the focus restore completing (machine is now FOCUSED).
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    await el.updateComplete;

    expect(el.open).to.be.false;

    // 2. Click the icon — should open from FOCUSED state.
    inputEl.dispatchEvent(
      new CustomEvent('cds-preview-date-picker-icon-click', {
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.shadowRoot?.querySelector('cds-preview-date-picker-calendar')).to
      .exist;
  });
});
