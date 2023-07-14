/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';

/**
 * An option in select box.
 *
 * @element cds-select-item
 */
@customElement(`${prefix}-select-item`)
class CDSSelectItem extends LitElement {
  /**
   * `true` to disable this option.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label. If this is not specified, the child text content is used.
   */
  @property({ reflect: true })
  label = '';

  /**
   * `true` to select this option.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The value.
   */
  @property({ reflect: true })
  value = '';
}

export default CDSSelectItem;
