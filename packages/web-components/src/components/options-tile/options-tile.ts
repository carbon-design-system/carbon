/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, PropertyValues, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { easings, moderate01 } from '@carbon/motion';
import { prefix } from '../../globals/settings';
import styles from './options-tile.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16';
import Locked16 from '@carbon/icons/es/locked/16';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../layer/index';

export const blockClass = `${prefix}--options-tile`;
const blockEvent = `${prefix}-options-tile`;

const duration = parseInt(moderate01, 10);
const easing = easings.entrance.productive;
const collapsedFrame = {
  paddingTop: 0,
  paddingBottom: 0,
  height: 0,
  opacity: 0,
};

/**
 * OptionsTile.
 *
 * @element cds-options-tile
 * @csspart options-tile The options tile
 * @slot summary - Text summarizing the current state of the content.
 * @slot action - Custom content, such as a dropdown, icon buttons or a date picker, shown at the end of the header in place of the toggle.
 * @slot toggle - A toggle shown at the end of the header when no `action` is slotted.
 * @slot body - Content shown when the tile is expanded.
 * @fires cds-options-tile-open Custom event fired when tile is opened
 * @fires cds-options-tile-close Custom event fired when tile is closed
 * */
@customElement(`${prefix}-options-tile`)
class CDSOptionsTile extends LitElement {
  /**
   * Determines if the tile is open on first render.
   */
  @property({ type: Boolean, reflect: true })
  defaultOpen?: boolean = false;

  /**
   * Whether the tile is expanded. Set it to control the open state.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

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
   * Whether the OptionsTile is in invalid validation state.
   */
  @property({ type: Boolean, reflect: true })
  invalid?: boolean = false;

  /**
   * Provide a text explaining why the OptionsTile is in invalid state.
   */
  @property({ type: String, reflect: true })
  invalidText?: string = '';

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
   * Whether the collapse animation is running.
   */
  @state()
  private _closing = false;

  /**
   * Which slots have content.
   */
  @state()
  private _slotted: Record<string, boolean> = {};

  /**
   * The title's heading level: one below the closest `cds-section`, as React's
   * `Section` nests headings.
   */
  @state()
  private _headingLevel = 2;

  static get eventOpen() {
    return `${blockEvent}-open`;
  }

  static get eventClose() {
    return `${blockEvent}-close`;
  }

  connectedCallback() {
    super.connectedCallback();
    const section = this.closest(`${prefix}-section`) as
      | (Element & { getCurrentLevel?: () => number })
      | null;
    this._headingLevel = Math.min((section?.getCurrentLevel?.() ?? 1) + 1, 6);
  }

