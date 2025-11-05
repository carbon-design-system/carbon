/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';

describe('cds-date-picker', () => {
  describe('Invalid and Warning States with Disabled/ReadOnly', () => {
    it('should not show invalid state when disabled', async () => {
      render(
        html`
          <cds-date-picker-input
            invalid
            invalid-text="Invalid date"
            disabled
            label-text="Date Input"></cds-date-picker-input>
        `,
        document.body
      );
      await Promise.resolve();

      const input = document.body.querySelector('cds-date-picker-input');
      const shadowRoot = input?.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).toBe(true);

      // Check that invalid icon is not displayed
      const invalidIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--invalid'
      );
      expect(invalidIcon).toBeFalsy();
    });

    it('should not show warning state when disabled', async () => {
      render(
        html`
          <cds-date-picker-input
            warn
            warn-text="Warning message"
            disabled
            label-text="Date Input"></cds-date-picker-input>
        `,
        document.body
      );
      await Promise.resolve();

      const input = document.body.querySelector('cds-date-picker-input');
      const shadowRoot = input?.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).toBe(true);

      // Check that warning icon is not displayed
      const warnIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--warn'
      );
      expect(warnIcon).toBeFalsy();
    });

    it('should not show invalid state when readonly', async () => {
      render(
        html`
          <cds-date-picker-input
            invalid
            invalid-text="Invalid date"
            readonly
            label-text="Date Input"></cds-date-picker-input>
        `,
        document.body
      );
      await Promise.resolve();

      const input = document.body.querySelector('cds-date-picker-input');
      const shadowRoot = input?.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).toBe(true);

      // Check that invalid icon is not displayed
      const invalidIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--invalid'
      );
      expect(invalidIcon).toBeFalsy();
    });

    it('should not show warning state when readonly', async () => {
      render(
        html`
          <cds-date-picker-input
            warn
            warn-text="Warning message"
            readonly
            label-text="Date Input"></cds-date-picker-input>
        `,
        document.body
      );
      await Promise.resolve();

      const input = document.body.querySelector('cds-date-picker-input');
      const shadowRoot = input?.shadowRoot;

      // Check that form requirement is not displayed
      const formRequirement = shadowRoot?.querySelector(
        '.cds--form-requirement'
      );
      expect(formRequirement?.hasAttribute('hidden')).toBe(true);

      // Check that warning icon is not displayed
      const warnIcon = shadowRoot?.querySelector(
        '.cds--date-picker__icon--warn'
      );
      expect(warnIcon).toBeFalsy();
    });
  });

  afterEach(async () => {
    await render(undefined, document.body);
  });
});
