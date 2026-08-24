/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import docs from './Tearsheet.mdx';

import React, { useRef, useState } from 'react';
import { AILabel, AILabelContent } from '../AILabel';
import Button from '../Button';
import Form from '../Form';
import FormGroup from '../FormGroup';
import { NumberInput } from '../NumberInput';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import { Section } from '../Heading';
import { Tab } from '../Tab';
import { Tabs, TabList, TabPanel, TabPanels } from '../Tabs';
import TextInput from '../TextInput';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';

import { Tearsheet } from '.';
import {
  Bee,
  BottomPanelOpenFilled,
  Information,
  RightPanelClose,
} from '@carbon/icons-react';
import { StackProvider } from './StackContext';
import { TruncatedText } from '../TruncatedText';
import { TearsheetWithSteps } from './TearsheetWithSteps';
const storyClass = 'tearsheet-stories';

const sharedArgTypes = {
  decorator: {
    control: { type: 'boolean' },
    description: 'When true, an AI Label decorator is shown in the header.',
  },
  isFlush: {
    control: { type: 'boolean' },
    description:
      'When true, the main content area takes full width without padding.',
  },
  influencerWidth: {
    control: { type: 'text' },
  },
  keepMounted: {
    control: { type: 'boolean' },
    description:
      'If true, the tearsheet will remain mounted in the DOM when closed. By default (false), the tearsheet unmounts after the exit animation completes.',
  },
  summaryContentWidth: {
    control: { type: 'text' },
  },
  verticalGap: {
    control: { type: 'text' },
  },
  variant: {
    control: { type: 'radio' },
    options: ['wide', 'narrow'],
  },
  hideCloseButton: {
    control: { type: 'boolean' },
    description:
      'Enable a close icon ("x") in the header area of the tearsheet. By default, a tearsheet displays a close icon.',
  },
  disableHeaderCollapse: {
    control: { type: 'boolean' },
    description:
      'Default header collapse/expand while scrolling the main content can be disabled by setting this to true.',
  },
  closeIconDescription: {
    control: { type: 'text' },
    description: 'The accessibility title for the close icon (if shown).',
  },
};

export default {
  title: 'Components/Tearsheet',
  component: Tearsheet,
  parameters: {
    docs: {
      page: docs,
    },
  },
  decorators: [
    (Story) => {
      return <div className={`${storyClass}__viewport`}>{Story()}</div>;
    },
  ],
  subcomponents: {
    Header: Tearsheet.Header,
    HeaderContent: Tearsheet.HeaderContent,
    HeaderActions: Tearsheet.HeaderActions,
    HeaderActionItem: Tearsheet.HeaderActionItem,
    NavigationBar: Tearsheet.NavigationBar,
    ScrollButton: Tearsheet.ScrollButton,
    Influencer: Tearsheet.Influencer,
    Body: Tearsheet.Body,
    MainContent: Tearsheet.MainContent,
    SummaryContent: Tearsheet.SummaryContent,
    Footer: Tearsheet.Footer,
    StackProvider: StackProvider,
  },
  argTypes: {
    // ── hide props Tearsheet inherits from ComposedModal but controls internally ──
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    // size is set internally (sm for narrow, undefined for wide) — not a consumer prop
    size: { table: { disable: true } },
    // always forced true internally
    isFullWidth: { table: { disable: true } },
    // not meaningful on a tearsheet
    danger: { table: { disable: true } },
    // deprecated, use decorator instead
    slug: { table: { disable: true } },
    // low-level event, not part of tearsheet API
    onKeyDown: { table: { disable: true } },
    // internal — managed by StackProvider
    selectorsFloatingMenus: { table: { disable: true } },
    // portal props not useful in controls panel
    portalTarget: { table: { disable: true } },
    disablePortal: { table: { disable: true } },
    ...sharedArgTypes,
  },
};

