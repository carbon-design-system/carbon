/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './guide-banner-element.scss?lit';

export const blockClass = `${prefix}--guidebanner__element`;

/**
 * GuideBannerElement.
 *
 * @element c4p-guide-banner-element
 * @csspart guide-banner-element
 * */

@customElement(`${prefix}-guide-banner-element`)
class CDSGuideBannerElement extends HostListenerMixin(LitElement) {
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
