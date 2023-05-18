/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './form-group.scss';

/**
 * The shell UI for file uploader.
 *
 * @element cds-form-group
 * @slot label-title.
 * @slot lebel-description.
 */
@customElement(`${prefix}-form-group`)
class CDSFormGroup extends LitElement {
  /**
   * Specify whether the Form Group is invalid
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  @property({ attribute: 'legend-id' })
  legendId;

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  @property({ attribute: 'legend-text' })
  legendText!: string;

  /**
   * Specify whether the message should be displayed in the Form Group
   */
  @property({ type: Boolean, reflect: true })
  message = false;

  /**
   * Provide the text for the message in the Form Group
   */
  @property({ type: String, attribute: 'message-text', reflect: true })
  messageText;

  render() {
    const { invalid, legendId, legendText, message, messageText } = this;

    return html`
      <fieldset
        class="${prefix}--fieldset"
        ?data-invalid=${invalid}
        aria-labelledby="${legendId}">
        <legend class="${prefix}--label" id=${legendId}>${legendText}</legend>
        <slot></slot>
        ${message
          ? html`<div class="${prefix}--form__requirements">
              ${messageText}
            </div>`
          : null}
      </fieldset>
    `;
  }

  static styles = styles;
}

export default CDSFormGroup;
