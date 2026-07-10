/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Grid, Column } from '../Grid';
import { Stack } from '../Stack';

import Button from '../Button';
import { ComboBox } from '../ComboBox';
import { ComboButton } from '../ComboButton';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import { default as Dropdown } from '../Dropdown';
import {
  FileUploader,
  FileUploaderButton,
  FileUploaderDropContainer,
} from '../FileUploader';
import { MenuButton } from '../MenuButton';
import { Modal } from '../Modal';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import { ActionableNotification } from '../Notification';
import { OverflowMenu } from '../OverflowMenu';
import { OverflowMenuItem } from '../OverflowMenuItem';
import { Popover, PopoverContent } from '../Popover';
import { default as RadioTile } from '../RadioTile';
import { TileGroup } from '../TileGroup';
import { ClickableTile } from '../Tile';
import { default as TextInput } from '../TextInput';
import { TreeView, TreeNode } from '../TreeView';
import { MenuItem, MenuItemDivider } from '../Menu';
import { Information, Folder, Document } from '@carbon/icons-react';

// ─────────────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/FeatureFlags/KitchenSink',
  parameters: { layout: 'fullscreen' },
};

// ── Shared data ───────────────────────────────────────────────────────────────
const dropdownItems = [
  { id: 'opt-1', text: 'Option 1' },
  { id: 'opt-2', text: 'Option 2' },
  { id: 'opt-3', text: 'Option 3' },
];
const comboItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// ── Section label ─────────────────────────────────────────────────────────────
function Section({ flag, children }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--cds-border-subtle)',
        paddingTop: '1rem',
        paddingBottom: '0.5rem',
        marginBottom: '0.5rem',
      }}>
      <p
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--cds-code-01-font-family, monospace)',
          color: 'var(--cds-text-secondary)',
          marginBottom: '0.75rem',
        }}>
        {flag}
      </p>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Kitchen Sink — only components that use useFeatureFlag
