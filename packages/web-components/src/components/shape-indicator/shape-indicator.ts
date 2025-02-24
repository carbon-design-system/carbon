/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2025
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
import Critical from '@carbon/icons/lib/critical/index.js';
import CriticalSeverity from '@carbon/icons/lib/critical-severity/index.js';
import DiamondFill from '@carbon/icons/lib/diamond-fill/index.js';
import LowSeverity from '@carbon/icons/lib/low-severity/index.js';
import Caution from '@carbon/icons/lib/caution/index.js';
import CircleFill from '@carbon/icons/lib/circle-fill/index.js';
import CircleStroke from '@carbon/icons/lib/circle-stroke/index.js';

/**
 * Shape indicator kinds.
 */
export enum SHAPE_INDICATOR_KIND {
  /**
   * Failed status
   */
  FAILED = 'failed',
  /**
   * Critical status
   */
  CRITICAL = 'critical',
  /**
   * High severity
   */
  HIGH = 'high',
  /**
   * Medium severity
   */
  MEDIUM = 'medium',
  /**
   * Low severity
   */
  LOW = 'low',
  /**
   * Cautious status
   */
  CAUTIOUS = 'cautious',
  /**
   * Undefined status
   */
  UNDEFINED = 'undefined',
  /**
   * Stable status
   */
  STABLE = 'stable',
  /**
   * Informative status
   */
  INFORMATIVE = 'informative',
  /**
   * Incomplete status
   */
  INCOMPLETE = 'incomplete',
  /**
   * Draft status
   */
  DRAFT = 'draft',
}

/**
 * Custom incomplete icon implementation
 */
const IncompleteIcon = {
  render: () => html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      role="img"
      aria-label="incomplete status">
      <title>Incomplete Status Icon</title>
      <defs>
        <mask id="incomplete-mask">
          <path
            fill="white"
            d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2a4.004 4.004 0 0 1 4 4H4a4.004 4.004 0 0 1 4-4Z" />
        </mask>
      </defs>
      <rect
        width="16"
        height="16"
        fill="currentColor"
        mask="url(#incomplete-mask)" />
    </svg>
  `,
};

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
 * Shape Indicator web component.
 * @element cds-shape-indicator
 *
 * @property {number} size - Shape indicator size (12 or 14)
 * @property {string} label - Label next to the shape
 * @property {SHAPE_INDICATOR_KIND} kind - Shape indicator kind
 *
 * @fires cds-shape-indicator-beingcreated
 */
@customElement(`${prefix}-shape-indicator`)
class CDSShapeIndicator extends LitElement {
  /**
   * Shape indicator size (12 or 14)
   */
  @property({ type: Number })
  size = 12;

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

  /**
   * Validate size value
   * @private
   */
  private validateSize(size: number): number {
    return size === 14 ? 14 : 12;
  }

  /**
   * Lifecycle method called when properties change
   */
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('size')) {
      this.size = this.validateSize(this.size);
    }
  }

  render() {
    const Shape = shapeMap[this.kind];

    if (!Shape) {
      return null;
    }

    return html`
      <div class="shape-container">
        ${typeof Shape.render === 'function' ? Shape.render() : Shape()}
        ${this.label}
      </div>
    `;
  }

  /**
   * Styles are imported from the SCSS file
   */
  static styles = styles;
}

export default CDSShapeIndicator;
