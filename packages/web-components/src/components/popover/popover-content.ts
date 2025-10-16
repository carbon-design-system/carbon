/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './popover.scss?lit';

/**
 * Popover.
 *
 * @element cds-popover-content
 */
@customElement(`${prefix}-popover-content`)
class CDSPopoverContent extends LitElement {
  /**
   * Specify the popover alignment
   */
  @property({ reflect: true, type: String })
  align = '';

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * Specify whether a caret should be rendered
   */
  @property({ type: Boolean, reflect: true })
  caret;

  /**
   * Specify whether a dropShadow should be rendered
   */
  @property({ type: Boolean, reflect: true })
  dropShadow = true;

  /**
   * Specify whether the component is currently open or closed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Render the component using the tab tip variant
   */
  @property({ type: Boolean, reflect: true })
  tabTip = false;

  /**
   * The shadow slot this popover content should be in.
   */
  @property({ reflect: true })
  slot = 'content';

  render() {
    return html`
      <span class="${prefix}--popover">
        <span class="${prefix}--popover-content" part="content" tabindex="-1">
          <slot> </slot>
          ${this.autoalign
            ? html`<span
                class="${prefix}--popover-caret ${prefix}--popover--auto-align"></span>`
            : null}
        </span>
        ${!this.autoalign
          ? html`<span class="${prefix}--popover-caret"></span>`
          : null}
      </span>
    `;
  }

  static styles = styles;
}

export default CDSPopoverContent;