// ─────────────────────────────────────────────────────────────────────────────
function KitchenSinkContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [composedModalOpen, setComposedModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <Grid>
        {/* ── enable-v12-dynamic-floating-styles ───────────────────────────── */}
        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-v12-dynamic-floating-styles">
            <Stack gap={5}>
              <Dropdown
                id="ff-dd"
                titleText="Dropdown"
                label="Select"
                items={dropdownItems}
                itemToString={(item) => (item ? item.text : '')}
              />
              <ComboBox
                id="ff-cb"
                titleText="ComboBox"
                placeholder="Filter…"
                items={comboItems}
                itemToString={(item) => item ?? ''}
              />
              <MultiSelect
                id="ff-ms"
                titleText="MultiSelect"
                label="Select all"
                items={dropdownItems}
                itemToString={(item) => (item ? item.text : '')}
              />
              <FilterableMultiSelect
                id="ff-fms"
                titleText="FilterableMultiSelect"
                placeholder="Filter…"
                items={dropdownItems}
                itemToString={(item) => (item ? item.text : '')}
              />
            </Stack>
          </Section>
        </Column>

        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-v12-dynamic-floating-styles (cont.)">
            <Stack gap={5}>
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--cds-text-secondary)',
                    marginBottom: '0.5rem',
                  }}>
                  ComboButton
                </p>
                <ComboButton label="Primary action">
                  <MenuItem label="Edit" />
                  <MenuItem label="Duplicate" />
                  <MenuItemDivider />
                  <MenuItem label="Delete" kind="danger" />
                </ComboButton>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--cds-text-secondary)',
                    marginBottom: '0.5rem',
                  }}>
                  MenuButton
                </p>
                <MenuButton label="Options">
                  <MenuItem label="Edit" />
                  <MenuItem label="Duplicate" />
                  <MenuItemDivider />
                  <MenuItem label="Delete" kind="danger" />
                </MenuButton>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--cds-text-secondary)',
                    marginBottom: '0.5rem',
                  }}>
                  Popover
                </p>
                <Popover open={popoverOpen} align="bottom-left">
                  <button
                    type="button"
                    aria-label="Toggle popover"
                    onClick={() => setPopoverOpen((o) => !o)}>
                    <Information />
                  </button>
                  <PopoverContent>
                    <p style={{ padding: '1rem' }}>Popover content</p>
                  </PopoverContent>
                </Popover>
              </div>
            </Stack>
          </Section>
        </Column>

        {/* ── enable-v12-overflowmenu ───────────────────────────────────────── */}
        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-v12-overflowmenu">
            <OverflowMenu>
              <OverflowMenuItem itemText="Edit" />
              <OverflowMenuItem itemText="Duplicate" />
              <OverflowMenuItem itemText="Delete" isDelete hasDivider />
            </OverflowMenu>
          </Section>
        </Column>

        {/* ── enable-v12-tile-default-icons ─────────────────────────────────── */}
        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-v12-tile-default-icons">
            <Stack gap={4}>
              <ClickableTile href="#">Clickable tile</ClickableTile>
              <ClickableTile href="#" disabled>
                Disabled clickable tile
              </ClickableTile>
            </Stack>
          </Section>
        </Column>

        {/* ── enable-v12-tile-radio-icons ───────────────────────────────────── */}
        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-v12-tile-radio-icons">
            <TileGroup
              name="ff-tg"
              defaultSelected="rt-2"
              legend="Select region">
              <RadioTile id="rt-1" value="rt-1">
                US East
              </RadioTile>
              <RadioTile id="rt-2" value="rt-2">
                US West
              </RadioTile>
              <RadioTile id="rt-3" value="rt-3" disabled>
                EU (disabled)
              </RadioTile>
            </TileGroup>
          </Section>
        </Column>

        {/* ── enable-treeview-controllable ──────────────────────────────────── */}
        <Column sm={4} md={4} lg={4}>
          <Section flag="enable-treeview-controllable">
            <TreeView label="File tree">
              <TreeNode id="tv-1" label="src" renderIcon={Folder} isExpanded>
                <TreeNode id="tv-1a" label="index.tsx" renderIcon={Document} />
                <TreeNode id="tv-1b" label="App.tsx" renderIcon={Document} />
              </TreeNode>
              <TreeNode id="tv-2" label="public" renderIcon={Folder}>
                <TreeNode id="tv-2a" label="index.html" renderIcon={Document} />
              </TreeNode>
            </TreeView>
          </Section>
        </Column>

        {/* ── enable-enhanced-file-uploader ─────────────────────────────────── */}
        <Column sm={4} md={8} lg={8}>
          <Section flag="enable-enhanced-file-uploader">
            <Stack gap={4}>
              <FileUploaderButton labelText="Upload files" />
              <FileUploaderDropContainer labelText="Drag and drop files here or click to upload" />
              <FileUploader
                labelTitle="Upload document"
                labelDescription="Max file size is 500mb."
                buttonLabel="Add file"
                filenameStatus="edit"
                accept={['.jpg', '.pdf']}
              />
            </Stack>
          </Section>
        </Column>

        {/* ── enable-focus-wrap-without-sentinels / enable-dialog-element ──── */}
        {/* ── enable-presence ──────────────────────────────────────────────── */}
        <Column sm={4} md={8} lg={8}>
          <Section flag="enable-presence · enable-dialog-element · enable-focus-wrap-without-sentinels">
            <Stack orientation="horizontal" gap={4}>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Button
                kind="secondary"
                onClick={() => setComposedModalOpen(true)}>
                Open ComposedModal
              </Button>
            </Stack>

            <Modal
              open={modalOpen}
              modalHeading="Modal"
              modalLabel="Label"
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
              onRequestClose={() => setModalOpen(false)}
              onRequestSubmit={() => setModalOpen(false)}>
              <p>Modal body content.</p>
            </Modal>

            <ComposedModal
              open={composedModalOpen}
              onClose={() => setComposedModalOpen(false)}>
              <ModalHeader title="ComposedModal" label="Label" />
              <ModalBody>
                <TextInput
                  id="cm-input"
                  labelText="Domain"
                  placeholder="example.com"
                />
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
                onRequestClose={() => setComposedModalOpen(false)}
                onRequestSubmit={() => setComposedModalOpen(false)}
              />
            </ComposedModal>
          </Section>
        </Column>

        {/* ── enable-focus-wrap-without-sentinels (ActionableNotification) ─── */}
        <Column sm={4} md={8} lg={8}>
          <Section flag="enable-focus-wrap-without-sentinels (ActionableNotification)">
            <ActionableNotification
              kind="info"
              title="Action required:"
              subtitle="Click the action button to continue."
              actionButtonLabel="Take action"
            />
          </Section>
        </Column>
      </Grid>
    </div>
  );
}

export const KitchenSink = {
  argTypes: {
    instances: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Number of times to render the kitchen sink',
    },
  },
  args: {
    instances: 1,
  },
  render: ({ instances }) =>
    Array.from({ length: instances }, (_, i) => <KitchenSinkContent key={i} />),
};
