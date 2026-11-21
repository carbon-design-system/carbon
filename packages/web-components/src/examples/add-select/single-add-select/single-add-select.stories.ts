/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../example/src/single-add-select/single-add-select';
import '../example/src/single-add-select/single-add-select-with-hierarchy';
import '../example/src/single-add-select/single-add-select-with-hierarchy-side-panel';

export default {
  title: 'Examples/Add and Select/Single add select',
};

export const Default = {
  name: 'Default',
  render: () => {
    return html`<single-add-select-example></single-add-select-example>`;
  },
};

export const WithHierarchy = {
  name: 'With Hierarchy',
  render: () => {
    return html`<single-add-select-with-hierarchy-example></single-add-select-with-hierarchy-example>`;
  },
};

export const WithHierarchyAndSidePanel = {
  name: 'With Hierarchy and Side Panel',
  render: () => {
    return html`<single-add-select-with-hierarchy-side-panel-example></single-add-select-with-hierarchy-side-panel-example>`;
  },
};
