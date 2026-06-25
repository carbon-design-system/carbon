/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './coachmark-beacon.scss?lit';
import '@carbon/web-components/es/components/button/button.js';
import { BEACON_KIND } from './defs';

const blockClass = `${prefix}--coachmark-beacon`;

/**
 * CoachmarkBeacon.
 *
 * @element c4p-coachmark-beacon
 * @fires c4p-coachmark-beacon-clicked Custom event fired when beacon is clicked
 * */
@customElement(`${prefix}-coachmark-beacon`)
class CDSCoachmarkBeacon extends HostListenerMixin(LitElement) {
  /**
   * What style of beacon.
   * BEACON_KIND is an enum from the Coachmark and can be used for this value.
   * @see {@Link BEACON_KIND}
   */
  @property({ reflect: true })
  kind?: BEACON_KIND = BEACON_KIND.DEFAULT;

  /**
   * The aria label.
   */
  @property({ type: String, reflect: true })
  label = 'Show information';
  /**
   * id for the coachmark beacon
   */
  @property({ type: String, reflect: true })
  id: string = crypto.randomUUID();
  /**
   * specify aria-expanded of beacon
   */
  @property({ type: Boolean, reflect: true })
  expanded: boolean = false;

  firstUpdated() {
    this.classList.add(blockClass);
    if (this.kind) {
      this.classList.add(`${blockClass}-${this.kind}`);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.expanded) {
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  private _handleClick() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSCoachmarkBeacon).beaconClicked,
        {
          detail: { expanded: this.expanded },
          bubbles: true,
          composed: true,
        }
      )
    );
  }

  private handleOutsideClick = (event: Event) => {
    if (!this.contains(event.target as Node)) {
      this.expanded = false;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    return html`
      <cds-button
        class="${blockClass}__target"
        type="button"
        id=${this.id}
        aria-expanded="${String(this.expanded)}"
        @click=${this._handleClick}
      >
        <slot name="icon">
          <svg
            class="${blockClass}__center"
            aria-label=${this.label}
            width="76"
            height="76"
            viewBox="0 0 76 76"
          >
            <title>${this.label}</title>
            <circle r="1" cx="36" cy="36"></circle>
          </svg>
        </slot>
      </cds-button>
    `;
  }
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static get beaconClicked() {
    return `${prefix}-coachmark-beacon-clicked`;
  }

  static styles = styles;
}
export default CDSCoachmarkBeacon;
