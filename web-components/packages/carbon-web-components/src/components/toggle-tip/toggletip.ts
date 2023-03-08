/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import Information16 from '@carbon/icons/lib/information/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { TOOLTIP_ALIGNMENT } from '../tooltip/defs';
import styles from './toggletip.scss';

/**
 * Definition tooltip.
 *
 * @element cds-toggletip
 */
@customElement(`${prefix}-toggletip`)
class BXToggletip extends FocusMixin(LitElement) {
  /**
   * How the tooltip is aligned to the trigger button.
   */
  @property()
  alignment = TOOLTIP_ALIGNMENT.TOP;

  @property({ type: Boolean, reflect: true })
  open = false;

  private _handleClick = () => {
    this.open = !this.open;
  };

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const { alignment, id, open } = this;
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
      <span class="${prefix}--toggletip-label">
        <slot></slot>
      </span>
      <span class="${classes}">
        <button aria-controls="${id}" class="${prefix}--toggletip-button" @click=${
      this._handleClick
    }>
          ${Information16({ id: 'trigger' })}
        </button>

        <span class="${prefix}--popover">
          <span class="${prefix}--popover-content">

            <div class="${prefix}--toggletip-content">
              <slot name="body-text"></slot>
              <div class="${prefix}--toggletip-actions">
                <slot name="actions"></slot>
              </div>
            </div>
          </span>

        </span>
        <span class="${prefix}--popover-caret"></span>
      </span>
    </span>
    `;
  }

  static styles = styles;
}

export default BXToggletip;
