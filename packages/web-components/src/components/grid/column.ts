/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';

export type ColumnSpec =
  | Number
  | `${number}%`
  | `span:${number} start:${number}`
  | `span:${number}% start:${number}`;

@customElement(`${prefix}-column`)
class CDSColumn extends LitElement {
  /**
   * Specify column size
   * Keys sm, md or lg
   *
   * Values
   * - N, P, { span:N start:S}
   * N = number
   * P = percentage
   * S = Start column
   */
  @property({ reflect: true, attribute: 'sm' })
  sm?: ColumnSpec;

  @property({ reflect: true, attribute: 'md' })
  md?: ColumnSpec;

  @property({ reflect: true, attribute: 'lg' })
  lg?: ColumnSpec;

  @property({ reflect: true, attribute: 'span' })
  span?: ColumnSpec;

  createRenderRoot() {
    return this;
  }
}

export default CDSColumn;
