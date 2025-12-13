/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import {
  BUTTON_KIND,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
} from './defs';
import styles from './button.scss?lit';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

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
 * @element cds-button
 * @csspart button The button.
 */
@customElement(`${prefix}-button`)
class CDSButton extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement).assignedNodes().some(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
    );
    this[name === 'icon' ? '_hasIcon' : 'hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  @HostListener('click', { capture: true })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleDisabledClick(event: Event) {
    const { disabled } = this;
    if (disabled) {
      event.stopPropagation();
    }
  }

  private _checkBadgeWarning() {
    const hasBadgeIndicator = this.querySelector(`${prefix}-badge-indicator`);
    if (
      hasBadgeIndicator &&
      (this.kind !== BUTTON_KIND.GHOST || this.size !== BUTTON_SIZE.LARGE)
    ) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn(
        `The badge indicator must be used with kind='ghost' and size='lg'`
      );
    }
  }
  updated(changedProperties) {
    super.updated?.(changedProperties);
    this._checkBadgeWarning();
  }

  @HostListener('mouseover')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleOver = () => {
    this.openTooltip = true;
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('mouseout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleHoverOut = async () => {
    this.openTooltip = false;
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('focus')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async () => {
    this.openTooltip = true;
  };

  /**
   * Handles `keydown` event on this element.
   * Space & enter will toggle state, Escape will only close.
   */
  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusout = async () => {
    this.openTooltip = false;
  };

  /**
   * `true` if the button should have input focus when the page loads.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * `true` if the button is being used within a data table batch action toolbar
   */
  @property({ type: Boolean, reflect: true, attribute: 'batch-action' })
  batchAction = false;

  /**
   * Specify an optional className to be added to your Button
   */
  @property({ reflect: true, attribute: 'button-class-name' })
  buttonClassName;

  /**
   * Specify the message read by screen readers for the danger button variant
   */
  @property({ reflect: true, attribute: 'danger-description' })
  dangerDescription;

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
   * `true` if there is a non-icon content.
   */
  @property({ reflect: true, attribute: 'has-main-content', type: Boolean })
  hasMainContent = false;

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
  size = 'lg';

  /**
   * Specify the tabIndex of the button.
   */
  @property({ type: Number, attribute: 'tab-index', reflect: true })
  tabIndex = 0;

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
   * Specify the text to be rendered in the tooltip. If using
   * "cds-badge-indicator" with no count prop then the text
   * should include describing there is a new notification.
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
      buttonClassName,
      dangerDescription,
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
      tabIndex,
      target,
      tooltipAlignment,
      tooltipPosition,
      tooltipText,
      type,
      _hasIcon: hasIcon,
      hasMainContent,
      _handleSlotChange: handleSlotChange,
    } = this;

    let defaultClasses = {
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--danger--tertiary`]:
        kind === BUTTON_KIND.DANGER_TERTIARY,
      [`${prefix}--btn--danger--ghost`]: kind === BUTTON_KIND.DANGER_GHOST,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--${size}`]: size,
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
      [`${prefix}--btn--expressive`]: isExpressive,
      [`${prefix}--btn--selected`]: isSelected && kind === 'ghost',
    };

    if (buttonClassName) {
      const outputObject = {};
      buttonClassName?.split(' ').forEach((element) => {
        outputObject[element] = true;
      });
      defaultClasses = { ...defaultClasses, ...outputObject };
    }
    const classes = classMap(defaultClasses);

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
              type="${ifDefined(type)}"
              tabindex="${tabIndex}"
              aria-describedby="badge-indicator">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </a>
            ${html`<slot id="badge-indicator" name="badge-indicator"></slot>` ??
            !disabled}
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

    return tooltipText && !disabled
      ? html`
          <span class="${tooltipClasses}">
            <button
              id="button"
              part="button"
              class="${classes}"
              ?autofocus="${autofocus}"
              ?disabled="${disabled}"
              tabindex="${tabIndex}"
              type="${ifDefined(type)}"
              aria-label="${ifDefined(tooltipText)}"
              aria-describedby="badge-indicator">
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
            ${html`<slot id="badge-indicator" name="badge-indicator"></slot>` ??
            !disabled}
          </span>
        `
      : html`
          <button
            id="button"
            part="button"
            class="${classes}"
            ?autofocus="${autofocus}"
            ?disabled="${disabled}"
            tabindex="${tabIndex}"
            type="${ifDefined(type)}"
            aria-label="${ifDefined(tooltipText)}"
            aria-describedby="badge-indicator">
            ${isDanger
              ? html`<span class="${prefix}--visually-hidden"
                  >${dangerDescription}</span
                >`
              : ``}
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </button>
          ${html`<slot id="badge-indicator" name="badge-indicator"></slot>` ??
          !disabled}
        `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSButton;
