/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-search.scss?lit';
import CDSSearch from '../search/search';

/**
 * Fluid text input.
 *
 * @element cds-fluid-search
 */
@customElement(`${prefix}-fluid-search`)
class CDSFluidSearch extends CDSSearch {
  render() {
    const { labelText, id } = this;

    return html`
      <label for="${id}" part="label-text" class="${prefix}--label"
        >${labelText}</label
      >
      ${super.render()}
    `;
  }

  static styles = [CDSSearch.styles, styles];
}

export default CDSFluidSearch;
