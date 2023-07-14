/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * An option group in select box.
 *
 * @element cds-select-item-group
 */
@customElement(`${prefix}-select-item-group`)
class CDSSelectItemGroup extends LitElement {
  /**
   * `true` to disable this option.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label.
   */
  @property({ reflect: true })
  label = '';
}

export default CDSSelectItemGroup;
