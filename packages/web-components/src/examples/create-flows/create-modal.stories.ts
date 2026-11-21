/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './create-modal/example/src/standard-create-modal';
import './create-modal/example/src/create-modal-with-form-validation';
import './_story-styles.scss';

export default {
  title: 'Examples/Create Flows/CreateModal',
};

export const CreateModal = {
  render: () => html`<standard-create-modal></standard-create-modal>`,
};

export const CreateModalWithFormValidation = {
  render: () =>
    html`<create-modal-with-form-validation></create-modal-with-form-validation>`,
};
