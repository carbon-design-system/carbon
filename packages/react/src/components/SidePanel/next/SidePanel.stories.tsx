/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { Copy, Information, Settings } from '@carbon/icons-react';
import { AILabel, AILabelContent } from '../../AILabel';
import Button from '../../Button';
import { Tab } from '../../Tab';
import { TabList, Tabs } from '../../Tabs';
import TextInput from '../../TextInput';
import TextArea from '../../TextArea';
import { MultiSelect } from '../../MultiSelect';
import { ProgressBar } from '../../ProgressBar';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../DataTable';
import { Header, HeaderContainer, HeaderName } from '../../UIShell';
import './_storybook-styles.scss';
import { SidePanel } from './SidePanel';
import type { SidePanelProps } from './SidePanel.types';
import docs from './SidePanel.mdx';

const prefix = 'side-panel-stories__';

const sampleAILabel = (
  <AILabel className="aiLabel-container" size="xs" align="bottom">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
    </AILabelContent>
  </AILabel>
);

const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header aria-label="IBM Cloud Pak" className={`${prefix}header`}>
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
      </Header>
    )}
  />
);

// ============================================================================
// Default Export & ArgTypes
// ============================================================================

export default {
  title: 'Preview/preview__SidePanel',
  component: SidePanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: docs,
    },
  },
  subcomponents: {
    'SidePanel.Header': SidePanel.Header,
    'SidePanel.HeaderContent': SidePanel.HeaderContent,
    'SidePanel.HeaderActions': SidePanel.HeaderActions,
    'SidePanel.HeaderActionItem': SidePanel.HeaderActionItem,
    'SidePanel.Toolbar': SidePanel.Toolbar,
    'SidePanel.NavBar': SidePanel.NavBar,
    'SidePanel.Body': SidePanel.Body,
    'SidePanel.Footer': SidePanel.Footer,
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Panel width token.',
    },
    placement: {
      control: { type: 'radio' },
      options: ['right', 'left'],
      description: 'Side of the viewport where the panel docks.',
    },
    variant: {
      control: { type: 'radio' },
      options: ['slideOver', 'slideIn'],
      description: 'Presentation mode: `slideOver` or `slideIn`.',
    },
    includeOverlay: {
      control: { type: 'boolean' },
      description: 'Renders a backdrop overlay in the `slideOver` variant.',
    },
    preventCloseOnClickOutside: {
      control: { type: 'boolean' },
      description: 'Prevents dismissal when clicking outside the panel.',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the panel.',
    },
  },
  args: {
    open: false,
    size: 'md',
    placement: 'right',
    variant: 'slideOver',
    includeOverlay: false,
    preventCloseOnClickOutside: false,
    // Used when the `variant` control is switched to `slideIn`.
    selectorPageContent: '#ibm-products-page-content',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className={`${prefix}viewport`}>
        {renderUIShellHeader()}
        <div
          className={`${prefix}story-content`}
          id="ibm-products-page-content">
          <Story />
        </div>
      </div>
    ),
  ],
};

const defaultHeaderContent = {
  title:
    'Incident management for your application, testing a very long title to see how this behaves with a longer title',
  label: 'Incident management',
  description: (
    <>
      This is some text that would talk about how you could{' '}
      <strong>investigate</strong> incident management within this side panel.
    </>
  ),
};

const headerData = [
  { id: 1, header: 'Column header', key: 'value' },
  { id: 2, header: 'Column header', key: 'value' },
];

const rowData = [
  { id: 'a', value: 'Cell text a' },
  { id: 'b', value: 'Cell text b' },
  { id: 'c', value: 'Cell text c' },
  { id: 'd', value: 'Cell text d' },
  { id: 'e', value: 'Cell text e' },
  { id: 'f', value: 'Cell text f' },
];

