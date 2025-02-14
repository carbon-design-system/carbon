/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';

export const Default = {
  render: () => {
    return html`
      <cds-menu>
        <cds-menu-item label="Item 1" kind="danger"></cds-menu-item>
        <cds-menu-item label="Item 2" shortcut="⌘X"></cds-menu-item>
        <cds-menu-item label="Item 3" shortcut="⌘V">
          <cds-menu-item label="Sub 1"></cds-menu-item>
          <cds-menu-item label="Sub 2"></cds-menu-item>
          <cds-menu-item label="Sub 3"></cds-menu-item>
        </cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Item 4" disabled></cds-menu-item>
        <cds-menu-item label="Item 5"></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-group>
          <cds-menu-item-selectable label="Item 6"></cds-menu-item-selectable>
          <cds-menu-item-selectable label="Item 7"></cds-menu-item-selectable>
        </cds-menu-item-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-radio-group
          label="samples"
          items='["One", "Two", "Three"]'
          selectedItem="One"></cds-menu-item-radio-group>
      </cds-menu>
    `;
  },
};

const meta = {
  title: 'Components/Menu',
};

export default meta;
