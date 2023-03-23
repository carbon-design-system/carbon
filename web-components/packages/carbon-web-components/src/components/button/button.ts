/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import {
  BUTTON_KIND,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
} from './defs';
import styles from './button.scss';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';

export {
  BUTTON_KIND,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
};

/**
 * Button.
 *
 * @element cds-btn
 * @csspart button The button.
 */
@customElement(`${prefix}-btn`)
class BXButton extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * `true` if there is a non-icon content.
   */
  private _hasMainContent = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  @HostListener('click', { capture: true })
  // @ts-ignore
  private _handleDisabledClick(event: Event) {
    const { disabled } = this;
    if (disabled) {
      event.stopPropagation();
    }
  }

  @HostListener('mouseover')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleOver = () => {
    this.openTooltip = !this.openTooltip;
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('mouseout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleHoverOut = async () => {
    this.openTooltip = !this.openTooltip;
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('focus')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async (event) => {
    this._handleOver();
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusout = async (event) => {
    this._handleOver();
  };

  /**
   * `true` if the button should have input focus when the page loads.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Specify the message read by screen readers for the danger button variant
   */
  @property({ reflect: true, attribute: 'danger-descriptor' })
  dangerDescriptor;

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name, used if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  download!: string;

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * `true` if expressive theme enabled.
   */
  @property({ type: Boolean, reflect: true })
  isExpressive = false;

  /**
   * Specify whether the Button is currently selected.
   * Only applies to the Ghost variant.
   */
  @property({ type: Boolean, reflect: true })
  isSelected = false;

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole = 'button';

  /**
   * Boolean to determine if tooltip is open.
   */
  @property({ type: Boolean })
  openTooltip = false;

  /**
   * URLs to ping, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * Button size.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.LARGE;

  /**
   * The link target, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  @property({ reflect: true, attribute: 'tooltip-alignment' })
  tooltipAlignment = BUTTON_TOOLTIP_ALIGNMENT.CENTER;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  @property({ reflect: true, attribute: 'tooltip-position' })
  tooltipPosition = BUTTON_TOOLTIP_POSITION.TOP;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  @property({ reflect: true, attribute: 'tooltip-text' })
  tooltipText!: string;

  /**
   * Button type.
   */
  @property({ reflect: true })
  type = BUTTON_TYPE.BUTTON;

  render() {
    const {
      autofocus,
      dangerDescriptor,
      disabled,
      download,
      href,
      hreflang,
      kind,
      isExpressive,
      isSelected,
      linkRole,
      openTooltip,
      ping,
      rel,
      size,
      target,
      tooltipAlignment,
      tooltipPosition,
      tooltipText,
      type,
      _hasIcon: hasIcon,
      _hasMainContent: hasMainContent,
      _handleSlotChange: handleSlotChange,
    } = this;
    const classes = classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--${size}`]: size,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
      [`${prefix}--btn--expressive`]: isExpressive,
      [`${prefix}--btn--selected`]: isSelected && kind === 'ghost',
    });

    const isDanger = kind.includes('danger');

    if (href) {
      return disabled
        ? html`
            <p id="button" part="button" class="${classes}">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </p>
          `
        : html`
            <a
              id="button"
              part="button"
              role="${ifDefined(linkRole)}"
              class="${classes}"
              download="${ifDefined(download)}"
              href="${ifDefined(href)}"
              hreflang="${ifDefined(hreflang)}"
              ping="${ifDefined(ping)}"
              rel="${ifDefined(rel)}"
              target="${ifDefined(target)}"
              type="${ifDefined(type)}">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </a>
          `;
    }

    const alignmentClass =
      tooltipAlignment &&
      (tooltipPosition === BUTTON_TOOLTIP_POSITION.TOP ||
        tooltipPosition === BUTTON_TOOLTIP_POSITION.BOTTOM)
        ? `-${tooltipAlignment}`
        : '';

    const tooltipClasses = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: true,
      [`${prefix}--popover--high-contrast`]: true,
      [`${prefix}--tooltip`]: true,
      [`${prefix}--icon-tooltip`]: hasIcon,
      [`${prefix}--popover--open`]: openTooltip,
      [`${prefix}--popover--${tooltipPosition}${alignmentClass}`]: tooltipText,
    });

    return tooltipText
      ? html`
          <span class="${tooltipClasses}">
            <button
              id="button"
              part="button"
              class="${classes}"
              ?autofocus="${autofocus}"
              ?disabled="${disabled}"
              type="${ifDefined(type)}">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </button>
            <span class="${prefix}--popover">
              <span
                class="${prefix}--popover-content ${prefix}--tooltip-content">
                ${tooltipText}
              </span>
              <span class="${prefix}--popover-caret"></span>
            </span>
          </span>
        `
      : html`
          <button
            id="button"
            part="button"
            class="${classes}"
            ?autofocus="${autofocus}"
            ?disabled="${disabled}"
            type="${ifDefined(type)}">
            ${isDanger
              ? html`<span class="${prefix}--visually-hidden"
                  >${dangerDescriptor}</span
                >`
              : ``}
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </button>
        `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXButton;
