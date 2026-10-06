/**
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './example/src/delete-and-remove';
import './story-styles.scss';

export default {
  title: 'Examples/Delete and Remove',
};

export const highImpactDeletion = {
  render: () => {
    return html`<delete-high-impact></delete-high-impact>`;
  },
};

export const deletionWithConnectedItems = {
  render: () => {
    return html`<delete-connected-items></delete-connected-items>`;
  },
};

export const batchDeletion = {
  render: () => {
    return html`<delete-batch></delete-batch>`;
  },
};

export const mediumImpactDeletion = {
  render: () => {
    return html`<delete-remove-medium-impact
      action="delete"
    ></delete-remove-medium-impact>`;
  },
};

export const lowImpactDeletion = {
  render: () => {
    return html`<delete-remove-low-impact
      action="delete"
    ></delete-remove-low-impact>`;
  },
};
