/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/edit-in-place/index.js';
import CDSEditInPlace from '@carbon/web-components/es/components/edit-in-place/edit-in-place.js';
import {
  EDIT_IN_PLACE_SIZE,
  TOOLTIP_ALIGNMENT,
} from '@carbon/web-components/es/components/edit-in-place/defs.js';
import { prefix } from '@carbon/web-components/es/globals/settings.js';

const blockClass = `${prefix}--edit-in-place`;

describe('cds-edit-in-place', () => {
  it('renders the component and input in the shadow root', async () => {
    const el = await fixture(html`
      <cds-edit-in-place label-text="Editable field"></cds-edit-in-place>
    `);

    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('cds-edit-in-place');
    expect(el).to.be.instanceOf(CDSEditInPlace);

    const input = el.shadowRoot?.querySelector('input');
    expect(input).to.exist;
  });

  it('reflects public attributes to properties', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        cancel-label="Dismiss"
        default-value="Fallback"
        edit-label="Change"
        invalid-text="Error"
        label-text="Editable field"
        placeholder="Type here"
        read-only-label="Locked"
        read-only-toggletip-text="Read only"
        save-label="Apply"
        size="${EDIT_IN_PLACE_SIZE.MEDIUM}"
        toggletip-alignment="${TOOLTIP_ALIGNMENT.LEFT}"
        tooltip-alignment="${TOOLTIP_ALIGNMENT.BOTTOM}"
        value="Current"></cds-edit-in-place>
    `);

    expect(el.cancelLabel).to.equal('Dismiss');
    expect(el.defaultValue).to.equal('Fallback');
    expect(el.editLabel).to.equal('Change');
    expect(el.invalidText).to.equal('Error');
    expect(el.labelText).to.equal('Editable field');
    expect(el.placeholder).to.equal('Type here');
    expect(el.readOnlyLabel).to.equal('Locked');
    expect(el.readOnlyToggleTipText).to.equal('Read only');
    expect(el.saveLabel).to.equal('Apply');
    expect(el.size).to.equal(EDIT_IN_PLACE_SIZE.MEDIUM);
    expect(el.toggleTipAlignment).to.equal(TOOLTIP_ALIGNMENT.LEFT);
    expect(el.tooltipAlignment).to.equal(TOOLTIP_ALIGNMENT.BOTTOM);
    expect(el.value).to.equal('Current');
  });

  it('renders the invalid state and warning text', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        invalid
        invalid-text="This field is required"
        label-text="Editable field"></cds-edit-in-place>
    `);

    const container = el.shadowRoot?.querySelector(
      `.${blockClass}__container.${blockClass}--invalid`
    );
    const warningText = el.shadowRoot?.querySelector(
      `.${blockClass}__warning-text`
    );

    expect(container).to.exist;
    expect(warningText).to.exist;
    expect(warningText?.textContent?.trim()).to.equal('This field is required');
  });

  it('renders the read-only action when read-only is set', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        read-only
        label-text="Editable field"></cds-edit-in-place>
    `);

    const input = el.shadowRoot?.querySelector('input');
    const readOnlyButton = el.shadowRoot?.querySelector(
      `.${blockClass}__btn-readonly`
    );

    expect(input?.readOnly).to.be.true;
    expect(readOnlyButton).to.exist;
  });

  it('emits a change event when the input value changes', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        value="Before"
        label-text="Editable field"></cds-edit-in-place>
    `);
    const input = el.shadowRoot?.querySelector('input');
    const eventPromise = oneEvent(el, `${prefix}-edit-in-place-change`);

    expect(input).to.exist;
    input.value = 'After';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const event = await eventPromise;
    expect(event.detail.value).to.equal('After');
  });

  it('emits a save event when Enter is pressed after editing', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        value="Before"
        label-text="Editable field"></cds-edit-in-place>
    `);
    const input = el.shadowRoot?.querySelector('input');

    expect(input).to.exist;
    input.value = 'After';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const eventPromise = oneEvent(el, `${prefix}-edit-in-place-save`);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );

    const event = await eventPromise;
    expect(event.detail.value).to.equal('After');
  });

  it('emits a cancel event when Escape is pressed', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        value="Before"
        label-text="Editable field"></cds-edit-in-place>
    `);
    const input = el.shadowRoot?.querySelector('input');

    expect(input).to.exist;
    input.value = 'After';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const eventPromise = oneEvent(el, `${prefix}-edit-in-place-cancel`);
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    const event = await eventPromise;
    expect(event.detail.value).to.equal('Before');
  });

  it('keeps the internal value in sync when the controlled value changes', async () => {
    const el = await fixture(html`
      <cds-edit-in-place
        value="Before"
        label-text="Editable field"></cds-edit-in-place>
    `);

    el.value = 'Updated';
    await el.updateComplete;

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.value).to.equal('Updated');
  });
});
