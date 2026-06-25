/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import styles from './guide-banner.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/button/index.js';
import Close16 from '@carbon/icons/es/close/16';
import Idea20 from '@carbon/icons/es/idea/20';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';

export const blockClass = `${prefix}--guidebanner`;
const blockEvent = `${prefix}-guidebanner`;

/**
 * GuideBanner.
 *
 * @element c4p-guide-banner
 * @csspart guide-banner
 * @fires c4p-guide-banner-toggle Custom event fired when banner is opened
 * @fires c4p-guide-banner-close Custom event fired when banner is closed
 * */

@customElement(`${prefix}-guide-banner`)
class CDSGuideBanner extends HostListenerMixin(LitElement) {
  @property({ type: String, reflect: true })
  collapseText?: string = '';

  @property({ type: String, reflect: true })
  expandText?: string = '';

  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: String, reflect: true })
  titleText?: string = '';

  static get eventToggle() {
    return `${blockEvent}-toggle`;
  }

  static get eventOnClose() {
    return `${blockEvent}-close`;
  }

  private _handleClose() {
    const init = {
      bubbles: true,
      composed: true,
      detail: {},
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSGuideBanner).eventOnClose,
        init
      )
    );
  }

  private _handleToggle() {
    this.open = !this.open;
    const init = {
      bubbles: true,
      composed: true,
      detail: {
        open: this.open,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSGuideBanner).eventToggle,
        init
      )
    );
  }

  private _getTitle() {
    if (this.titleText) {
      return html`<div class="${blockClass}__title">${this.titleText}</div>`;
    }
    return nothing;
  }

  private _getButton() {
    const buttonText = this.open ? this.collapseText : this.expandText;
    return html`<cds-button
      kind="ghost"
      size="md"
      class="${blockClass}__toggle-button"
      @click=${this._handleToggle}
    >
      ${buttonText}
    </cds-button>`;
  }

  render() {
    const classes = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}__collapsible-collapsed`]: !this.open,
    });
    return html`
      <div class="${classes}">
        <div class="${blockClass}__header">
          <div class="${blockClass}__icon-idea">
            <slot name="icon">
              ${iconLoader(Idea20, {
                slot: 'icon',
              })}
            </slot>
          </div>
          ${this._getTitle()}
          <slot name="header"></slot>
          <cds-button
            align="bottom-end"
            class="${blockClass}__close-button"
            kind="ghost"
            size="md"
            @click="${this._handleClose}"
          >
            ${iconLoader(Close16, { slot: 'icon' })}
          </cds-button>
        </div>
        <details ?open=${this.open}>
          <slot name="body"></slot>
          <summary
            tabindex="-1"
            @click=${(evt: MouseEvent) => {
              evt.preventDefault();
            }}
          >
            <div class="${blockClass}__navigation">
              <slot name="footer">${this._getButton()}</slot>
            </div>
          </summary>
        </details>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSGuideBanner;
