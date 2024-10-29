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
import styles from './slug.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Slug action button.
 *
 * @deprecated This component has been deprecated, please use the <cds-ai-label-action-button> component instead.
 * @element cds-slug-action-button
 */
@customElement(`${prefix}-slug-action-button`)
export default class CDSSlugActionButton extends CDSButton {
  /**
   * The shadow slot this slug-action should be in.
   */
  @property({ reflect: true })
  slot = 'actions';

  static styles = styles;
}
