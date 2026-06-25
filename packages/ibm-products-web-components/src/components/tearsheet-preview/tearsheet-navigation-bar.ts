/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import '@carbon/web-components/es/components/modal/index.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import styles from './tearsheet-navigation-bar.scss?lit';

/**
 * tearsheet navigation bar at the bottom of the header
 * @element c4p-tearsheet-navigation-bar
 */
@customElement(`${prefix}-tearsheet-navigation-bar`)
class CDSTearsheetNavigationBar extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  slot = 'navigation-bar';

  render() {
    return html`
      <slot></slot>
      <slot name="scroller"></slot>
    `;
  }

  static styles = styles;
}
export default CDSTearsheetNavigationBar;
