/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import styles from './story-styles.scss?lit';
import './_story-assets/step-tearsheet';
import './_story-assets/step-full-page';
import './_story-assets/step-side-panel';

const renderTemplate = ({ narrow }) => {
  return html`
    <style>
      ${styles}
    </style>
    <step-tearsheet .narrow=${narrow}></step-tearsheet>
  `;
};

const renderFullPageTemplate = () => html`
  <style>
    ${styles}
  </style>
  <step-full-page> </step-full-page>
`;

const renderSidePanel = () => html`
  <style>
    ${styles}
  </style>
  <step-side-panel> </step-side-panel>
`;

export const Tearsheet = {
  args: {},
  render: renderTemplate,
  name: 'Tearsheet',
};

export const TearsheetNarrow = {
  args: {
    narrow: true,
  },
  render: renderTemplate,
  name: 'Tearsheet narrow',
};

export const FullPage = {
  args: {},
  render: renderFullPageTemplate,
  name: 'Full page',
};

export const SidePanel = {
  args: {},
  render: renderSidePanel,
  name: 'SidePanel',
};

export default {
  title: 'Utilities/Step flows',
};
