/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16.js';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16.js';
import { prefix } from '../../globals/settings';
import getLoadingIcon from '../loading/loading-icon';
import { INLINE_LOADING_STATE } from './defs';
import styles from './inline-loading.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';

export { INLINE_LOADING_STATE };

/**
 * Lnline loading spinner.
 *
 * @element cds-inline-loading
 * @fires cds-inline-loading-onsuccess The custom event fired when inline-loading has finished status
 */
@customElement(`${prefix}-inline-loading`)
class CDSInlineLoading extends LitElement {
  /**
   * @deprecated The 'assistive-text' property will be deprecated in the next major release. Please use `icon-description` instead.
   */
  @property({ attribute: 'assistive-text' })
  get assistiveText() {
    return this.iconDescription;
  }
  set assistiveText(value) {
    this.iconDescription = value;
  }
  /**
   * The assistive text for the spinner icon.
   */
  @property({ attribute: 'icon-description' })
  iconDescription = 'Loading';

  /**
   * Provide a delay for the setTimeout for success
   */
  @property({ attribute: 'success-delay' })
  successDelay = 1500;

  /**
   * @returns The template for the status icon.
   */
  private _renderIcon() {
    const { iconDescription, status } = this;
    if (status === INLINE_LOADING_STATE.ERROR) {
      return iconLoader(ErrorFilled16, {
        class: `${prefix}--inline-loading--error`,
        'aria-label': iconDescription,
      });
    }
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
    };

    if (status === INLINE_LOADING_STATE.FINISHED) {
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSInlineLoading).eventOnSuccess,
            init
          )
        );
      }, this.successDelay);

      return iconLoader(CheckmarkFilled16, {
        class: `${prefix}--inline-loading__checkmark-container`,
        'aria-label': iconDescription,
      });
    }
    if (
      status === INLINE_LOADING_STATE.INACTIVE ||
      status === INLINE_LOADING_STATE.ACTIVE
    ) {
      const classes = classMap({
        [`${prefix}--loading`]: true,
        [`${prefix}--loading--small`]: true,
        [`${prefix}--loading--stop`]: status === INLINE_LOADING_STATE.INACTIVE,
      });
      return html`
        <div class="${classes}">
          ${getLoadingIcon({ description: iconDescription, small: true })}
        </div>
      `;
    }
    return undefined;
  }

  /**
   * The loading status.
   */
  @property({ reflect: true })
  status = INLINE_LOADING_STATE.ACTIVE;

  static get eventOnSuccess() {
    return `${prefix}-inline-loading-onsuccess`;
  }

  connectedCallback() {
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'assertive');
    }
    super.connectedCallback();
  }

  render() {
    const statusIconResult = this._renderIcon();
    const statusIconWrapperResult = !statusIconResult
      ? undefined
      : html`
          <div class="${prefix}--inline-loading__animation">
            ${statusIconResult}
          </div>
        `;
    return html`
      ${statusIconWrapperResult}
      <div class="${prefix}--inline-loading__text"><slot></slot></div>
    `;
  }

  static styles = styles;
}

export default CDSInlineLoading;
