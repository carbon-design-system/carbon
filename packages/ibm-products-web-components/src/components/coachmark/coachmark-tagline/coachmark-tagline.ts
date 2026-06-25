/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './coachmark-tagline.scss?lit';
import Close16 from '@carbon/icons/es/close/16.js';
import Idea16 from '@carbon/icons/es/idea/16.js';
import '@carbon/web-components/es/components/button/button.js';
import iconLoader from '@carbon/web-components/es/globals/internal/icon-loader';

const blockClass = `${prefix}--coachmark-tagline`;

/**
 * DO NOT USE. This component is for the exclusive use
 * of other Onboarding components.
 *
 * Coachmark tagline component.
 *
 * @element c4p-coachmark-tagline
 * @fires c4p-coachmark-tagline-close - Custom event fired when close button is clicked
 * @fires c4p-coachmark-tagline-cta-click - Custom event fired when tagline CTA is clicked
 */
@customElement(`${prefix}-coachmark-tagline`)
class CDSCoachmarkTagline extends HostListenerMixin(LitElement) {
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  @property({ type: String, attribute: 'close-icon-description' })
  closeIconDescription = 'Close';

  /**
   * The title of the tagline.
   */
  @property({ type: String })
  title = '';

  /**
   * Whether the tagline is open.
   */
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  open = false;

  firstUpdated() {
    this.classList.add(blockClass);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.classList.add(`${blockClass}--open`);
      } else {
        this.classList.remove(`${blockClass}--open`);
      }
    }
  }

  /**
   * Handles the close button click event.
   */
  private _handleClose() {
    const closeEvent = new CustomEvent(`${prefix}-coachmark-tagline-close`, {
      bubbles: true,
      composed: true,
      detail: {},
    });
    this.dispatchEvent(closeEvent);
  }

  /**
   * Handles the CTA button click event.
   */
  private _handleCtaClick(event: Event) {
    const ctaClickEvent = new CustomEvent(
      `${prefix}-coachmark-tagline-cta-click`,
      {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      }
    );
    this.dispatchEvent(ctaClickEvent);
  }

  /**
   * Handles the CTA button double click event.
   */
  private _handleCtaDoubleClick(event: Event) {
    const ctaDoubleClickEvent = new CustomEvent(
      `${prefix}-coachmark-tagline-cta-dblclick`,
      {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      }
    );
    this.dispatchEvent(ctaDoubleClickEvent);
  }

  render() {
    return html`
      <button
        class="${blockClass}__cta"
        @click="${this._handleCtaClick}"
        @dblclick="${this._handleCtaDoubleClick}"
      >
        ${iconLoader(Idea16, { slot: 'icon' })} ${this.title}
      </button>
      <div class="${blockClass}--close-btn-container">
        <cds-button
          kind="ghost"
          size="sm"
          tooltip-text="${this.closeIconDescription}"
          has-icon-only
          class="${blockClass}--close-btn"
          @click="${this._handleClose}"
        >
          ${iconLoader(Close16, { slot: 'icon' })}
        </cds-button>
      </div>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}
export default CDSCoachmarkTagline;
