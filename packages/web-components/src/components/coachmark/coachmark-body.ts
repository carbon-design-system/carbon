/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';

import styles from './coachmark-body.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';

/**
 * coachmark-body for content body
 * @element cds-coachmark-body
 */
class CDSCoachmarkBody extends SignalWatcher(HostListenerMixin(LitElement)) {
  static is = `${prefix}-coachmark-body`;

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}
export default CDSCoachmarkBody;
