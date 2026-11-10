/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './example/src/coachmark-fixed';

export default {
  title: 'Examples/Coachmark/CoachmarkFixed',
};

export const Default = {
  render: () => {
    return html` <coachmark-fixed-example></coachmark-fixed-example>`;
  },
};
