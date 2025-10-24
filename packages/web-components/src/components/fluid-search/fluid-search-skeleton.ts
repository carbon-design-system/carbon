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
import CDSSearchSkeleton from '../search/search-skeleton';

/**
 * Fluid Search.
 *
 * @element cds-fluid-search-skeleton
 */
@customElement(`${prefix}-fluid-search-skeleton`)
class CDSFluidSearchSkeleton extends CDSSearchSkeleton {
  render() {
    return html`${super.render()}`;
  }

  static styles = [CDSSearchSkeleton.styles, styles];
}

export default CDSFluidSearchSkeleton;
