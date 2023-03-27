/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * An option in select box.
 *
 * @element bx-select-item
 */
@customElement(`${prefix}-select-item`)
class BXSelectItem extends LitElement {
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

export default BXSelectItem;
