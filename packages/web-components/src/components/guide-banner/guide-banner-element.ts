/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './guide-banner-element.scss?lit';

export const blockClass = `${prefix}--guidebanner__element`;

/**
 * GuideBannerElement.
 *
 * @element cds-guide-banner-element
 * @csspart guide-banner-element
 * */

@customElement(`${prefix}-guide-banner-element`)
class CDSGuideBannerElement extends LitElement {
  render() {
    return html`
      <div class="${blockClass}">
        <div class="${blockClass}__title">
          <slot name="title"></slot>
        </div>
        <div class="${blockClass}__description">
          <slot name="description"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSGuideBannerElement;
