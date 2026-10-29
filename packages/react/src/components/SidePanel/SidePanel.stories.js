/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { action } from 'storybook/actions';
import {
  Button,
  TextArea,
  TextInput,
  MultiSelect,
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Header,
  HeaderContainer,
  HeaderName,
  AILabel,
  AILabelContent,
} from '@carbon/react';
import { Copy, TrashCan, Settings } from '@carbon/react/icons';
import { SidePanel } from './SidePanel';
import mdx from './SidePanel.mdx';

// ---------------------------------------------------------------------------
// Story prefix & shared data
// ---------------------------------------------------------------------------

const prefix = 'side-panel-stories__';

const defaultStoryProps = {
  title:
    'Incident management for your application, testing a very long title to see how this behaves with a longer title',
  subtitle: (
    <>
      This is some text that would talk about how you could{' '}
      <strong>investigate</strong> incident management within this side panel.
    </>
  ),
  id: 'storybook-sidepanel',
  size: 'md',
  placement: 'right',
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

// ---------------------------------------------------------------------------
// Action button sets
// ---------------------------------------------------------------------------

const mkAction = (label, kind = 'primary') => ({
  label,
  kind,
  onClick: action(`Clicked: ${label}`),
});

const actionSets = [
  [mkAction('Submit')],
  [mkAction('Ghost button', 'ghost')],
  [mkAction('Danger button', 'danger')],
  [mkAction('Submit'), mkAction('Cancel', 'secondary')],
  [mkAction('Ghost button', 'ghost'), mkAction('Submit')],
  [mkAction('Ghost button', 'ghost'), mkAction('Danger button', 'danger')],
  [
    mkAction('Submit'),
    mkAction('Cancel', 'secondary'),
    mkAction('Ghost button', 'ghost'),
  ],
  [
    mkAction('Cancel', 'secondary'),
    mkAction('Cancel', 'secondary'),
    mkAction('Danger button', 'danger'),
  ],
  [
    mkAction('Submit'),
    mkAction('Cancel', 'secondary'),
    mkAction('Cancel', 'secondary'),
  ],
  [],
];

// ---------------------------------------------------------------------------
// Toolbar button sets
// ---------------------------------------------------------------------------

const toolbarActions = [
  null,
  [
    {
      leading: true,
      label: 'Copy',
      icon: (p) => <Copy size={16} {...p} />,
      onClick: action('Copy'),
      kind: 'primary',
    },
  ],
  [
    {
      leading: true,
      label: 'Copy',
      icon: (p) => <Copy size={16} {...p} />,
      onClick: action('Copy'),
      kind: 'primary',
    },
    {
      label: 'Settings',
      icon: (p) => <Settings size={16} {...p} />,
      onClick: action('Settings'),
      hasIconOnly: true,
    },
  ],
  [
    {
      leading: true,
      label: 'Copy',
      icon: (p) => <Copy size={16} {...p} />,
      onClick: action('Copy'),
      kind: 'primary',
    },
    {
      label: 'Settings',
      icon: (p) => <Settings size={16} {...p} />,
      onClick: action('Settings'),
      hasIconOnly: true,
    },
    {
      label: 'Delete',
      icon: (p) => <TrashCan size={16} {...p} />,
      onClick: action('Delete'),
      hasIconOnly: true,
    },
  ],
];

// ---------------------------------------------------------------------------
// Shared decorative content
// ---------------------------------------------------------------------------

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

const renderDataTable = () => (
  <DataTable
    rows={rowData}
    headers={headerData}
    render={({ rows, headers }) => (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.id}>{header.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {row.cells.map((cell, j) => (
                  <TableCell key={j}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const ChildrenContent = () => {
  const [notesValue, setNotesValue] = useState('');
  return (
    <div className={`${prefix}body-content`}>
      <h3 className={`${prefix}body-subheading`}>Section</h3>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input A"
          id="side-panel-story-text-input-a"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input B"
          id="side-panel-story-text-input-b"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}text-inputs`}>
        <TextInput
          labelText="Input C"
          id="side-panel-story-text-input-c"
          className={`${prefix}text-input`}
        />
        <TextInput
          labelText="Input D"
          id="side-panel-story-text-input-d"
          className={`${prefix}text-input`}
        />
      </div>
      <div className={`${prefix}multi-select-container`}>
        <MultiSelect
          id="multiselectA"
          titleText="Multiselect A"
          label="Select an item"
          items={[{ value: 'all', label: 'Multiselect A' }]}
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
          className={`${prefix}text-area`}
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

// eslint-disable-next-line react/prop-types
const ChildrenContentWithSteps = ({ currentStep, setCurrentStep }) => (
  <>
    {currentStep === 0 && (
      <div className={`${prefix}body-content`}>
        <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
          Main view
        </h3>
        {renderDataTable()}
        <Button kind="tertiary" onClick={() => setCurrentStep((p) => p + 1)}>
          View all
        </Button>
      </div>
    )}
    {currentStep === 1 && (
      <div className={`${prefix}body-content`}>
        <h3 className={`${prefix}content-subtitle ${prefix}body-subheading`}>
          Detail view
        </h3>
        {renderDataTable()}
      </div>
    )}
  </>
);

// ---------------------------------------------------------------------------
// UIShell header used by the fullscreen decorator
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Default export
// ---------------------------------------------------------------------------

export default {
  title: 'Components/SidePanel',
  component: SidePanel,
  tags: ['ibm-products-migrated'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    actions: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      mapping: actionSets,
    },
    actionToolbarButtons: {
      control: { type: 'select' },
      options: [0, 1, 2, 3],
      mapping: toolbarActions,
    },
    aiLabel: {
      control: { type: 'boolean' },
    },
    decorator: {
      control: { type: 'boolean' },
    },
    placement: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    slug: {
      control: { type: 'boolean' },
    },
    resizable: {
      control: { type: 'boolean' },
    },
    // internal state — not user-controllable in stories
    open: { control: false },
    currentStep: { control: false },
    launcherButtonRef: { control: false },
    onNavigationBack: { control: false },
    onRequestClose: { control: false },
    onUnmount: { control: false },
    slideIn: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
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

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const SlideOverTemplate = (
  { actions, aiLabel, slug, decorator, actionToolbarButtons, ...args },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const buttonRef = useRef(undefined);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen((o) => !o)}>
        {open ? 'Close panel' : 'Open panel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions] ?? actionSets[0]}
        aiLabel={aiLabel ? sampleAILabel : undefined}
        slug={slug ? sampleAILabel : undefined}
        decorator={decorator ? sampleAILabel : undefined}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={
          toolbarActions[actionToolbarButtons] ?? undefined
        }>
        <ChildrenContent />
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StepTemplate = (
  { actions, aiLabel, slug, decorator, actionToolbarButtons, ...args },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [currentStep, setCurrentStep] = useState(0);
  const buttonRef = useRef(undefined);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setOpen((o) => !o)}>
        {open ? 'Close panel' : 'Open panel'}
      </Button>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        currentStep={currentStep}
        onNavigationBack={() => setCurrentStep((p) => p - 1)}
        actions={actionSets[actions] ?? actionSets[0]}
        aiLabel={aiLabel ? sampleAILabel : undefined}
        slug={slug ? sampleAILabel : undefined}
        decorator={decorator ? sampleAILabel : undefined}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={
          toolbarActions[actionToolbarButtons] ?? undefined
        }>
        <ChildrenContentWithSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </SidePanel>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const SlideInTemplate = (
  { actions, aiLabel, slug, decorator, actionToolbarButtons, ...args },
  context
) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const buttonRef = useRef(undefined);

  return (
    <>
      <div className={`${prefix}story-content`} id="ibm-products-page-content">
        <Button ref={buttonRef} onClick={() => setOpen((o) => !o)}>
          {open ? 'Close panel' : 'Open panel'}
        </Button>
      </div>
      <SidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        actions={actionSets[actions] ?? actionSets[0]}
        aiLabel={aiLabel ? sampleAILabel : undefined}
        slug={slug ? sampleAILabel : undefined}
        decorator={decorator ? sampleAILabel : undefined}
        launcherButtonRef={buttonRef}
        actionToolbarButtons={
          toolbarActions[actionToolbarButtons] ?? undefined
        }>
        <ChildrenContent />
      </SidePanel>
    </>
  );
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const SlideOver = SlideOverTemplate.bind({});
SlideOver.args = { ...defaultStoryProps, includeOverlay: true, actions: 0 };
SlideOver.storyName = 'Slide over';

export const SlideIn = SlideInTemplate.bind({});
SlideIn.args = {
  ...defaultStoryProps,
  placement: 'right',
  slideIn: true,
  selectorPageContent: '#ibm-products-page-content',
  actions: 0,
  labelText: 'Incident management',
};
SlideIn.storyName = 'Slide in';
SlideIn.argTypes = { slideIn: { table: { disable: false } } };

export const WithActionToolbar = SlideOverTemplate.bind({});
WithActionToolbar.args = { ...defaultStoryProps, actionToolbarButtons: 3 };
WithActionToolbar.storyName = 'With action toolbar';

export const PanelWithSecondStep = StepTemplate.bind({});
PanelWithSecondStep.args = {
  ...defaultStoryProps,
  actions: 0,
  includeOverlay: true,
  currentStep: 1,
};
PanelWithSecondStep.storyName = 'Multi-step panel';

export const WithAILabel = SlideOverTemplate.bind({});
WithAILabel.args = {
  ...defaultStoryProps,
  includeOverlay: true,
  actions: 0,
  decorator: true,
};
WithAILabel.storyName = 'With AI Label';

export const SpecifyElementToHaveInitialFocus = SlideOverTemplate.bind({});
SpecifyElementToHaveInitialFocus.args = {
  ...defaultStoryProps,
  actions: 0,
  selectorPrimaryFocus: '#side-panel-story-text-input-a',
};
SpecifyElementToHaveInitialFocus.storyName =
  'Specify element to have initial focus';

export const WithStaticTitle = SlideOverTemplate.bind({});
WithStaticTitle.args = {
  ...defaultStoryProps,
  actions: 0,
  animateTitle: false,
  includeOverlay: true,
};
WithStaticTitle.storyName = 'With static title';

export const WithoutTitle = SlideOverTemplate.bind({});
WithoutTitle.args = {
  ...defaultStoryProps,
  actions: 0,
  title: null,
  subtitle: null,
  includeOverlay: true,
  'aria-label': 'SidePanel without title',
};
WithoutTitle.storyName = 'Without title';
