/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './create-side-panel/example/src/index';
import './_story-styles.scss';

export default {
  title: 'Examples/Create Flows/Create sidepanel',
};

export const Default = {
  render: () => html`<create-side-panel-default></create-side-panel-default>`,
};

export const WithFormValidation = {
  render: () =>
    html`<create-side-panel-with-form-validation></create-side-panel-with-form-validation>`,
};
