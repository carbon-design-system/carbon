/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  AlignHorizontalCenter,
  ColorPalette,
  CopyFile,
  Draggable,
  Move,
  Minimize,
  OpenPanelLeft,
  OpenPanelRight,
  Pin,
  Printer,
  Save,
  Share,
  Undo,
  Upload,
  Redo,
  Rotate,
  RulerAlt,
  SettingsAdjust,
  Table,
  TextAlignCenter,
  TextCreation,
  ZoomIn,
  ZoomOut,
} from '@carbon/react/icons';

import { Dropdown, OverflowMenu, OverflowMenuItem } from '@carbon/react';

import React, { useState } from 'react';

import {
  previewCandidate__Toolbar as Toolbar,
  previewCandidate__ToolbarButton as ToolbarButton,
  previewCandidate__ToolbarGroup as ToolbarGroup,
} from '..';
import mdx from './Toolbar.mdx';

export default {
  title: 'Preview Candidate/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    vertical: {
      control: 'boolean',
    },
  },
};

function _Toolbar(args) {
  const dropdownItems = ['11', '12', '14', '16', '18'];

  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    dropdownItems[(dropdownItems.length / 2) | 0]
  );

  return (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton
          label="Save"
          renderIcon={(props) => <Save size={16} {...props} />}
        />
        <ToolbarButton
          label="Share"
          renderIcon={(props) => <Share size={16} {...props} />}
        />
        <ToolbarButton
          label="Upload"
          renderIcon={(props) => <Upload size={16} {...props} />}
        />
        <ToolbarButton
          label="Print"
          renderIcon={(props) => <Printer size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Undo"
          renderIcon={(props) => <Undo size={16} {...props} />}
        />
        <ToolbarButton
          label="Redo"
          renderIcon={(props) => <Redo size={16} {...props} />}
        />
        <ToolbarButton
          label="Zoom in"
          renderIcon={(props) => <ZoomIn size={16} {...props} />}
        />
        <ToolbarButton
          label="Zoom out"
          renderIcon={(props) => <ZoomOut size={16} {...props} />}
        />
        <ToolbarButton
          label="Minimize"
          renderIcon={(props) => <Minimize size={16} {...props} />}
        />

        <ToolbarButton
          label="Align horizontal center"
          renderIcon={(props) => <AlignHorizontalCenter size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Ruler"
          renderIcon={(props) => <RulerAlt size={16} {...props} />}
        />
        <ToolbarButton
          label="Pin"
          renderIcon={(props) => <Pin size={16} {...props} />}
        />
        <ToolbarButton
          label="Copy file"
          renderIcon={(props) => <CopyFile size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <Dropdown
          id="dropdown"
          hideLabel
          titleText="Font size"
          initialSelectedItem={selectedDropdownItem}
          items={dropdownItems}
          label={selectedDropdownItem}
          onChange={({ selectedItem }) => setSelectedDropdownItem(selectedItem)}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Text align center"
          renderIcon={(props) => <TextAlignCenter size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <OverflowMenu aria-label="List" flipped>
          <OverflowMenuItem itemText="Color palette" />
          <OverflowMenuItem itemText="Text creation" />
          <OverflowMenuItem itemText="Bulleted list" />
          <OverflowMenuItem itemText="Delete" hasDivider isDelete />
        </OverflowMenu>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Table"
          renderIcon={(props) => <Table size={16} {...props} />}
        />

        <ToolbarButton
          label="Settings adjust"
          renderIcon={(props) => <SettingsAdjust size={16} {...props} />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}

_Toolbar.args = {
  vertical: false,
};

function vertical(args) {
  return (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton
          label="Drag"
          renderIcon={(props) => <Draggable size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Ruler"
          renderIcon={(props) => <RulerAlt size={16} {...props} />}
        />
        <ToolbarButton
          label="Pin"
          renderIcon={(props) => <Pin size={16} {...props} />}
        />

        <ToolbarButton
          label="Color palette"
          renderIcon={(props) => <ColorPalette size={16} {...props} />}
        />

        <ToolbarButton
          label="Text creation"
          renderIcon={(props) => <TextCreation size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Open panel left"
          renderIcon={(props) => <OpenPanelLeft size={16} {...props} />}
        />

        <ToolbarButton
          label="Open panel right"
          renderIcon={(props) => <OpenPanelRight size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Move"
          renderIcon={(props) => <Move size={16} {...props} />}
        />
        <ToolbarButton
          label="Rotate"
          renderIcon={(props) => <Rotate size={16} {...props} />}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          label="Zoom in"
          renderIcon={(props) => <ZoomIn size={16} {...props} />}
        />
        <ToolbarButton
          label="Zoom out"
          renderIcon={(props) => <ZoomOut size={16} {...props} />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}

vertical.args = {
  vertical: true,
};

export { _Toolbar, vertical };
