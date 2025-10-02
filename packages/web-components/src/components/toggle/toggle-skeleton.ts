/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './toggle.scss?lit';

/**
 * @element cds-toggle-skeleton
 *
 * Skeleton of toggle.
 */
@customElement(`${prefix}-toggle-skeleton`)
class CDSToggleSkeleton extends LitElement {
  render() {
    const skeletonClasses = classMap({
      [`${prefix}--toggle`]: true,
      [`${prefix}--toggle--skeleton`]: true,
    });

    return html`
      <div class=${skeletonClasses}>
        <div class="${prefix}--toggle__skeleton-circle"></div>
        <div class="${prefix}--toggle__skeleton-rectangle"></div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSToggleSkeleton;
