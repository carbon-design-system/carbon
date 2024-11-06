/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSButton from '../button/button';
import styles from './ai-label.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * AI Label action button.
 *
 * @element cds-ai-label-action-button
 */
@customElement(`${prefix}-ai-label-action-button`)
export default class CDSAILabelActionButton extends CDSButton {
  /**
   * The shadow slot this ai-label-action should be in.
   */
  @property({ reflect: true })
  slot = 'actions';

  static styles = styles;
}
