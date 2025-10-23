/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './popover.scss?lit';
import { POPOVER_BACKGROUND_TOKEN } from './defs';

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
   * Specify whether a border should be rendered on the popover
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * Render the component using the high-contrast variant
   */
  @property({ type: Boolean, reflect: true })
  highContrast = false;

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
   * Specify the background token to use. Default is 'layer'.
   */
  @property({ reflect: true, type: String })
  backgroundToken = POPOVER_BACKGROUND_TOKEN.LAYER;

  /**
   * The shadow slot this popover content should be in.
   */
  @property({ reflect: true })
  slot = 'content';

  render() {
    if (this.autoalign) {
      return html`
        <span class="${prefix}--popover-content" part="content">
          <slot> </slot>
          <span class="${prefix}--popover-caret"></span>
        </span>
      `;
    } else {
      return html`
        <span class="${prefix}--popover-content" part="content">
          <slot> </slot>
        </span>
        <span class="${prefix}--popover-caret"></span>
      `;
    }
  }

  static styles = styles;
}

export default CDSPopoverContent;
