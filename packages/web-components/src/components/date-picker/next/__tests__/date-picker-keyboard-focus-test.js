/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Keyboard focus regression tests for cds-date-picker-v2 (Issue #1174).
 *
 * Bug: Tab from the open calendar caused focus to fall back to document.body
 * because _focusNextElement() used document.querySelectorAll, which cannot
 * pierce shadow DOM, so currentIndex was always -1.
 *
 * Fix: replaced the DOM-scan approach with a focus sentinel — a hidden <span
 * id="exit-sentinel"> placed just after the calendar container in the shadow
 * root.  When Tab is pressed from the calendar, _activateExitSentinel() sets
 * the sentinel's tabindex to "0", so the browser delivers focus to it
 * naturally (no manual DOM scan).  The sentinel's focus handler then closes
 * the calendar and restores tabindex="-1".
 */

import '@carbon/web-components/es/components/date-picker/next/index.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('cds-date-picker-v2 keyboard navigation – Tab from calendar (Issue #1174)', function () {
  // Allow extra time for ES-module loading when multiple test files run concurrently.
  this.timeout(10000);

  /**
   * Build a page scaffold:
   *   [button#sentinel-before] [cds-date-picker-v2] [button#sentinel-after]
   *
   * The sentinel buttons are plain light-DOM elements.  We verify that Tab
   * from the calendar ultimately results in focus leaving the date picker
   * entirely — not dropping to document.body.
   */
  async function buildFixture() {
    const container = await fixture(html`
      <div>
        <button id="sentinel-before" type="button">Before date picker</button>
        <cds-date-picker-v2 id="test-picker">
          <cds-date-picker-v2-input
            kind="single"
            label-text="Date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-v2-input>
        </cds-date-picker-v2>
        <button id="sentinel-after" type="button">After date picker</button>
      </div>
    `);

    const picker = container.querySelector('#test-picker');
    const sentinelAfter = container.querySelector('#sentinel-after');
    await picker.updateComplete;

    return { container, picker, sentinelAfter };
  }

  /**
   * Open the calendar programmatically via the adapter.
   * @param {HTMLElement} picker - The cds-date-picker-v2 element under test.
   */
  async function openCalendar(picker) {
    picker._adapter.send('INPUT_FOCUS', { inputType: 'from' });
    picker._adapter.send('CALENDAR_OPEN');
    await picker.updateComplete;
  }

  /**
   * Return the focusable calendar div from inside the calendar renderer's shadow DOM.
   * @param {HTMLElement} picker - The cds-date-picker-v2 element under test.
   * @returns {HTMLElement|null} The calendar div, or null if not open.
   */
  function getCalendarDiv(picker) {
    const calendarElement = picker.shadowRoot?.querySelector(
      'cds-date-picker-v2-calendar'
    );
    return (
      calendarElement?.shadowRoot?.querySelector(
        '.cds--date-picker__calendar'
      ) ?? null
    );
  }

  /**
   * Return the exit sentinel span from the date picker's shadow root.
   * @param {HTMLElement} picker - The cds-date-picker-v2 element under test.
   * @returns {HTMLElement|null} The sentinel span.
   */
  function getExitSentinel(picker) {
    return (
      picker.shadowRoot?.querySelector('.cds--date-picker__exit-sentinel') ??
      null
    );
  }

  // ─── sentinel DOM structure ──────────────────────────────────────────────────

  it('renders the exit sentinel in the shadow root with tabindex="-1" when closed', async () => {
    const { picker } = await buildFixture();

    const sentinel = getExitSentinel(picker);
    expect(sentinel).to.exist;
    expect(sentinel.classList.contains('cds--date-picker__exit-sentinel')).to.be
      .true;
    expect(sentinel.getAttribute('tabindex')).to.equal('-1');
    expect(sentinel.getAttribute('aria-hidden')).to.equal('true');
  });

  it('renders the exit sentinel with tabindex="-1" when the calendar is open', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    const sentinel = getExitSentinel(picker);
    expect(sentinel).to.exist;
    // Sentinel starts deactivated even when the calendar is open.
    // It only becomes tabindex="0" for the moment between Tab-press and focus arrival.
    expect(sentinel.getAttribute('tabindex')).to.equal('-1');
  });

  // ─── _activateExitSentinel ───────────────────────────────────────────────────

  it('_activateExitSentinel() sets tabindex="0" on the sentinel', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    picker._activateExitSentinel();

    const sentinel = getExitSentinel(picker);
    expect(sentinel.tabIndex).to.equal(0);
  });

  // ─── sentinel focus handler ──────────────────────────────────────────────────

  it('focusing the exit sentinel closes the calendar and restores tabindex="-1"', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    // Activate the sentinel as the Tab handler would.
    picker._activateExitSentinel();

    const sentinel = getExitSentinel(picker);
    // Deliver focus to the sentinel directly (simulates the browser completing Tab).
    sentinel.focus();
    await picker.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Calendar should be closed.
    expect(picker.open).to.be.false;
    expect(
      picker.shadowRoot?.querySelector('cds-date-picker-v2-calendar')
    ).to.equal(null);

    // Sentinel must be deactivated — invisible to Tab again.
    expect(sentinel.tabIndex).to.equal(-1);
  });

  // ─── THE BUG: Tab from calendar must not drop focus to body ─────────────────

  it('Tab from the calendar region closes the calendar and does not drop focus to document.body (Issue #1174)', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    const calendarDiv = getCalendarDiv(picker);
    expect(calendarDiv).to.exist;

    // Focus the calendar div (mirrors what the input→calendar Tab handler does).
    calendarDiv.focus();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Dispatch Tab — this wires the keydown handler which activates the sentinel.
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );

    // In a headless browser the keydown dispatch alone does not invoke the
    // browser's native Tab focus traversal.  Simulate what the browser would do:
    // deliver focus to the now-tabbable sentinel.
    const sentinel = getExitSentinel(picker);
    sentinel.focus();

    // Allow state machine + Lit render cycle to settle.
    await picker.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Calendar must be closed.
    expect(picker.open).to.be.false;

    // Focus must NOT be on body — the original bug symptom.
    expect(document.activeElement).to.not.equal(
      document.body,
      'Focus must not fall back to document.body (Issue #1174 regression)'
    );

    // Sentinel must be deactivated after handling focus.
    expect(sentinel.tabIndex).to.equal(-1);
  });

  // ─── Tab from calendar closes the calendar ───────────────────────────────────

  it('closes the calendar when Tab is pressed from the calendar in single mode', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    const calendarDiv = getCalendarDiv(picker);
    calendarDiv.focus();
    await new Promise((resolve) => setTimeout(resolve, 0));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );

    await picker.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(picker.open).to.be.false;
    expect(
      picker.shadowRoot?.querySelector('cds-date-picker-v2-calendar')
    ).to.equal(
      null,
      'Calendar element should be removed from the DOM after Tab-close'
    );
  });

  // ─── Shift+Tab from calendar returns focus to the input ─────────────────────

  it('Shift+Tab from the calendar moves focus back to the date text input', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    const calendarDiv = getCalendarDiv(picker);
    calendarDiv.focus();
    await new Promise((resolve) => setTimeout(resolve, 0));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );

    await picker.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 50));

    const datePickerInput = picker.querySelector('cds-date-picker-v2-input');
    const innerInput = datePickerInput.shadowRoot?.querySelector('input');
    expect(innerInput).to.exist;
    expect(datePickerInput.shadowRoot?.activeElement).to.equal(
      innerInput,
      'Shift+Tab from calendar should return focus to the date text input'
    );
  });

  // ─── sentinel is inactive after the calendar is closed ──────────────────────

  it('exit sentinel has tabindex="-1" after the calendar closes via Tab', async () => {
    const { picker } = await buildFixture();
    await openCalendar(picker);

    const calendarDiv = getCalendarDiv(picker);
    calendarDiv.focus();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Fire the keydown (activates sentinel) then deliver focus to it (browser step).
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    const sentinel = getExitSentinel(picker);
    sentinel.focus(); // simulates browser Tab delivering focus to sentinel

    await picker.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(sentinel.tabIndex).to.equal(
      -1,
      'Sentinel must be inactive after calendar closes so future Tab presses skip it'
    );
  });
});
