/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './example/src/saving';
import './story-styles.scss';

export default {
  title: 'Examples/Saving',
};

export const Auto = {
  render: () => {
    return html`
      <div class="saving-stories__wrapper">
        <auto-saving></auto-saving>
      </div>
    `;
  },
};

export const Manual = {
  render: () => {
    return html`
      <div class="saving-stories__wrapper">
        <manual-saving></manual-saving>
      </div>
    `;
  },
};
