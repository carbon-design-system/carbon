/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/create-full-page/src/standard-create-full-page';
import '../../../examples/create-full-page/src/create-full-page-with-sections';
import '../../../examples/create-full-page/src/create-full-page-with-header';
import '../../../examples/create-full-page/src/create-full-page-with-step-in-error-state';
import '../../../examples/create-full-page/src/create-full-page-with-global-header';

export default {
  title: 'Patterns/Create flows/CreateFullPage',
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
};

export const CreateFullPage = {
  render: () => {
    return html`<standard-create-full-page></standard-create-full-page>`;
  },
};

export const CreateFullPageWithSections = {
  render: () => {
    return html`<create-full-page-with-sections></<create-full-page-with-sections>`;
  },
};

export const CreateFullPageWithHeader = {
  render: () => {
    return html`<create-full-page-with-header></<create-full-page-with-header>`;
  },
};

export const CreateFullPageWithStepInErrorState = {
  render: () => {
    return html`<create-full-page-with-step-in-error-state></<create-full-page-with-step-in-error-state>`;
  },
};

export const CreateFullPageWithGlobalHeader = {
  render: () => {
    return html`<create-full-page-with-global-header></<create-full-page-with-global-header>`;
  },
};
