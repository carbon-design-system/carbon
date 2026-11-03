/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './example/src/about-modal';

export default {
  title: 'Examples/About Modal',
};

export const Standard = {
  render: () => {
    return html`<standard-about-modal></standard-about-modal>`;
  },
};

export const WithAdditionalContent = {
  render: () => {
    return html`<about-modal-with-additional-content></about-modal-with-additional-content>`;
  },
};
