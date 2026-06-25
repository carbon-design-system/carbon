/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/api-key-modal/src/api-key-modal';
import './story-styles.scss';

export default {
  title: 'Patterns/APIKeyModal',
};

export const Generate = {
  render: () => {
    return html` <generate-apikey-modal> </generate-apikey-modal> `;
  },
};

export const GenerateWithError = {
  render: () => {
    return html` <generate-apikey-modal-error> </generate-apikey-modal-error> `;
  },
};

export const InstantGenerate = {
  render: () => {
    return html` <instant-generate> </instant-generate> `;
  },
};

export const CustomGenerate = {
  render: () => {
    return html` <custom-generate> </custom-generate> `;
  },
};

export const Edit = {
  render: () => {
    return html` <edit-apikey-modal> </edit-apikey-modal> `;
  },
};

export const EditWithError = {
  render: () => {
    return html` <edit-apikey-modal-error> </edit-apikey-modal-error> `;
  },
};

export const CustomEdit = {
  render: () => {
    return html` <custom-generate editing="true"> </custom-generate> `;
  },
};
