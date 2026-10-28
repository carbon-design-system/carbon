/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './checkbox.scss?lit';

/**
 * Skeleton of checkbox.
 *
 * TODO(@carbon/web-components): Replace `export default` + manual
 * `defineCustomElement()` registration in `index.ts` with the
 * `@customElement()` decorator so this class appears in custom-elements.json
 * and `@carbon/angular` can generate a typed wrapper automatically.
 */
class CDSCheckboxSkeleton extends LitElement {
  static is = `${prefix}-checkbox-skeleton`;

  render() {
    return html`
      <label class="${prefix}--checkbox-label" for="checkbox" part="label">
        <span class="${prefix}--checkbox-label-text ${prefix}--skeleton"
          ><slot></slot
        ></span>
      </label>
    `;
  }

  static styles = styles;
}

export default CDSCheckboxSkeleton;
