/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSButton from '../button/button';
import buttonStyles from '../button/button.scss?lit';
import popoverStyles from '../popover/popover.scss?lit';
import tooltipStyles from '../tooltip/tooltip.scss?lit';
import toggletipStyles from '../toggle-tip/toggletip.scss?lit';
import styles from './ai-label.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * AI Label action button.
 *
 * @element cds-ai-label-action-button
 */
@customElement(`${prefix}-ai-label-action-button`)
class CDSAILabelActionButton extends CDSButton {
  /**
   * The shadow slot this ai-label-action should be in.
   */
  @property({ reflect: true })
  slot = 'actions';

  static styles = [
    buttonStyles,
    popoverStyles,
    tooltipStyles,
    toggletipStyles,
    styles,
  ];
}

export default CDSAILabelActionButton;
