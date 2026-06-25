/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import styles from './options-tile.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16';
import Locked16 from '@carbon/icons/es/locked/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/layer/index.js';

export const blockClass = `${prefix}--options-tile`;
const blockEvent = `${prefix}-options-tile`;

/**
 * OptionsTile.
 *
 * @element c4p-options-tile
 * @csspart options-tile The options tile
 * @fires c4p-options-tile-open Custom event fired when tile is opened
 * @fires c4p-options-tile-close Custom event fired when tile is closed
 * */

@customElement(`${prefix}-options-tile`)
class CDSOptionsTile extends HostListenerMixin(LitElement) {
  /**
   * Determines if the tile is open by default
   */
  @property({ type: Boolean, reflect: true })
  defaultOpen?: boolean = false;

  /**
   * Determines the size of the header
   */
  @property({ type: String, reflect: true })
  size?: 'lg' | 'xl' = 'lg';

  /**
   * ID for the title
   */
  @property({ type: String, reflect: true })
  titleId: string = '';

  /**
   * Text for the title
   */
  @property({ type: String, reflect: true })
  titleText: string = '';

  /**
   * Whether the OptionsTile is in locked validation state.
   */
  @property({ type: Boolean, reflect: true })
  locked?: boolean = false;

  /**
   * Provide a text explaining why the OptionsTile is in locked state.
   */
  @property({ type: String, reflect: true })
  lockedText?: string = '';

  /**
   * Whether the OptionsTile is in warning validation state.
   */
  @property({ type: Boolean, reflect: true })
  warn?: boolean = false;

  /**
   * Provide a text explaining why the OptionsTile is in warning state.
   */
  @property({ type: String, reflect: true })
  warnText?: string = '';

  /**
   * Using the native toggle event handler in details can cause an infinite loop
   * when setting the native open attribute. To combat this, the open state is kept
   * here and only referenced internally.
   */
  @state()
  private _open = false;

  /**
   * Tracks whether the toggle slot has content
   */
  @state()
  private _hasToggle = false;

  /**
   * Tracks whether the body slot has content
   */
  @state()
  private _hasBody = false;

  static get eventOpen() {
    return `${blockEvent}-open`;
  }

  static get eventClose() {
    return `${blockEvent}-close`;
  }

  private _handleToggleSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const toggleElements = target?.assignedElements();
    this._hasToggle = toggleElements && toggleElements.length > 0;
  }

  private _handleBodySlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const bodyElements = target?.assignedElements();
    this._hasBody = bodyElements && bodyElements.length > 0;
  }

  private _toggle(evt: ToggleEvent) {
    const { newState } = evt;
    this._open = newState === 'open';
    this._open ? this._handleOpen() : this._handleClose();
  }

  private _handleOpen() {
    const init = {
      bubbles: true,
      composed: true,
      detail: {
        open: this._open,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSOptionsTile).eventOpen,
        init
      )
    );
  }

  private _handleClose() {
    const init = {
      bubbles: true,
      composed: true,
      detail: {
        open: this._open,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSOptionsTile).eventClose,
        init
      )
    );
  }

  render() {
    const {
      _open,
      _hasToggle,
      _hasBody,
      defaultOpen,
      size,
      titleId,
      titleText,
      locked,
      lockedText,
      warn,
      warnText,
    } = this;
    const classes = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--xl`]: size === 'xl',
      [`${blockClass}--open`]: _open,
    });

    const headerClasses = classMap({
      [`${blockClass}__header`]: true,
      [`${blockClass}__header--has-toggle`]: _hasToggle,
    });

    const summaryClasses = classMap({
      [`${blockClass}__summary`]: true,
      [`${blockClass}__summary--warn`]: !!warn,
      [`${blockClass}__summary--locked`]: !!locked,
    });

    const renderTitle = () => html`
      <div class="${blockClass}__title-block">
        <p class="${blockClass}__title" id="${titleId}">${titleText}</p>
        <div class="${summaryClasses}">
          ${locked && lockedText
            ? html`
                ${iconLoader(Locked16, {
                  class: `${blockClass}__summary-icon`,
                })}
                <span class="${blockClass}__summary-text">${lockedText}</span>
              `
            : warn && warnText
              ? html`
                  ${iconLoader(WarningAltFilled16, {
                    class: `${blockClass}__summary-icon`,
                  })}
                  <span class="${blockClass}__summary-text">${warnText}</span>
                `
              : html`<slot name="summary"></slot>`}
        </div>
      </div>
    `;

    return _hasBody
      ? html`
          <details
            @toggle=${this._toggle}
            class="${classes}"
            part="options-tile"
            open=${defaultOpen || nothing}
          >
            <summary class="${headerClasses}">
              <div class="${blockClass}__header-right">
                <slot
                  name="toggle"
                  @slotchange=${this._handleToggleSlotChange}
                ></slot>
              </div>
              <div class="${blockClass}__header-left">
                ${iconLoader(ChevronDown16, {
                  slot: 'icon',
                  class: `${blockClass}__chevron`,
                })}
                ${renderTitle()}
              </div>
            </summary>
            <div class="${blockClass}__body">
              <cds-layer level="1">
                <slot
                  name="body"
                  @slotchange=${this._handleBodySlotChange}
                ></slot>
              </cds-layer>
            </div>
          </details>
        `
      : html`
          <div class="${classes}">
            <div class="${blockClass}__static-content">
              <slot
                name="toggle"
                @slotchange=${this._handleToggleSlotChange}
                style="display: none;"
              ></slot>
              <slot
                name="body"
                @slotchange=${this._handleBodySlotChange}
                style="display: none;"
              ></slot>
              ${renderTitle()}
            </div>
          </div>
        `;
  }

  static styles = styles;
}

export default CDSOptionsTile;
