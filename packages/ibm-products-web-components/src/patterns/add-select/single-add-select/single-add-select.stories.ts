/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../../examples/add-select/src/single-add-select/single-add-select';

export default {
  title: 'Patterns/Add and select/Single add select',
};

export const singleAddSelect = {
  render: () => {
    return html`<single-add-select-example></single-add-select-example>`;
  },
};
