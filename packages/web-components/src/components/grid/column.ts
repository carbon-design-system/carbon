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

export type ColumnSpecSimple = `${number}` | `${number}%`;

export type ColumnSpec =
  | ColumnSpecSimple
  | `span:${number} start:${number}`
  | `span:${number} end:${number}`
  | `start:${number} end:${number}`;

/**
 * The column component.
 *
 * @element cds-column
 */
@customElement(`${prefix}-column`)
class CDSColumn extends LitElement {
  /**
   * Specify column size
   * Keys sm, md or lg
   *
   * Values
   * - N, P, { span:N start:S}, { start: S, end: E}
   * N = number
   * P = percentage
   * S = Start column
   * E = End column (does not reach e.g. start 1 end 3 is same as start 1 span 2)
   */
  @property({ reflect: true })
  sm?: ColumnSpec;

  @property({ reflect: true })
  md?: ColumnSpec;

  @property({ reflect: true })
  lg?: ColumnSpec;

  @property({ reflect: true })
  span?: ColumnSpecSimple;

  createRenderRoot() {
    return this;
  }
}

export default CDSColumn;
