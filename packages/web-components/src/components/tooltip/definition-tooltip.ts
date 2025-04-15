/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import '../popover/index';
import styles from './tooltip.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Definition tooltip.
 *
 * @element cds-definition-tooltip
 */
@customElement(`${prefix}-definition-tooltip`)
class CDSDefinitionTooltip extends LitElement {
  /**
   * Specify how the trigger should align with the tooltip
   */
  @property({ reflect: true, type: POPOVER_ALIGNMENT })
  align = 'bottom';

  /**
   * Will auto-align Definition Tooltip. This prop is currently experimental and is subject to future changes.
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ type: Boolean, reflect: true, attribute: 'default-open' })
  defaultOpen = false;

  /**
   * Specifies whether the `DefinitionTooltip` should open on hover or not
   */
  @property({ reflect: true, type: Boolean, attribute: 'open-on-hover' })
  openOnHover = false;

  @state()
  open = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.hasAttribute('default-open')) {
      this.open = true;
    }
  }

  protected _handleBlur() {
    this.open = false;
  }

  protected _handleMouseDown() {
    this.open = !this.open;
  }

  protected _handleKeyDown(event: KeyboardEvent) {
    const { key } = event;

    if (this.open && (key === 'Esc' || key === 'Escape')) {
      event.stopPropagation();
      this.open = false;
    }
  }

  protected _handleHover() {
    if (this.openOnHover && !this.open) {
      this.open = true;
    } else {
      this.open = false;
    }
  }

  protected _handleFocus() {
    this.open = true;
  }

  render() {
    const { align, open } = this;

    return html`
      <cds-popover
        @mouseenter=${this._handleHover}
        @mouseleave=${this._handleHover}
        highContrast
        dropShadow=${false}
        align=${align}
        .open=${open}>
        <button
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @mousedown=${this._handleMouseDown}
          @keydown=${this._handleKeyDown}
          aria-expanded=${open}
          class="${prefix}--definition-term">
          <slot></slot>
        </button>
        <cds-popover-content>
          <slot name="definition"></slot>
        </cds-popover-content>
      </cds-popover>
    `;
  }

  static styles = styles;
}

export default CDSDefinitionTooltip;
