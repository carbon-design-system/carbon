/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './card.scss?lit';

/**
 * Card action — wrapper for a single interactive element inside cds-card-actions.
 * The `label` property provides a fallback string for the overflow menu when this
 * action is hidden due to container overflow.
 *
 * @element cds-card-action
 * @slot - Default slot for a button or icon-button.
 */
@customElement(`${prefix}-card-action`)
class CDSCardAction extends LitElement {
  /**
   * Label shown in the overflow menu when this action is hidden.
   * If omitted, cds-card-actions resolves the label from the inner button.
   */
  @property({ type: String, reflect: true })
  label!: string;

  render() {
    return html`<div class="${prefix}--card__action"><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSCardAction;
