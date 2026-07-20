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

describe('cds-date-picker calendar interaction', () => {
  it('restores focus to the single input after selecting a date', async () => {
    const el = await fixture(html`
      <cds-date-picker close-on-select>
        <cds-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `);
    await el.updateComplete;

    const input = el.querySelector('cds-date-picker-input');

    // Open the calendar directly via the adapter (focus events are unreliable
    // in headless browser environments where the page may not have document focus).
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector('cds-date-picker-calendar');
    expect(calendar).to.exist;
    // Await the calendar's own render cycle so its shadow DOM is ready.
    await calendar.updateComplete;
    const calendarGrid = calendar.shadowRoot?.querySelector('[role="grid"]');
    expect(calendarGrid).to.exist;

    const stateChangePromise = oneEvent(el, 'cds-date-picker-state-change');
    calendar.dispatchEvent(
      new CustomEvent('cds-date-picker-calendar-date-select', {
        detail: {
          date: parseISOToPlainDate('2026-01-01'),
        },
        bubbles: true,
        composed: true,
      })
    );

    await stateChangePromise;
    await el.updateComplete;
    // Allow the setTimeout(0) focus-restore callback to fire.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(el.open).to.be.false;
    expect(el.shadowRoot?.querySelector('cds-date-picker-calendar')).to.equal(
      null
    );
    expect(input.shadowRoot?.activeElement).to.equal(input.input);
  });

  it('reopens the calendar when the closed-input tab handler contract is invoked', async () => {
    const el = await fixture(html`
      <cds-date-picker close-on-select>
        <cds-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `);
    await el.updateComplete;

    const input = el.querySelector('cds-date-picker-input');

    // Open the calendar directly via the adapter (focus events are unreliable
    // in headless browser environments where the page may not have document focus).
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector('cds-date-picker-calendar');
    expect(calendar).to.exist;
    await calendar.updateComplete;

    const stateChangePromise = oneEvent(el, 'cds-date-picker-state-change');
    calendar.dispatchEvent(
      new CustomEvent('cds-date-picker-calendar-date-select', {
        detail: {
          date: parseISOToPlainDate('2026-01-01'),
        },
        bubbles: true,
        composed: true,
      })
    );

    await stateChangePromise;
    await el.updateComplete;
    // Allow the setTimeout(0) focus-restore callback to fire.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(el.open).to.be.false;
    expect(input.shadowRoot?.activeElement).to.equal(input.input);

    const adapter = el._adapter;
    expect(adapter).to.exist;

    adapter.send('INPUT_FOCUS', { inputType: 'from' });
    adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    expect(el.open).to.be.true;
    const reopenedCalendar = el.shadowRoot?.querySelector(
      'cds-date-picker-calendar'
    );
    await reopenedCalendar.updateComplete;
    const reopenedGrid =
      reopenedCalendar?.shadowRoot?.querySelector('[role="grid"]');
    expect(reopenedGrid).to.exist;
  });
  it('keeps the calendar open after selecting a date when close-on-select is false', async () => {
    const el = await fixture(html`
      <cds-date-picker>
        <cds-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `);
    // Setting via property (not attribute) is the only reliable way to pass
    // false for a LitElement Boolean property — close-on-select="false" in HTML
    // would be treated as the truthy string "false".
    el.closeOnSelect = false;
    await el.updateComplete;

    // Open the calendar via the adapter.
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector('cds-date-picker-calendar');
    expect(calendar).to.exist;
    await calendar.updateComplete;

    const stateChangePromise = oneEvent(el, 'cds-date-picker-state-change');
    calendar.dispatchEvent(
      new CustomEvent('cds-date-picker-calendar-date-select', {
        detail: { date: parseISOToPlainDate('2026-01-01') },
        bubbles: true,
        composed: true,
      })
    );

    await stateChangePromise;
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Without close-on-select the calendar must remain open.
    expect(el.open).to.be.true;
    expect(el.shadowRoot?.querySelector('cds-date-picker-calendar')).to.exist;
  });
});

describe('cds-date-picker input click reopens calendar', () => {
  it('reopens the calendar when the input is clicked after a date has been selected and calendar is closed', async () => {
    const el = await fixture(html`
      <cds-date-picker close-on-select>
        <cds-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `);
    await el.updateComplete;

    const input = el.querySelector('cds-date-picker-input');

    // Step 1: Open the calendar via the adapter
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector('cds-date-picker-calendar');
    expect(calendar).to.exist;
    await calendar.updateComplete;

    // Step 2: Select a date — calendar should close
    const stateChangePromise = oneEvent(el, 'cds-date-picker-state-change');
    calendar.dispatchEvent(
      new CustomEvent('cds-date-picker-calendar-date-select', {
        detail: { date: parseISOToPlainDate('2026-01-01') },
        bubbles: true,
        composed: true,
      })
    );

    await stateChangePromise;
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(el.open).to.be.false;
    expect(el.shadowRoot?.querySelector('cds-date-picker-calendar')).to.equal(
      null
    );

    // Step 3: Click the input — calendar should reopen
    // The input already has focus so onFocus will not fire again; only click fires.
    input.dispatchEvent(
      new CustomEvent(`cds-date-picker-input-click`, {
        bubbles: true,
        composed: true,
        detail: { inputType: 'from' },
      })
    );
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(el.shadowRoot?.querySelector('cds-date-picker-calendar')).to.exist;
  });
});

describe('cds-date-picker click-to-close', () => {
  it('closes the calendar when a date button is clicked', async () => {
    const el = await fixture(html`
      <cds-date-picker close-on-select>
        <cds-date-picker-input
          kind="single"
          label-text="Date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `);
    await el.updateComplete;

    // Open the calendar via the adapter.
    el._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    el._adapter.send('CALENDAR_OPEN');
    await el.updateComplete;

    const calendar = el.shadowRoot?.querySelector('cds-date-picker-calendar');
    expect(calendar).to.exist;
    await calendar.updateComplete;

    // Find and click an actual date button in the calendar grid.
    const dayButton = calendar.shadowRoot?.querySelector(
      `.cds--date-picker__day:not([disabled])`
    );
    expect(dayButton).to.exist;
    dayButton.click();

    // Allow state machine + Lit render cycle + focus-restore setTimeout to settle.
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(el.open).to.be.false;
    expect(el.shadowRoot?.querySelector('cds-date-picker-calendar')).to.equal(
      null
    );
  });
});
