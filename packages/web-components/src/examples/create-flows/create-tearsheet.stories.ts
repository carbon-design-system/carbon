/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './create-tearsheet/example/src/index';
import './_story-styles.scss';

export default {
  title: 'Examples/Create Flows/CreateTearsheet',
};

export const MultiStep = {
  render: () =>
    html`<create-tearsheet-multi-step></create-tearsheet-multi-step>`,
};

export const MultiStepWithIntro = {
  render: () =>
    html`<create-tearsheet-with-intro></create-tearsheet-with-intro>`,
};

export const MultiStepWithStepInErrorState = {
  render: () =>
    html`<create-tearsheet-step-in-error-state></create-tearsheet-step-in-error-state>`,
};
