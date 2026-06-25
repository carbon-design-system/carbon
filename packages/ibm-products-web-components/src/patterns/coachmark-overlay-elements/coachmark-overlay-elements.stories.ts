/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/coachmark-overlay-elements/src/coachmark-overlay-elements';

export default {
  title: 'Patterns/CoachmarkOverlayElements',
};

export const Default = {
  render: () => {
    return html`<div style="padding-top:200px; position: relative;">
      <coachmark-overlay-elements-example></coachmark-overlay-elements-example>
    </div>`;
  },
};
