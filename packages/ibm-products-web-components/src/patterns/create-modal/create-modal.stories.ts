/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/create-modal/src/create-modal';

export default {
  title: 'Patterns/Create flows/CreateModal',
  parameters: {
    docs: {
      description: {
        component: `The CreateModal component provides a way for a user to quickly generate a new resource. It is triggered by a user's action, appears on top of the main page content, and is persistent until dismissed. The purpose of this modal should be immediately apparent to the user, with a clear and obvious path to completion.`,
      },
    },
  },
};

export const CreateModal = {
  render: () => {
    return html`<standard-create-modal></standard-create-modal>`;
  },
};

export const CreateModalWithFormValidation = {
  render: () => {
    return html`<create-modal-with-form-validation></create-modal-with-form-validation>`;
  },
};
