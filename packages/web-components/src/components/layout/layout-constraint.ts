/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './layout.scss?lit';
import { type LayoutSize } from './layout';

/**
 * `<cds-layout-constraint>` restricts the size range available to its
 * descendant components.
 *
 * @element cds-layout-constraint
 */
@customElement(`${prefix}-layout-constraint`)
class CDSLayoutConstraint extends LitElement {
  static styles = styles;

  @property({ attribute: 'size-default', reflect: true })
  sizeDefault?: LayoutSize;

  @property({ attribute: 'size-min', reflect: true })
  sizeMin?: LayoutSize;

  @property({ attribute: 'size-max', reflect: true })
  sizeMax?: LayoutSize;

  render() {
    return html`<slot></slot>`;
  }
}

export { CDSLayoutConstraint };
export default CDSLayoutConstraint;