const sampleDecorator = (decorator) => {
  switch (decorator) {
    case 1:
      return (
        <AILabel className="decorator-container" size="xs">
          <AILabelContent>
            <div>
              <p className="secondary">AI Explained</p>
              <h3>84%</h3>
              <p className="secondary bold">Confidence score</p>
              <p className="secondary">
                This is not really Lorem Ipsum but the spell checker did not
                like the previous text with it&apos;s non-words which is why
                this unwieldy sentence, should one choose to call it that, here.
              </p>
              <hr />
              <p className="secondary">Model type</p>
              <p className="bold">Foundation model</p>
            </div>
          </AILabelContent>
        </AILabel>
      );
    case 2:
      return (
        <Toggletip>
          <ToggletipButton label="Additional information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>Custom content here</p>
          </ToggletipContent>
        </Toggletip>
      );
    default:
      return;
  }
};
const description = (
  <TruncatedText
    id={`header-description__truncatedText`}
    expandLabel={'Read more'}
    collapseLabel={'Read less'}
    expandAriaLabel={'Read more about tearsheet description'}
    value="Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page"
    type="expand"
  />
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * | STORIES | * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export const Default = {
  render: (
    {
      decorator,
      isFlush,
      influencerWidth,
      keepMounted,
      summaryContentWidth,
      verticalGap,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
    },
    context
  ) => {
    const [open, setOpen] = useState(context?.viewMode !== 'docs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const launcherButtonRef = useRef(null);
    const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
    const summaryPanelTriggerRef = useRef(null);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const buttonSize = isSm ? 'xl' : '2xl';
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>

        <Tearsheet
          open={open}
          variant={variant ?? 'wide'}
          decorator={decorator ? sampleDecorator(1) : undefined}
          onClose={() => setOpen(false)}
          preventCloseOnClickOutside={true}
          launcherButtonRef={launcherButtonRef}
          selectorPrimaryFocus={'#input1'}
          influencerWidth={influencerWidth}
          keepMounted={keepMounted}
          summaryContentWidth={summaryContentWidth}
          verticalGap={verticalGap}>
          <Tearsheet.Header
            hideCloseButton={hideCloseButton}
            disableHeaderCollapse={disableHeaderCollapse}
            closeIconDescription={closeIconDescription}
            onHeaderCollapse={(collapsed) => {
              setIsCollapsed(collapsed);
              console.log('onHeaderCollapse:', collapsed);
            }}>
            <Tearsheet.HeaderContent
              open
              label="Customer data"
              title="Title of the tearsheet "
              titleStart={<Bee size={32} />}
              description={description}
              headerActions={
                <Tearsheet.HeaderActions
                  menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 1
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 2
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 3
                    </Button>
                  </Tearsheet.HeaderActionItem>
                </Tearsheet.HeaderActions>
              }></Tearsheet.HeaderContent>
          </Tearsheet.Header>
          <Tearsheet.Body>
            <Tearsheet.MainContent isFlush={isFlush}>
              <div className="summaryPanelTrigger">
                <Button
                  ref={summaryPanelTriggerRef}
                  kind="ghost"
                  label="Open right panel"
                  onClick={() => setSummaryPanelOpen(true)}
                  renderIcon={() => <RightPanelClose />}
                  aria-expanded={summaryPanelOpen}
                  aria-controls="summary-panel"
                  size="md"></Button>
              </div>

              <Section className="main-content">
                <h3>Main content heading</h3>

                <Form>
                  <FormGroup
                    legendId="tearsheet-form-group-1"
                    legendText="Personal Information">
                    <TextInput
                      id="input1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Additional information"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-2"
                    legendText="Contact Details">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-3"
                    legendText="Address Information">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-4"
                    legendText="Additional Details">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                </Form>
              </Section>
            </Tearsheet.MainContent>

            <Tearsheet.SummaryContent
              summaryPanelOpen={summaryPanelOpen}
              onSummaryPanelClose={() => setSummaryPanelOpen(false)}
              summaryPanelTriggerRef={summaryPanelTriggerRef}>
              <h3 className="summaryPanelHeading">Summary details</h3>
              <div className="rightDetailsBody">
                <div>
                  <strong>item 1</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 2</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 3</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 4</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 5</strong>
                  <p>item description</p>
                </div>
              </div>
            </Tearsheet.SummaryContent>
          </Tearsheet.Body>
          <Tearsheet.Footer
            actions={[
              {
                kind: 'ghost',
                label: 'Cancel',
                onClick: () => setOpen(false),
              },
              {
                kind: 'secondary',
                label: 'Back',
                onClick: () => {
                  console.log('Back clicked');
                },
              },
              {
                kind: 'primary',
                label: 'Submit',
                onClick: () => {
                  console.log('Submit clicked');
                },
              },
            ]}
            buttonSize={buttonSize}
          />
        </Tearsheet>
      </>
    );
  },
};
export const WithInfluencer = {
  render: (
    {
      decorator,
      isFlush,
      influencerWidth,
      keepMounted,
      summaryContentWidth,
      verticalGap,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
    },
    context
  ) => {
    const [open, setOpen] = useState(context?.viewMode !== 'docs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const launcherButtonRef = useRef(null);
    const influencerPanelTriggerRef = useRef(null);
    const currentStep = 1;
    const [influencerPanelOpen, setInfluencerPanelOpen] = useState(false);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const buttonSize = isSm ? 'xl' : '2xl';

    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>

        <Tearsheet
          open={open}
          variant={variant ?? 'wide'}
          decorator={decorator ? sampleDecorator(1) : undefined}
          onClose={() => setOpen(false)}
          preventCloseOnClickOutside={true}
          launcherButtonRef={launcherButtonRef}
          selectorPrimaryFocus={'#input1'}
          influencerWidth={influencerWidth}
          keepMounted={keepMounted}
          summaryContentWidth={summaryContentWidth}
          verticalGap={verticalGap}>
          <Tearsheet.Header
            hideCloseButton={hideCloseButton}
            disableHeaderCollapse={disableHeaderCollapse}
            closeIconDescription={closeIconDescription}
            onHeaderCollapse={(collapsed) => setIsCollapsed(collapsed)}>
            <Tearsheet.HeaderContent
              open
              label="Customer data"
              title="Title of the tearsheet "
              titleIcon={Bee}
              titleIconPosition={'leading'}
              description={description}
              headerActions={
                <Tearsheet.HeaderActions
                  menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 1
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 2
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 3
                    </Button>
                  </Tearsheet.HeaderActionItem>
                </Tearsheet.HeaderActions>
              }></Tearsheet.HeaderContent>
          </Tearsheet.Header>
          <Tearsheet.Influencer
            influencerPanelOpen={influencerPanelOpen}
            onInfluencerPanelClose={() => setInfluencerPanelOpen(false)}
            influencerPanelTriggerRef={influencerPanelTriggerRef}>
            <ProgressIndicator vertical>
              <ProgressStep
                complete={currentStep > 1}
                current={currentStep === 1}
                label="Step 1"
                secondaryLabel="Optional label"
              />
              <ProgressStep
                complete={currentStep > 2}
                current={currentStep === 2}
                label="Step 2"
              />
              <ProgressStep
                current={currentStep === 3}
                label="Step 3"
                complete={currentStep > 3}
              />
            </ProgressIndicator>
          </Tearsheet.Influencer>
          <Tearsheet.Body>
            <Tearsheet.MainContent isFlush={isFlush}>
              <div className="influencerPanelTrigger">
                <Button
                  ref={influencerPanelTriggerRef}
                  kind="ghost"
                  label="Open influencer panel"
                  onClick={() => setInfluencerPanelOpen(true)}
                  renderIcon={() => <RightPanelClose />}
                  aria-expanded={influencerPanelOpen}
                  aria-controls="influencer-panel"
                  size="md"></Button>
              </div>

              <Section className="main-content">
                <h3>Main content heading</h3>

                <Form>
                  <FormGroup
                    legendId="tearsheet-form-group-1"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="input1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-2"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-3"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-4"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                </Form>
              </Section>
            </Tearsheet.MainContent>
          </Tearsheet.Body>
          <Tearsheet.Footer
            actions={[
              {
                kind: 'ghost',
                label: 'Cancel',
                onClick: () => setOpen(false),
              },
              {
                kind: 'secondary',
                label: 'Back',
                onClick: () => {
                  console.log('Back clicked');
                },
              },
              {
                kind: 'primary',
                label: 'Submit',
                onClick: () => {
                  console.log('Submit clicked');
                },
              },
            ]}
            buttonSize={buttonSize}></Tearsheet.Footer>
        </Tearsheet>
      </>
    );
  },
};
export const WithTabs = {
  render: (
    {
      decorator,
      isFlush,
      influencerWidth,
      keepMounted,
      summaryContentWidth,
      verticalGap,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
    },
    context
  ) => {
    const [open, setOpen] = useState(context?.viewMode !== 'docs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const launcherButtonRef = useRef(null);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const buttonSize = isSm ? 'xl' : '2xl';
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>
        <Tabs>
          <Tearsheet
            open={open}
            variant={variant ?? 'wide'}
            decorator={decorator ? sampleDecorator(1) : undefined}
            onClose={() => setOpen(false)}
            launcherButtonRef={launcherButtonRef}
            influencerWidth={influencerWidth}
            keepMounted={keepMounted}
            summaryContentWidth={summaryContentWidth}
            verticalGap={verticalGap}>
            <Tearsheet.Header
              hideCloseButton={hideCloseButton}
              disableHeaderCollapse={disableHeaderCollapse}
              closeIconDescription={closeIconDescription}
              onHeaderCollapse={(collapsed) => setIsCollapsed(collapsed)}>
              <Tearsheet.HeaderContent
                open
                label="Customer data"
                title="Title of the tearsheet "
                description={description}
                headerActions={
                  <Tearsheet.HeaderActions
                    menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 1
                      </Button>
                    </Tearsheet.HeaderActionItem>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 2
                      </Button>
                    </Tearsheet.HeaderActionItem>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 3
                      </Button>
                    </Tearsheet.HeaderActionItem>
                  </Tearsheet.HeaderActions>
                }></Tearsheet.HeaderContent>

              <Tearsheet.NavigationBar scroller={<Tearsheet.ScrollButton />}>
                <TabList aria-label="Tab list">
                  <Tab>Tab 1</Tab>
                  <Tab>Tab 2</Tab>
                  <Tab>Tab 3</Tab>
                  <Tab>Tab 4</Tab>
                  <Tab>Tab 5</Tab>
                  <Tab>Tab 6</Tab>
                  <Tab>Tab 7</Tab>
                </TabList>
              </Tearsheet.NavigationBar>
            </Tearsheet.Header>
            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush={isFlush}>
                <div className="summaryPanelTrigger">
                  <Button
                    kind="ghost"
                    label="Open right panel"
                    onClick={() => setSummaryPanelOpen(true)}
                    renderIcon={() => <RightPanelClose />}
                    size="md"></Button>
                </div>
                <TabPanels>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 1
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 2
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 3
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 4
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 5
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 6
                  </TabPanel>
                  <TabPanel className="page-header-story--tall-tab-panel">
                    Tab Panel 7
                  </TabPanel>
                </TabPanels>
              </Tearsheet.MainContent>
            </Tearsheet.Body>
            <Tearsheet.Footer
              actions={[
                {
                  kind: 'ghost',
                  label: 'Cancel',
                  onClick: () => setOpen(false),
                },
                {
                  kind: 'secondary',
                  label: 'Back',
                  onClick: () => {
                    console.log('Back clicked');
                  },
                },
                {
                  kind: 'primary',
                  label: 'Submit',
                  onClick: () => {
                    console.log('Submit clicked');
                  },
                },
              ]}
              buttonSize={buttonSize}
            />
          </Tearsheet>
        </Tabs>
      </>
    );
  },
};
export const narrowTearsheet = {
  render: (
    {
      decorator,
      isFlush,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
      keepMounted,
    },
    context
  ) => {
    const [open, setOpen] = useState(context?.viewMode !== 'docs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
    const [influencerPanelOpen, setInfluencerPanelOpen] = useState(false);
    const launcherButtonRef = useRef(null);
    const summaryPanelTriggerRef = useRef(null);
    const influencerPanelTriggerRef = useRef(null);
    const currentStep = 1;
    const buttonSize = 'xl'; // narrow variant always uses xl
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>
        <Tabs>
          <Tearsheet
            open={open}
            variant={'narrow'}
            verticalGap="5.5rem"
            decorator={decorator ? sampleDecorator(1) : undefined}
            onClose={() => setOpen(false)}
            className="narrowTearsheet"
            launcherButtonRef={launcherButtonRef}
            keepMounted={keepMounted}>
            <Tearsheet.Header
              hideCloseButton={hideCloseButton}
              disableHeaderCollapse={disableHeaderCollapse}
              closeIconDescription={closeIconDescription}
              onHeaderCollapse={(collapsed) => setIsCollapsed(collapsed)}>
              <Tearsheet.HeaderContent
                open
                label="Customer data"
                title="Title of the tearsheet "
                description={description}
                headerActions={
                  <Tearsheet.HeaderActions
                    menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 1
                      </Button>
                    </Tearsheet.HeaderActionItem>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 2
                      </Button>
                    </Tearsheet.HeaderActionItem>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                      <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                        Action 3
                      </Button>
                    </Tearsheet.HeaderActionItem>
                  </Tearsheet.HeaderActions>
                }></Tearsheet.HeaderContent>
            </Tearsheet.Header>
            <Tearsheet.Influencer
              influencerPanelOpen={influencerPanelOpen}
              onInfluencerPanelClose={() => setInfluencerPanelOpen(false)}
              influencerPanelTriggerRef={influencerPanelTriggerRef}>
              <ProgressIndicator vertical>
                <ProgressStep
                  complete={currentStep > 1}
                  current={currentStep === 1}
                  label="Step 1"
                  secondaryLabel="Optional label"
                />
                <ProgressStep
                  complete={currentStep > 2}
                  current={currentStep === 2}
                  label="Step 2"
                />
                <ProgressStep
                  current={currentStep === 3}
                  label="Step 3"
                  complete={currentStep > 3}
                />
              </ProgressIndicator>
            </Tearsheet.Influencer>
            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush={isFlush}>
                <div className="influencerPanelTrigger">
                  <Button
                    ref={influencerPanelTriggerRef}
                    kind="ghost"
                    label="Open influencer"
                    onClick={() => setInfluencerPanelOpen(true)}
                    renderIcon={() => <RightPanelClose />}
                    aria-expanded={influencerPanelOpen}
                    aria-controls="influencer-panel"
                    size="md"></Button>
                </div>
                <div className="summaryPanelTrigger">
                  <Button
                    ref={summaryPanelTriggerRef}
                    kind="ghost"
                    label="Open summary panel"
                    onClick={() => setSummaryPanelOpen(true)}
                    renderIcon={() => <RightPanelClose />}
                    aria-expanded={summaryPanelOpen}
                    aria-controls="summary-panel"
                    size="md"></Button>
                </div>

                <Section className="main-content">
                  <h3>Main content heading</h3>

                  <Form>
                    <FormGroup
                      legendId="tearsheet-form-group-5"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                    <FormGroup
                      legendId="tearsheet-form-group-6"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                    <FormGroup
                      legendId="tearsheet-form-group-7"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                    <FormGroup
                      legendId="tearsheet-form-group-8"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                  </Form>
                </Section>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent
                summaryPanelOpen={summaryPanelOpen}
                onSummaryPanelClose={() => setSummaryPanelOpen(false)}
                summaryPanelTriggerRef={summaryPanelTriggerRef}>
                <h3 className="summaryPanelHeading">Summary details</h3>
                <div className="rightDetailsBody">
                  <div>
                    <strong>item 1</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 2</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 3</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 4</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 5</strong>
                    <p>item description</p>
                  </div>
                </div>
              </Tearsheet.SummaryContent>
            </Tearsheet.Body>
            <Tearsheet.Footer
              actions={[
                {
                  kind: 'ghost',
                  label: 'Cancel',
                  onClick: () => setOpen(false),
                },
                {
                  kind: 'secondary',
                  label: 'Back',
                  onClick: () => {
                    console.log('Back clicked');
                  },
                },
                {
                  kind: 'primary',
                  label: 'Submit',
                  onClick: () => {
                    console.log('Submit clicked');
                  },
                },
              ]}
              buttonSize="xl"
            />
          </Tearsheet>
        </Tabs>
      </>
    );
  },
};
export const StackingTearsheet = {
  render: (
    {
      variant = ['wide', 'wide', 'wide'],
      decorator,
      isFlush,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
    },
    context
  ) => {
    const [open1, setOpen1] = useState(context?.viewMode !== 'docs');
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [isCollapsed1, setIsCollapsed1] = useState(false);
    const [isCollapsed2, setIsCollapsed2] = useState(false);
    const launcherButtonRef1 = useRef(null);
    const launcherButtonRef2 = useRef(null);
    const launcherButtonRef3 = useRef(null);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery);

    return (
      <>
        <div className="stackButtons">
          <Button
            onClick={() => setOpen1(!open1)}
            aria-haspopup="dialog"
            ref={launcherButtonRef1}>
            Open Tearsheet 1
          </Button>
        </div>
        <div className="smallScreenButton">
          <Button
            kind="ghost"
            align="bottom"
            onClick={() => setOpen1(!open1)}
            label="Open Tearsheet 1"
            aria-haspopup="dialog">
            <BottomPanelOpenFilled />
          </Button>
        </div>

        <StackProvider stackStepSize="lg">
          <Tearsheet
            open={open1}
            onClose={() => setOpen1(false)}
            variant={variant[0]}
            verticalGap={variant[0] === 'narrow' ? '5.5rem' : ''}
            launcherButtonRef={launcherButtonRef1}
            decorator={decorator ? sampleDecorator(1) : undefined}>
            <Tearsheet.Header
              hideCloseButton={hideCloseButton}
              disableHeaderCollapse={disableHeaderCollapse}
              closeIconDescription={closeIconDescription}
              onHeaderCollapse={(collapsed) => setIsCollapsed1(collapsed)}>
              <Tearsheet.HeaderContent
                headerActions={
                  <Tearsheet.HeaderActions
                    menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Open Tearsheet 2">
                      <Button
                        ref={launcherButtonRef2}
                        kind="tertiary"
                        size={isCollapsed1 ? 'xs' : 'sm'}
                        onClick={() => {
                          setOpen2(true);
                        }}
                        aria-haspopup="dialog">
                        Open Tearsheet 2
                      </Button>
                    </Tearsheet.HeaderActionItem>
                  </Tearsheet.HeaderActions>
                }
                label="Customer data"
                title="Tearsheet 1 "
                description="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."></Tearsheet.HeaderContent>
            </Tearsheet.Header>
            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush={isFlush}>
                <Section className="main-content">
                  <h3>Main content heading</h3>

                  <Form>
                    <FormGroup
                      legendId="tearsheet-form-group-9"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                  </Form>
                </Section>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent>
                <h3 className="summaryPanelHeading">Summary Details</h3>
                <div className="rightDetailsBody">
                  <div>
                    <strong>item 1</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 2</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 3</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 4</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 5</strong>
                    <p>item description</p>
                  </div>
                </div>
              </Tearsheet.SummaryContent>
            </Tearsheet.Body>
            <Tearsheet.Footer
              actions={[
                {
                  kind: 'ghost',
                  label: 'Cancel',
                  onClick: () => setOpen1(false),
                },
                {
                  kind: 'secondary',
                  label: 'Back',
                  onClick: () => {
                    console.log('Back clicked');
                  },
                },
                {
                  kind: 'primary',
                  label: 'Submit',
                  onClick: () => {
                    console.log('Submit clicked');
                  },
                },
              ]}
              buttonSize={isSm || variant[0] === 'narrow' ? 'xl' : '2xl'}
            />
          </Tearsheet>
          <Tearsheet
            open={open2}
            onClose={() => setOpen2(false)}
            variant={variant[1]}
            verticalGap={variant[1] === 'narrow' ? '5.5rem' : ''}
            launcherButtonRef={launcherButtonRef2}
            decorator={decorator ? sampleDecorator(1) : undefined}>
            <Tearsheet.Header
              hideCloseButton={hideCloseButton}
              disableHeaderCollapse={disableHeaderCollapse}
              closeIconDescription={closeIconDescription}
              onHeaderCollapse={(collapsed) => setIsCollapsed2(collapsed)}>
              <Tearsheet.HeaderContent
                label="Customer data"
                title="Tearsheet 2"
                description="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
                headerActions={
                  <Tearsheet.HeaderActions
                    menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                    <Tearsheet.HeaderActionItem overflowItemLabel="Open Tearsheet 3">
                      <Button
                        ref={launcherButtonRef3}
                        kind="tertiary"
                        size={isCollapsed2 ? 'xs' : 'sm'}
                        onClick={() => {
                          setOpen3(true);
                        }}
                        aria-haspopup="dialog">
                        Open Tearsheet 3
                      </Button>
                    </Tearsheet.HeaderActionItem>
                  </Tearsheet.HeaderActions>
                }></Tearsheet.HeaderContent>
            </Tearsheet.Header>
            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush={isFlush}>
                <Section className="main-content">
                  <h3>Main content heading</h3>

                  <Form>
                    <FormGroup
                      legendId="tearsheet-form-group-10"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                  </Form>
                </Section>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent>
                <h3 className="rightPanelHeading">Summary Details</h3>
                <div className="rightDetailsBody">
                  <div>
                    <strong>item 1</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 2</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 3</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 4</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 5</strong>
                    <p>item description</p>
                  </div>
                </div>
              </Tearsheet.SummaryContent>
            </Tearsheet.Body>
            <Tearsheet.Footer
              actions={[
                {
                  kind: 'ghost',
                  label: 'Cancel',
                  onClick: () => setOpen2(false),
                },
                {
                  kind: 'secondary',
                  label: 'Back',
                  onClick: () => {
                    console.log('Back clicked');
                  },
                },
                {
                  kind: 'primary',
                  label: 'Submit',
                  onClick: () => {
                    console.log('Submit clicked');
                  },
                },
              ]}
              buttonSize={isSm || variant[1] === 'narrow' ? 'xl' : '2xl'}
            />
          </Tearsheet>
          <Tearsheet
            open={open3}
            variant={variant[2]}
            verticalGap={variant[2] === 'narrow' ? '5.5rem' : ''}
            onClose={() => setOpen3(false)}
            launcherButtonRef={launcherButtonRef3}
            decorator={decorator ? sampleDecorator(1) : undefined}>
            <Tearsheet.Header
              hideCloseButton={hideCloseButton}
              disableHeaderCollapse={disableHeaderCollapse}
              closeIconDescription={closeIconDescription}>
              <Tearsheet.HeaderContent
                label="Customer data"
                title="Tearsheet 3"
                description="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."></Tearsheet.HeaderContent>
            </Tearsheet.Header>
            <Tearsheet.Body>
              <Tearsheet.MainContent isFlush={isFlush}>
                <Section className="main-content">
                  <h3>Main content heading</h3>

                  <Form>
                    <FormGroup
                      legendId="tearsheet-form-group-11"
                      legendText="FormGroup Legend">
                      <TextInput
                        id="tss-ft1"
                        labelText="Enter an important value here"
                      />
                      <TextInput
                        id="tss-ft2"
                        labelText="Here is an entry field:"
                      />
                      <NumberInput
                        className="some-class"
                        id="number-input-1"
                        label="Number Input"
                        min={0}
                        max={100}
                        value={50}
                        step={10}
                        iconDescription="Add/decrement number"
                      />
                    </FormGroup>
                  </Form>
                </Section>
              </Tearsheet.MainContent>

              <Tearsheet.SummaryContent>
                <h3 className="rightPanelHeading">Summary Details</h3>
                <div className="rightDetailsBody">
                  <div>
                    <strong>item 1</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 2</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 3</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 4</strong>
                    <p>item description</p>
                  </div>
                  <div>
                    <strong>item 5</strong>
                    <p>item description</p>
                  </div>
                </div>
              </Tearsheet.SummaryContent>
            </Tearsheet.Body>
            <Tearsheet.Footer
              actions={[
                {
                  kind: 'ghost',
                  label: 'Cancel',
                  onClick: () => setOpen3(false),
                },
                {
                  kind: 'secondary',
                  label: 'Back',
                  onClick: () => {
                    console.log('Back clicked');
                  },
                },
                {
                  kind: 'primary',
                  label: 'Submit',
                  onClick: () => {
                    console.log('Submit clicked');
                  },
                },
              ]}
              buttonSize={isSm || variant[2] === 'narrow' ? 'xl' : '2xl'}
            />
          </Tearsheet>
        </StackProvider>
      </>
    );
  },
};
export const stackingWithDifferentSizes = {
  render: (args) =>
    StackingTearsheet.render({ ...args, variant: ['wide', 'narrow', 'wide'] }),
};
export const stackingNarrowTearsheets = {
  render: (args) =>
    StackingTearsheet.render({
      ...args,
      variant: ['narrow', 'narrow', 'narrow'],
    }),
};

