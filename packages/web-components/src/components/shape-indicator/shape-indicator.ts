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
import styles from './shape-indicator.scss?lit';

// Import Carbon icons
import {
  CriticalGlyph as Critical16,
  CriticalSeverityGlyph as CriticalSeverity16,
  DiamondFillGlyph as DiamondFill16,
  LowSeverityGlyph as LowSeverity16,
  CautionGlyph as Caution16,
  CircleFillGlyph as CircleFill16,
  CircleStrokeGlyph as CircleStroke16,
} from '@carbon/icons-web-components';
import { SHAPE_INDICATOR_KIND } from './defs';

/**
 * Custom incomplete icon implementation
 */
const IncompleteIcon = () => html`
  <svg
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
  </svg>
`;

/**
 * Map of shape indicators to their corresponding icons
 */
const shapeMap = {
  [SHAPE_INDICATOR_KIND.FAILED]: Critical16,
  [SHAPE_INDICATOR_KIND.CRITICAL]: CriticalSeverity16,
  [SHAPE_INDICATOR_KIND.HIGH]: Caution16,
  [SHAPE_INDICATOR_KIND.MEDIUM]: DiamondFill16,
  [SHAPE_INDICATOR_KIND.LOW]: LowSeverity16,
  [SHAPE_INDICATOR_KIND.CAUTIOUS]: Caution16,
  [SHAPE_INDICATOR_KIND.UNDEFINED]: DiamondFill16,
  [SHAPE_INDICATOR_KIND.STABLE]: CircleFill16,
  [SHAPE_INDICATOR_KIND.INFORMATIVE]: LowSeverity16,
  [SHAPE_INDICATOR_KIND.INCOMPLETE]: IncompleteIcon,
  [SHAPE_INDICATOR_KIND.DRAFT]: CircleStroke16,
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

    return html` ${shape()} ${this.label} `;
  }

  /**
   * Styles are imported from the SCSS file
   */
  static styles = styles;
}

export default CDSShapeIndicator;
