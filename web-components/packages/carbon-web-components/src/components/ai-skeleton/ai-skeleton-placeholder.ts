/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './ai-skeleton.scss';
import '../skeleton-placeholder/skeleton-placeholder';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * AI skeleton placeholder.
 *
 * @element cds-ai-skeleton-placeholder
 */
@customElement(`${prefix}-ai-skeleton-placeholder`)
class CDSAISkeletonPlaceholder extends LitElement {
  render() {
    return html`<cds-skeleton-placeholder
      optional-classes="${prefix}--skeleton__placeholder--ai"></cds-skeleton-placeholder>`;
  }

  static styles = styles;
}

export default CDSAISkeletonPlaceholder;
