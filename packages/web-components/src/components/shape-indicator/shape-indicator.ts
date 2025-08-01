/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './shape-indicator.scss?lit';

// Import Carbon icons
import Critical from '@carbon/icons/es/critical/index.js';
import CriticalSeverity from '@carbon/icons/es/critical-severity/index.js';
import DiamondFill from '@carbon/icons/es/diamond-fill/index.js';
import LowSeverity from '@carbon/icons/es/low-severity/index.js';
import Caution from '@carbon/icons/es/caution/index.js';
import CircleFill from '@carbon/icons/es/circle-fill/index.js';
import CircleStroke from '@carbon/icons/es/circle-stroke/index.js';
import { SHAPE_INDICATOR_KIND } from './defs';

/**
 * Custom incomplete icon implementation
 */
const IncompleteIcon = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="none"
  aria-hidden="true">
  <path
    fill="#fff"
    fillOpacity="0.01"
    d="M0 0h16v16H0z"
    style="mix-blend-mode: multiply;" />
  <path
    fill="#161616"
    d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2a4.004 4.004 0 0 1 4 4H4a4.004 4.004 0 0 1 4-4Z" />
</svg>`;

/**
 * Map of shape indicators to their corresponding icons
 */
const shapeMap = {
  [SHAPE_INDICATOR_KIND.FAILED]: Critical,
  [SHAPE_INDICATOR_KIND.CRITICAL]: CriticalSeverity,
  [SHAPE_INDICATOR_KIND.HIGH]: Caution,
  [SHAPE_INDICATOR_KIND.MEDIUM]: DiamondFill,
  [SHAPE_INDICATOR_KIND.LOW]: LowSeverity,
  [SHAPE_INDICATOR_KIND.CAUTIOUS]: Caution,
  [SHAPE_INDICATOR_KIND.UNDEFINED]: DiamondFill,
  [SHAPE_INDICATOR_KIND.STABLE]: CircleFill,
  [SHAPE_INDICATOR_KIND.INFORMATIVE]: LowSeverity,
  [SHAPE_INDICATOR_KIND.INCOMPLETE]: IncompleteIcon,
  [SHAPE_INDICATOR_KIND.DRAFT]: CircleStroke,
};

/**
 * Shape Indicator.
 * @element cds-shape-indicator
 */
@customElement(`${prefix}-shape-indicator`)
class CDSShapeIndicator extends LitElement {
  /**
   * Shape indicator size (12 or 14)
   */
  @property({ attribute: 'text-size' })
  textSize = 12;

  /**
   * Label next to the shape.
   */
  @property()
  label!: string;

  /**
   * Shape Indicator kind
   */
  @property()
  kind!: SHAPE_INDICATOR_KIND;

  render() {
    const shape = shapeMap[this.kind];

    if (!shape) {
      return null;
    }

    // Handle custom SVG string vs Carbon icon descriptor
    if (typeof shape === 'string') {
      return html` ${iconLoader(null, {}, shape)} ${this.label} `;
    }

    return html` ${iconLoader(shape)} ${this.label} `;
  }

  /**
   * Styles are imported from the SCSS file
   */
  static styles = styles;
}

export default CDSShapeIndicator;