  private _handleSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    this._slotted = {
      ...this._slotted,
      [slot.name]: slot.assignedElements().length > 0,
    };
  }

  private _dispatchToggle() {
    const { eventOpen, eventClose } = this.constructor as typeof CDSOptionsTile;
    this.dispatchEvent(
      new CustomEvent(this.open ? eventOpen : eventClose, {
        bubbles: true,
        composed: true,
        detail: { open: this.open },
      })
    );
  }

  private async _handleChevronClick() {
    const content = this.shadowRoot?.querySelector<HTMLElement>(
      `.${blockClass}__content`
    );
    const animate =
      content && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.open) {
      this.open = true;
      this._dispatchToggle();
      if (animate) {
        await this.updateComplete;
        const { paddingTop, paddingBottom, height } = getComputedStyle(content);
        content.animate(
          [
            { ...collapsedFrame, overflow: 'hidden' },
            {
              paddingTop,
              paddingBottom,
              height,
              opacity: 1,
              overflow: 'hidden',
            },
          ],
          { duration, easing }
        );
      }
      return;
    }

    if (animate) {
      this._closing = true;
      const { paddingTop, paddingBottom, height } = getComputedStyle(content);
      await content
        .animate(
          [{ paddingTop, paddingBottom, height, opacity: 1 }, collapsedFrame],
          { duration, easing }
        )
        .finished.catch(() => {});
      this._closing = false;
    }
    this.open = false;
    this._dispatchToggle();
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    if (!this.hasUpdated && this.defaultOpen) {
      this.open = true;
    }
    super.willUpdate(changedProperties);
  }

  render() {
    const {
      open,
      _closing: closing,
      _slotted: slotted,
      _headingLevel,
      size,
      titleId,
      titleText,
      invalid,
      invalidText,
      locked,
      lockedText,
      warn,
      warnText,
    } = this;
    const isExpandable = !!slotted.body;
    const isLocked = !invalid && !warn && locked;
    const labelId = titleId || `${blockClass}__title`;
    const contentId = `${blockClass}__content`;

    // Same precedence as React: invalid, then warn, then locked. The static
    // variant always shows lockedText; the expandable one keeps the summary.
    const [summaryIcon, summaryText] = invalid
      ? [WarningFilled16, invalidText]
      : warn
        ? [WarningAltFilled16, warnText]
        : locked
          ? [Locked16, !isExpandable || !slotted.summary ? lockedText : '']
          : [];

    const renderTitle = () => html`
      <div class="${blockClass}__heading">
        <div
          class="${blockClass}__title"
          id="${labelId}"
          role="heading"
          aria-level="${_headingLevel}">
          ${titleText}
        </div>
        <div
          class="${classMap({
            [`${blockClass}__summary`]: true,
            [`${blockClass}__summary--open`]: open && !closing,
            [`${blockClass}__summary--invalid`]: !!invalid,
            [`${blockClass}__summary--warn`]: !!warn,
            [`${blockClass}__summary--locked`]: !!locked,
          })}"
          aria-hidden="${String(open && !invalid && !warn && !locked)}"
          ?hidden=${!summaryText && !slotted.summary}>
          ${summaryIcon ? iconLoader(summaryIcon) : ''}
          <span class="${blockClass}__summary-text">
            ${summaryText}
            <slot
              name="summary"
              ?hidden=${!!summaryText}
              @slotchange=${this._handleSlotChange}></slot>
          </span>
        </div>
      </div>
    `;

    // A slotted action replaces the toggle, matching React's `actionRenderer`.
    const renderAction = () => html`
      <cds-layer
        level="1"
        class="${blockClass}__action"
        ?hidden=${!slotted.action && !slotted.toggle}>
        <slot name="action" @slotchange=${this._handleSlotChange}></slot>
        <slot
          name="toggle"
          ?hidden=${!!slotted.action}
          @slotchange=${this._handleSlotChange}></slot>
      </cds-layer>
    `;

    const classes = classMap({
      [blockClass]: true,
      [`${blockClass}--${size}`]: !!size,
      [`${blockClass}--closing`]: closing,
    });

    return isExpandable
      ? html`
          <div class="${classes}" part="options-tile">
            <div class="${blockClass}__header">
              <button
                type="button"
                class="${blockClass}__chevron-button"
                aria-expanded="${String(open)}"
                aria-controls="${contentId}"
                aria-labelledby="${labelId}"
                @click=${this._handleChevronClick}>
                ${iconLoader(ChevronDown16, {
                  class: `${blockClass}__chevron ${
                    open && !closing ? `${blockClass}__chevron--open` : ''
                  }`,
                })}
              </button>
              ${renderTitle()} ${renderAction()}
            </div>
            <div
              class="${blockClass}__content"
              id="${contentId}"
              ?hidden=${!open}>
              <cds-layer level="1">
                ${isLocked
                  ? html`<p class="${blockClass}__locked-text">
                      ${iconLoader(Locked16)} ${lockedText}
                    </p>`
                  : ''}
                <slot name="body" @slotchange=${this._handleSlotChange}></slot>
              </cds-layer>
            </div>
          </div>
        `
      : html`
          <div class="${classes}" part="options-tile">
            <div class="${blockClass}__static-content">
              <slot
                name="body"
                hidden
                @slotchange=${this._handleSlotChange}></slot>
              ${renderTitle()} ${renderAction()}
            </div>
          </div>
        `;
  }

  static styles = styles;
}

export default CDSOptionsTile;
