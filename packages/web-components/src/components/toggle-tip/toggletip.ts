/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import Information16 from '@carbon/icons/es/information/16.js';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import FloatingUIContoller from '../../globals/controllers/floating-controller';
import styles from './toggletip.scss?lit';
import { iconLoader } from '../../globals/internal/icon-loader';

/**
 * Definition tooltip.
 *
 * @element cds-toggletip
 */
@customElement(`${prefix}-toggletip`)
class CDSToggletip extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * Create popover controller instance
   */
  private popoverController = new FloatingUIContoller(this);

  /**
   * How the tooltip is aligned to the trigger button.
   */
  @property({ reflect: true })
  alignment = POPOVER_ALIGNMENT.TOP;

  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  @property({ type: Number, attribute: 'alignment-axis-offset' })
  alignmentAxisOffset = 0;

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * The label for the toggle button
   */
  @property({ attribute: 'button-label' })
  buttonLabel = 'Show information';

  /**
   * Set whether toggletip is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Set whether toggletip is open by default.
   */
  @property({ type: Boolean, attribute: 'default-open' })
  defaultOpen = false;

  connectedCallback() {
    super.connectedCallback();
    if (this.defaultOpen && !this.hasAttribute('open')) {
      this.open = true;
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleActionsSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement).assignedNodes();
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20071
    hasContent
      ? this.setAttribute('has-actions', '')
      : this.removeAttribute('has-actions');
  }

  protected _handleClick = () => {
    this.open = !this.open;
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleKeydown = async (event) => {
    if (event.key === 'Escape') {
      this.open = false;
    }
  };

  /**
   * Handles `blur` event handler on the document this element is in.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event: FocusEvent) {
    const path = event.composedPath();
    if (path.includes(this as unknown as EventTarget)) {
      return;
    }
    this.open = false;
  }

  protected _renderToggleTipLabel = () => {
    return html`
      <span class="${prefix}--toggletip-label">
        <slot></slot>
      </span>
    `;
  };

  protected _renderTooltipButton = () => {
    return html`
      <button
        aria-controls="${this.id}"
        aria-label="${this.buttonLabel}"
        class="${prefix}--toggletip-button"
        @click=${this._handleClick}>
        <slot name="trigger"
          >${iconLoader(Information16, { id: 'trigger' })}
        </slot>
      </button>
    `;
  };

  protected _renderTooltipContent = () => {
    return this.autoalign
      ? html`
          <span class="${prefix}--popover-content">
            <div class="${prefix}--toggletip-content">
              <slot name="body-text"></slot>
              <div class="${prefix}--toggletip-actions">
                <slot
                  name="actions"
                  @slotchange="${this._handleActionsSlotChange}"></slot>
              </div>
            </div>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `
      : html`
          <span class="${prefix}--popover">
            <span class="${prefix}--popover-content">
              <div class="${prefix}--toggletip-content">
                <slot name="body-text"></slot>
                <div class="${prefix}--toggletip-actions">
                  <slot
                    name="actions"
                    @slotchange="${this._handleActionsSlotChange}"></slot>
                </div>
              </div>
            </span>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `;
  };

  protected _renderInnerContent = () => {
    return html`
      ${this._renderTooltipButton()} ${this._renderTooltipContent()}
    `;
  };

  updated() {
    if (this.autoalign) {
      // auto align functionality with @floating-ui/dom library
      const button = this.shadowRoot?.querySelector(
        CDSToggletip.selectorToggletipButton
      );

      const tooltip = this.shadowRoot?.querySelector(
        CDSToggletip.selectorToggletipContent
      );
      const arrowElement = this.shadowRoot?.querySelector(
        CDSToggletip.selectorToggletipCaret
      );

      if (button && tooltip) {
        // Ensure toggletip is visible when rendered in a large scrollable container (storybook parity)
        button.scrollIntoView({ block: 'center', inline: 'center' });

        this.popoverController?.setPlacement({
          trigger: button as HTMLElement,
          target: tooltip as HTMLElement,
          arrowElement: arrowElement as HTMLElement,
          caret: true,
          flipArguments: { fallbackAxisSideDirection: 'start' },
          alignment: this.alignment,
          open: this.open,
          alignmentAxisOffset: this.alignmentAxisOffset,
        });
      }
    }
  }

  render() {
    const { alignment, open } = this;
    const classes = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: true,
      [`${prefix}--popover--high-contrast`]: true,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${alignment}`]: alignment,
      [`${prefix}--toggletip`]: true,
      [`${prefix}--toggletip--open`]: open,
    });
    return html`
      ${this._renderToggleTipLabel()}
      <span class="${classes}"> ${this._renderInnerContent()} </span>
    `;
  }

  /**
   * A selector that will return the toggletip content.
   */
  static get selectorToggletipContent() {
    return `.${prefix}--popover-content`;
  }

  /**
   * A selector that will return the toggletip caret.
   */
  static get selectorToggletipCaret() {
    return `.${prefix}--popover-caret`;
  }

  /**
   * A selector that will return the trigger element.
   */
  static get selectorToggletipButton() {
    return `.${prefix}--toggletip-button`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSToggletip;