export const WithCustomFooterActions = {
  render: (
    {
      decorator,
      isFlush,
      influencerWidth,
      keepMounted,
      summaryContentWidth,
      verticalGap,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
    },
    context
  ) => {
    const [open, setOpen] = useState(context?.viewMode !== 'docs');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const launcherButtonRef = useRef(null);
    const [summaryPanelOpen, setSummaryPanelOpen] = useState(false);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const buttonSize = isSm ? 'xl' : '2xl';
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>

        <Tearsheet
          open={open}
          variant={variant ?? 'wide'}
          decorator={decorator ? sampleDecorator(1) : undefined}
          onClose={() => setOpen(false)}
          preventCloseOnClickOutside={true}
          launcherButtonRef={launcherButtonRef}
          selectorPrimaryFocus={'#input1'}
          influencerWidth={influencerWidth}
          keepMounted={keepMounted}
          summaryContentWidth={summaryContentWidth}
          verticalGap={verticalGap}>
          <Tearsheet.Header
            hideCloseButton={hideCloseButton}
            disableHeaderCollapse={disableHeaderCollapse}
            closeIconDescription={closeIconDescription}
            onHeaderCollapse={(collapsed) => setIsCollapsed(collapsed)}>
            <Tearsheet.HeaderContent
              open
              label="Customer data"
              title="Title of the tearsheet "
              titleStart={<Bee size={32} />}
              description={description}
              headerActions={
                <Tearsheet.HeaderActions
                  menuButtonProps={{ label: 'Actions', kind: 'tertiary' }}>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 1">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 1
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 2">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 2
                    </Button>
                  </Tearsheet.HeaderActionItem>
                  <Tearsheet.HeaderActionItem overflowItemLabel="Action 3">
                    <Button kind="tertiary" size={isCollapsed ? 'xs' : 'sm'}>
                      Action 3
                    </Button>
                  </Tearsheet.HeaderActionItem>
                </Tearsheet.HeaderActions>
              }></Tearsheet.HeaderContent>
          </Tearsheet.Header>
          <Tearsheet.Body>
            <Tearsheet.MainContent isFlush={isFlush}>
              <div className="summaryPanelTrigger">
                <Button
                  kind="ghost"
                  label="Open right panel"
                  onClick={() => setSummaryPanelOpen(true)}
                  renderIcon={() => <RightPanelClose />}
                  size="md"></Button>
              </div>

              <Section className="main-content">
                <h3>Main content heading</h3>

                <Form>
                  <FormGroup
                    legendId="tearsheet-form-group-12"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="input1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                  <FormGroup
                    legendId="tearsheet-form-group-13"
                    legendText="FormGroup Legend">
                    <TextInput
                      id="tss-ft1"
                      labelText="Enter an important value here"
                    />
                    <TextInput
                      id="tss-ft2"
                      labelText="Here is an entry field:"
                    />
                    <NumberInput
                      className="some-class"
                      id="number-input-1"
                      label="Number Input"
                      min={0}
                      max={100}
                      value={50}
                      step={10}
                      iconDescription="Add/decrement number"
                    />
                  </FormGroup>
                </Form>
              </Section>
            </Tearsheet.MainContent>

            <Tearsheet.SummaryContent
              summaryPanelOpen={summaryPanelOpen}
              onSummaryPanelClose={() => setSummaryPanelOpen(false)}>
              <h3 className="summaryPanelHeading">Summary details</h3>
              <div className="rightDetailsBody">
                <div>
                  <strong>item 1</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 2</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 3</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 4</strong>
                  <p>item description</p>
                </div>
                <div>
                  <strong>item 5</strong>
                  <p>item description</p>
                </div>
              </div>
            </Tearsheet.SummaryContent>
          </Tearsheet.Body>
          <Tearsheet.Footer>
            <div className="default__action-buttons">
              <Button
                kind="ghost"
                onClick={() => setOpen(false)}
                size={buttonSize}>
                Cancel
              </Button>
              <Button
                kind="secondary"
                onClick={() => {
                  console.log('Back clicked');
                }}
                size={buttonSize}>
                Back
              </Button>
              <Button
                kind="primary"
                onClick={() => {
                  console.log('Submit clicked');
                }}
                size={buttonSize}>
                Submit
              </Button>
            </div>
          </Tearsheet.Footer>
        </Tearsheet>
      </>
    );
  },
};

