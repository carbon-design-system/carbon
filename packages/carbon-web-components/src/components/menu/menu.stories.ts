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
    const itemlist = ['None', 'Overline', 'Line-through', 'Underline'];
    const subitemlist = ['None', 'Product team', 'Organization', 'Company'];
    return html`
      <cds-menu>
        <cds-menu-item label="Share with">
          <cds-menu-item-radio-group
            label="Share with list"
            .items="${subitemlist}"
            selectedItem="None"></cds-menu-item-radio-group>
        </cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Cut" shortcut="⌘X"></cds-menu-item>
        <cds-menu-item label="Copy" shortcut="⌘C"></cds-menu-item>
        <cds-menu-item label="Paste" shortcut="⌘V" disabled></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-group>
          <cds-menu-item-selectable
            label="Bold"
            selected></cds-menu-item-selectable>
          <cds-menu-item-selectable label="Italic"></cds-menu-item-selectable>
        </cds-menu-item-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item-radio-group
          label="samples"
          .items="${itemlist}"
          selectedItem="None"></cds-menu-item-radio-group>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item
          label="Delete"
          shortcut="⌫"
          kind="danger"></cds-menu-item>
      </cds-menu>
    `;
  },
};

const meta = {
  title: 'Components/Menu',
};

export default meta;
