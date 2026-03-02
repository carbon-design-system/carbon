/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { createIconTemplate } from '../../globals/internal/icon-loader-utils';
import type { CarbonIcon } from '../../globals/internal/icon-loader-utils';

/**
 * Icon component that renders imported icons or custom SVG content.
 *
 * @element cds-icon
 * @slot - The icon content (for custom SVG)
 */
@customElement(`${prefix}-icon`)
class CDSIcon extends LitElement {
  /**
   * The imported icon
   */
  @property({ type: Object })
  icon?: CarbonIcon;

  /**
   * The size of the icon (16, 20, 24, 32)
   */
  @property({ type: Number })
  size = 16;

  /**
   * Custom CSS classes
   */
  @property({ type: String })
  class?: string;

  /**
   * The aria-label for the icon
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  render() {
    const { icon, size, class: className, ariaLabel } = this;

    // render icon descriptor if provided
    if (icon) {
      const iconTemplate = createIconTemplate(icon);
      return iconTemplate({
        class: className || '',
        'aria-label': ariaLabel || '',
        'aria-hidden': !ariaLabel ? 'true' : 'false',
        width: size,
        height: size,
      });
    }

    // slot for custom SVG content
    return html`<slot></slot>`;
  }
}

export default CDSIcon;
