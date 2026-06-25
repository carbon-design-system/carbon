/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import '../../../examples/delete-and-remove/src/delete-and-remove';
import './story-styles.scss';

export default {
  title: 'Patterns/Delete and remove',
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
