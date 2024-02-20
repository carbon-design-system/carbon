/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Information16 from '@carbon/icons/lib/information/16';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import { floatingUIPosition } from '../../globals/internal/floating-ui';
import styles from './toggletip.scss';

/**
 * Definition tooltip.
 *
 * @element cds-toggletip
 */
@customElement(`${prefix}-toggletip`)
class CDSToggletip extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * How the tooltip is aligned to the trigger button.
   */
  @property({ reflect: true })
  alignment = POPOVER_ALIGNMENT.TOP;

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * Set whether toggletip is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleActionsSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement).assignedNodes();
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
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event: FocusEvent) {
    if (!this.contains(event.relatedTarget as Node)) {
      this.open = false;
    }
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
        class="${prefix}--toggletip-button"
        @click=${this._handleClick}>
        ${Information16({ id: 'trigger' })}
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

  async updated() {
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
        // @floating-ui/dom returns the final placement which we'll use
        // to set the alignment attr for styling
        const finalPlacement = await floatingUIPosition({
          button,
          tooltip,
          arrowElement,
          caret: true,
          alignment: this.alignment,
        });

        this.setAttribute('alignment', finalPlacement);
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
      <span class="${classes}">
        ${this._renderInnerContent()}
      </span>
    </span>
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