export const withSteps = {
  render: (
    {
      decorator,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
      verticalGap,
      keepMounted,
    },
    context
  ) => {
    const [open, setOpen] = React.useState(context?.viewMode !== 'docs');
    const launcherButtonRef = React.useRef(null);
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>
        <TearsheetWithSteps
          open={open}
          setOpen={setOpen}
          launcherButtonRef={launcherButtonRef}
          decorator={decorator ? sampleDecorator(1) : undefined}
          variant={variant ?? 'wide'}
          hideCloseButton={hideCloseButton}
          disableHeaderCollapse={disableHeaderCollapse}
          closeIconDescription={closeIconDescription}
          verticalGap={verticalGap}
          keepMounted={keepMounted}
        />
      </>
    );
  },
};

export const withStepsAndHorizontalProgressIndicator = {
  render: (
    {
      decorator,
      variant,
      hideCloseButton,
      disableHeaderCollapse,
      closeIconDescription,
      verticalGap,
      keepMounted,
    },
    context
  ) => {
    const [open, setOpen] = React.useState(context?.viewMode !== 'docs');
    const launcherButtonRef = React.useRef(null);
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          ref={launcherButtonRef}
          aria-haspopup="dialog">
          Open Tearsheet
        </Button>
        <TearsheetWithSteps
          open={open}
          setOpen={setOpen}
          progressIndicator="horizontal"
          launcherButtonRef={launcherButtonRef}
          decorator={decorator ? sampleDecorator(1) : undefined}
          variant={variant ?? 'wide'}
          hideCloseButton={hideCloseButton}
          disableHeaderCollapse={disableHeaderCollapse}
          closeIconDescription={closeIconDescription}
          verticalGap={verticalGap}
          keepMounted={keepMounted}
        />
      </>
    );
  },
};
