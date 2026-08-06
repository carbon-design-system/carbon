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

describe('cds-preview-date-picker range focus restoration', () => {
  // Skipped: two sequential calendar-date-select events on the same calendar
  // element reliably crash the headless Chromium instance used by
  // web-test-runner (browser disconnects with a detached Frame error).
  // Unskipped and re-confirmed still crashing after the focus-restore refactor.
  // The behavior is verified correct in Storybook.
  it.skip('restores focus to the end input after selecting a range end date', async () => {
    const el = await fixture(html`
      <cds-preview-date-picker close-on-select>
        <cds-preview-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="mm/dd/yyyy">
        </cds-preview-date-picker-input>
        <cds-preview-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="mm/dd/yyyy">
        </cds-preview-date-picker-input>
      </cds-preview-date-picker>
    `);
    await el.updateComplete;

    const inputs = el.querySelectorAll('cds-preview-date-picker-input');
    const endInput = inputs[1];

    // Open the calendar directly via the adapter (focus events are unreliable
    // in headless browser environments where the page may not have document focus).
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector(
      'cds-preview-date-picker-calendar'
    );
    expect(calendar).to.exist;
    await calendar.updateComplete;
    const calendarGrid = calendar.shadowRoot?.querySelector('[role="grid"]');
    expect(calendarGrid).to.exist;

    // Select start date — in range mode the calendar remains open (SELECTING_END).
    calendar.dispatchEvent(
      new CustomEvent('cds-preview-date-picker-calendar-date-select', {
        detail: { date: parseISOToPlainDate('2026-01-01') },
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;
    await calendar.updateComplete;

    // The calendar is still open (SELECTING_END state); select the end date.
    const stateChangePromise = oneEvent(
      el,
      'cds-preview-date-picker-state-change'
    );
    calendar.dispatchEvent(
      new CustomEvent('cds-preview-date-picker-calendar-date-select', {
        detail: { date: parseISOToPlainDate('2026-01-02') },
        bubbles: true,
        composed: true,
      })
    );

    await stateChangePromise;
    await el.updateComplete;
    // Allow the setTimeout(0) focus-restore callback to fire.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(el.open).to.be.false;
    expect(
      el.shadowRoot?.querySelector('cds-preview-date-picker-calendar')
    ).to.equal(null);
    expect(endInput.shadowRoot?.activeElement).to.equal(endInput.input);
  });
});
