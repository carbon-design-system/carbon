/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/skeleton-text/index.js';
import '@carbon/web-components/es/components/skeleton-placeholder/index.js';

import { prefix } from '../../globals/settings';
import { BigNumberSize, BigNumberSizeValues } from './constants';
import styles from './big-number-skeleton.scss?lit';

const blockClass = `${prefix}--big-number-skeleton`;

/**
 * @element c4p-big-number-skeleton
 * Note: This component is only used within c4p-big-number. It displays a skeleton version while content is loading (handled by the c4p-big-number prop `loading').
 */

@customElement(`${prefix}-big-number-skeleton`)
class CDSBigNumberSkeleton extends LitElement {
  @property({ type: String })
  size?: BigNumberSizeValues = BigNumberSize.Default;

  render() {
    const { size } = this;

    const bigNumberSkeletonClasses = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--lg`]: size === BigNumberSize.Large,
      [`${blockClass}--xl`]: size === BigNumberSize.XLarge,
    });

    return html`
      <div class=${bigNumberSkeletonClasses}>
        <cds-skeleton-text class="${blockClass}__label"></cds-skeleton-text>
        <cds-skeleton-placeholder
          class="${blockClass}__value"
        ></cds-skeleton-placeholder>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSBigNumberSkeleton;
