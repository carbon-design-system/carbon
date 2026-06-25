/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import styles from './coachmark-body.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';

/**
 * coachmark-body for content body
 * @element c4p-coachmark-body
 */
@customElement(`${prefix}-coachmark-body`)
class CDSCoachmarkBody extends SignalWatcher(HostListenerMixin(LitElement)) {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}
export default CDSCoachmarkBody;
