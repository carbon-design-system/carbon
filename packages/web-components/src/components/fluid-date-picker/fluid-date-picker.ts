/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSDatePicker from '../date-picker/date-picker';
import styles from './fluid-date-picker.scss?lit';
import { isFeatureFlagEnabled } from '../feature-flags';

/**
 * Fluid date picker.
 *
 * @element cds-fluid-date-picker
 * @fires cds-date-picker-changed - The custom event fired on this element when Flatpickr updates its value.
 * @fires cds-date-picker-flatpickr-error
 *   The name of the custom event when Flatpickr throws an error.
 */
@customElement(`${prefix}-fluid-date-picker`)
class CDSFluidDatePicker extends CDSDatePicker {
  private _observer = new MutationObserver(() => this._syncInputState());

  private _syncInputState() {
    const input = this.querySelector(
      `${prefix}-fluid-date-picker-input[kind="simple"]`
    );

    this.toggleAttribute(
      'data-input-disabled',
      input?.hasAttribute('disabled') ?? false
    );
    this.toggleAttribute(
      'data-input-readonly',
      input?.hasAttribute('readonly') ?? false
    );
  }

  connectedCallback() {
    super.connectedCallback();

    if (isFeatureFlagEnabled('enable-v12-release', this)) {
      this._syncInputState();
      this._observer.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['disabled', 'readonly'],
      });
    }
  }

  disconnectedCallback() {
    this._observer.disconnect();
    super.disconnectedCallback();
  }

  render() {
    return html`${super.render()}`;
  }

  static get selectorInputFrom() {
    return `${prefix}-fluid-date-picker-input,${prefix}-fluid-date-picker-input[kind="from"]`;
  }

  static get selectorInputTo() {
    return `${prefix}-fluid-date-picker-input[kind="to"]`;
  }

  static get selectorInputSingle() {
    return `${prefix}-fluid-date-picker-input[kind="single"]`;
  }

  static styles = [CDSDatePicker.styles, styles];
}

export default CDSFluidDatePicker;
