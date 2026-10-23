/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './create-full-page/example/src/standard-create-full-page';
import './create-full-page/example/src/create-full-page-with-sections';
import './create-full-page/example/src/create-full-page-with-header';
import './create-full-page/example/src/create-full-page-with-step-in-error-state';
import './create-full-page/example/src/create-full-page-with-global-header';
import './_story-styles.scss';

export default {
  title: 'Examples/Create Flows/CreateFullPage',
};

export const CreateFullPage = {
  render: () => html`<standard-create-full-page></standard-create-full-page>`,
};

export const CreateFullPageWithSections = {
  render: () =>
    html`<create-full-page-with-sections></create-full-page-with-sections>`,
};

export const CreateFullPageWithHeader = {
  render: () =>
    html`<create-full-page-with-header></create-full-page-with-header>`,
};

export const CreateFullPageWithStepInErrorState = {
  render: () =>
    html`<create-full-page-with-step-in-error-state></create-full-page-with-step-in-error-state>`,
};

export const CreateFullPageWithGlobalHeader = {
  render: () =>
    html`<create-full-page-with-global-header></create-full-page-with-global-header>`,
};
