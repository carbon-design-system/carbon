/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';

export const Default = () => html`
  <cds-heading>h1</cds-heading>
  <cds-section>
    <cds-heading>h2</cds-heading>
    <cds-section>
      <cds-heading>h3</cds-heading>
    </cds-section>
  </cds-section>
`;

export const CustomLevel = () => html`
  <cds-heading>h1</cds-heading>
  <cds-section level="5">
    <cds-heading>h5</cds-heading>
    <cds-section>
      <cds-heading>h6</cds-heading>
    </cds-section>
  </cds-section>
`;
const meta = {
  title: 'Components/Heading',
};

export default meta;
