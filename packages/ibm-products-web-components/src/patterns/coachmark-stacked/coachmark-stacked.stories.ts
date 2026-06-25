/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/coachmark-stacked/src/coachmark-stacked';

export default {
  title: 'Patterns/CoachmarkStacked',
};

export const Default = {
  render: () => {
    return html` <coachmark-stacked-example></coachmark-stacked-example>`;
  },
};
