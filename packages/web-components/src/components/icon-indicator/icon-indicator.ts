/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { ICON_INDICATOR_KIND } from './defs';
import ErrorFilled16 from '@carbon/icons/lib/error--filled/16.js';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20.js';
import WarningAltInvertedFilled16 from '@carbon/icons/lib/warning--alt-inverted--filled/16.js';
import WarningAltInvertedFilled20 from '@carbon/icons/lib/warning--alt-inverted--filled/20.js';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16.js';
import WarningAltFilled20 from '@carbon/icons/lib/warning--alt--filled/20.js';
import UndefinedFilled16 from '@carbon/icons/lib/undefined--filled/16.js';
import UndefinedFilled20 from '@carbon/icons/lib/undefined--filled/20.js';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16.js';
import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20.js';
import CheckmarkOutline16 from '@carbon/icons/lib/checkmark--outline/16.js';
import CheckmarkOutline20 from '@carbon/icons/lib/checkmark--outline/20.js';
import InProgress16 from '@carbon/icons/lib/in-progress/16.js';
import InProgress20 from '@carbon/icons/lib/in-progress/20.js';
import Incomplete16 from '@carbon/icons/lib/incomplete/16.js';
import Incomplete20 from '@carbon/icons/lib/incomplete/20.js';
import CircleDash16 from '@carbon/icons/lib/circle-dash/16.js';
import CircleDash20 from '@carbon/icons/lib/circle-dash/20.js';
import Pending16 from '@carbon/icons/lib/pending--filled/16.js';
import Pending20 from '@carbon/icons/lib/pending--filled/20.js';
import UnknownFilled16 from '@carbon/icons/lib/unknown--filled/16.js';
import UnknownFilled20 from '@carbon/icons/lib/unknown--filled/20.js';
import WarningSquareFilled16 from '@carbon/icons/lib/warning-square--filled/16.js';
import WarningSquareFilled20 from '@carbon/icons/lib/warning-square--filled/20.js';
export { ICON_INDICATOR_KIND };

import styles from './icon-indicator.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const iconMap = {
  [ICON_INDICATOR_KIND.FAILED]: {
    16: ErrorFilled16,
    20: ErrorFilled20,
  },
  [ICON_INDICATOR_KIND['CAUTION-MAJOR']]: {
    16: WarningAltInvertedFilled16,
    20: WarningAltInvertedFilled20,
  },
  [ICON_INDICATOR_KIND['CAUTION-MINOR']]: {
    16: WarningAltFilled16,
    20: WarningAltFilled20,
  },
  [ICON_INDICATOR_KIND.UNDEFINED]: {
    16: UndefinedFilled16,
    20: UndefinedFilled20,
  },
  [ICON_INDICATOR_KIND.SUCCEEDED]: {
    16: CheckmarkFilled16,
    20: CheckmarkFilled20,
  },
  [ICON_INDICATOR_KIND.NORMAL]: {
    16: CheckmarkOutline16,
    20: CheckmarkOutline20,
  },
  [ICON_INDICATOR_KIND['IN-PROGRESS']]: {
    16: InProgress16,
    20: InProgress20,
  },
  [ICON_INDICATOR_KIND.INCOMPLETE]: {
    16: Incomplete16,
    20: Incomplete20,
  },
  [ICON_INDICATOR_KIND['NOT-STARTED']]: {
    16: CircleDash16,
    20: CircleDash20,
  },
  [ICON_INDICATOR_KIND.PENDING]: {
    16: Pending16,
    20: Pending20,
  },
  [ICON_INDICATOR_KIND.UNKNOWN]: {
    16: UnknownFilled16,
    20: UnknownFilled20,
  },
  [ICON_INDICATOR_KIND.INFORMATIVE]: {
    16: WarningSquareFilled16,
    20: WarningSquareFilled20,
  },
};

/**
 * Icon Indicator.
 *
 * @element cds-icon-indicator
 */
@customElement(`${prefix}-icon-indicator`)
class CDSIconIndicator extends LitElement {
  /**
   * Icon indicator should be size 16 or 20
   */
  @property()
  size = 16;

  /**
   * Label next to the icon.
   */
  @property()
  label!: string;

  /**
   * Icon Indicator kind
   */
  @property()
  kind!: ICON_INDICATOR_KIND;

  render() {
    const icon = iconMap[this.kind]?.[this.size];
    return html`${icon()}${this.label}`;
  }

  static styles = styles;
}

export default CDSIconIndicator;
