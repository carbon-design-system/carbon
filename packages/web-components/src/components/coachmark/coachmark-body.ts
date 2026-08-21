/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

import styles from './coachmark-body.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';

/**
 * coachmark-body for content body
 * @element cds-coachmark-body
 */
@customElement(`${prefix}-coachmark-body`)
class CDSCoachmarkBody extends SignalWatcher(HostListenerMixin(LitElement)) {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}
export default CDSCoachmarkBody;