const renderDataTable = () => (
  <DataTable rows={rowData} headers={headerData}>
    {({ rows, headers }) => (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key}>{header.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

const ChildrenContent = () => {
  const [notesValue, setNotesValue] = useState('');
  return (
    <div className={`${prefix}body-content`}>
      <h3 className={`${prefix}body-subheading`}>Section</h3>
      <div className={`${prefix}text-inputs`}>
        <TextInput labelText="Input A" id="side-panel-story-text-input-a" />
        <TextInput labelText="Input B" id="side-panel-story-text-input-b" />
      </div>
      <div className={`${prefix}text-inputs`}>
        <TextInput labelText="Input C" id="side-panel-story-text-input-c" />
        <TextInput labelText="Input D" id="side-panel-story-text-input-d" />
      </div>
      <div className={`${prefix}multi-select-container`}>
        <MultiSelect
          id="multiselectA"
          titleText="Multiselect A"
          label="Select an item"
          items={[{ value: 'all', label: 'Multiselect A' }]}
          itemToString={(item) => item?.label ?? ''}
          selectionFeedback="top-after-reopen"
        />
      </div>
      <div className={`${prefix}text-area-container`}>
        <span
          className={[
            `${prefix}allowed-characters`,
            notesValue.length > 100
              ? `${prefix}allowed-characters-invalid`
              : '',
          ].join(' ')}>
          {notesValue.length}/100
        </span>
        <TextArea
          id="side-panel-textarea"
          labelText="Notes"
          value={notesValue}
          onChange={(e) => setNotesValue(e.target.value)}
        />
      </div>
      <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
        Section
      </h3>
      {renderDataTable()}
    </div>
  );
};

// Keeps the `open` control and the trigger button in sync.
const useSidePanelState = () => {
  const [{ open }, updateArgs] = useArgs<SidePanelProps>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const setOpen = (value: boolean) => updateArgs({ open: value });
  return { open: !!open, setOpen, triggerRef };
};

// ============================================================================
// 1. Default
// ============================================================================

export const Default = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        //decorator={sampleAILabel}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

// ============================================================================
// 2. Without title (header space preserved, close button right-aligned)
// ============================================================================

export const WithoutTitle = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        aria-label="Diagnostic logs"
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        {/* `hideCloseButton` defaults to false, so the close icon is rendered. */}
        <SidePanel.Header />
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

// ============================================================================
// 3. Static title (header scroll collapse disabled)
// ============================================================================

export const StaticTitle = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header disableHeaderCollapse={true}>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

// ============================================================================
// 4. With icon (titleStart) and title media (titleMedia- followup)
// ============================================================================

export const WithIconHeader = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent
            {...defaultHeaderContent}
            title="Incident management"
            label=""
            titleStart={<Information size={16} aria-label="Status: Info" />}>
            <ProgressBar
              label="Incident resolution"
              helperText="3 of 5 steps complete"
              value={60}
              max={100}
              size="small"
            />
          </SidePanel.HeaderContent>
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

export const WithToolbar = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
          <SidePanel.Toolbar>
            <Button kind="primary" size="sm" renderIcon={Copy}>
              Copy
            </Button>
            <Button kind="secondary" size="sm" renderIcon={Settings}>
              Configure
            </Button>
          </SidePanel.Toolbar>
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

// ============================================================================
// 7. With navigation bar (sticky Tabs)
// ============================================================================

export const WithNavBar = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
          <SidePanel.Toolbar>
            <Button kind="primary" size="sm" renderIcon={Copy}>
              Copy
            </Button>
            <Button kind="secondary" size="sm" renderIcon={Settings}>
              Configure
            </Button>
          </SidePanel.Toolbar>
          <SidePanel.NavBar>
            <Tabs>
              <TabList aria-label="Configuration tabs">
                <Tab>General</Tab>
                <Tab>Networking</Tab>
                <Tab>Security</Tab>
              </TabList>
            </Tabs>
          </SidePanel.NavBar>
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

WithNavBar.args = {
  size: 'sm',
};

export const WithAILabel = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        decorator={sampleAILabel}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
      </SidePanel>
    </>
  );
};

WithAILabel.args = {
  includeOverlay: true,
};

export const SlideInVariant = (args: SidePanelProps) => {
  const { open, setOpen, triggerRef } = useSidePanelState();

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        {open ? 'Close SidePanel' : 'Open SidePanel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        launcherButtonRef={triggerRef}
        onRequestClose={() => setOpen(false)}>
        <SidePanel.Header>
          <SidePanel.HeaderContent {...defaultHeaderContent} />
        </SidePanel.Header>
        <SidePanel.Body>
          <ChildrenContent />
        </SidePanel.Body>
        <SidePanel.Footer
          actions={[
            { label: 'Submit', kind: 'primary', onClick: () => setOpen(false) },
          ]}
        />
      </SidePanel>
    </>
  );
};

SlideInVariant.args = {
  variant: 'slideIn',
};
