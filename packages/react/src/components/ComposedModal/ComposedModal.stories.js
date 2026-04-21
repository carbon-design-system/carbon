/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { ModalStackProvider } from '../Modal/ModalStackContext';
import { MultiSelect } from '../MultiSelect';
import Dropdown from '../Dropdown';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import {
  View,
  FolderOpen,
  Folders,
  Information,
  OverflowMenuVertical,
} from '@carbon/icons-react';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { Popover, PopoverContent } from '../Popover';
import TextArea from '../TextArea';
import mdx from './ComposedModal.mdx';

export default {
  title: 'Components/ComposedModal',
  component: ComposedModal,
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'containerClassName',
        'launcherButtonRef',
        'selectorPrimaryFocus',
        'selectorsFloatingMenus',
      ],
    },
  },
};

const sharedArgTypes = {
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
};

export const BasicTextOnly = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Basic Modal" />
        <ModalBody>
          <p>This is a basic modal with only text content.</p>
          <p>Press ESC to test if the modal closes.</p>
        </ModalBody>
        <ModalFooter primaryButtonText="OK" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithAILabelInBody = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="AI Features" title="AI-Enhanced Content Analysis" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            This modal demonstrates the AILabel component within the modal body.
            The AI label provides additional context and confidence scores for
            AI-generated content.
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <AILabel className="ai-label-container">
              <AILabelContent>
                <div>
                  <p className="secondary">AI Explained</p>
                  <h2 className="ai-label-heading">92%</h2>
                  <p className="secondary bold">Confidence score</p>
                  <p className="secondary">
                    This analysis was generated using our foundation model with
                    high confidence. The model has been trained on extensive
                    datasets to provide accurate insights.
                  </p>
                  <hr />
                  <p className="secondary">Model type</p>
                  <p className="bold">Foundation model</p>
                </div>
                <AILabelActions>
                  <IconButton kind="ghost" label="View">
                    <View />
                  </IconButton>
                  <IconButton kind="ghost" label="Open Folder">
                    <FolderOpen />
                  </IconButton>
                  <IconButton kind="ghost" label="Folders">
                    <Folders />
                  </IconButton>
                  <Button>View details</Button>
                </AILabelActions>
              </AILabelContent>
            </AILabel>
          </div>
          <TextArea
            labelText="Analysis results"
            placeholder="AI-generated analysis will appear here..."
            rows={4}
          />
        </ModalBody>
        <ModalFooter primaryButtonText="Analyze" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithDatePicker = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Event Management" title="Schedule an Event" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            Select the date range for your event. The date picker allows you to
            choose start and end dates for scheduling.
          </p>
          <TextInput
            id="event-name"
            labelText="Event name"
            placeholder="Enter event name"
            style={{ marginBottom: '1.5rem' }}
          />
          <DatePicker datePickerType="range" style={{ marginBottom: '1.5rem' }}>
            <DatePickerInput
              id="date-picker-input-id-start"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              size="md"
            />
            <DatePickerInput
              id="date-picker-input-id-end"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              size="md"
            />
          </DatePicker>
          <TextArea
            labelText="Event description"
            placeholder="Describe your event..."
            rows={3}
          />
        </ModalBody>
        <ModalFooter
          primaryButtonText="Schedule"
          secondaryButtonText="Cancel"
        />
      </ComposedModal>
    </>
  );
};

export const WithMultiSelect = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader
          label="Project Configuration"
          title="Configure Project Settings"
        />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            Select multiple technologies and frameworks for your project. You
            can choose as many options as needed.
          </p>
          <TextInput
            id="project-name"
            labelText="Project name"
            placeholder="Enter project name"
            style={{ marginBottom: '1.5rem' }}
          />
          <div style={{ marginBottom: '1.5rem' }}>
            <MultiSelect
              id="technologies-multiselect"
              label="Select technologies"
              titleText="Technologies"
              autoAlign
              items={[
                { id: 'tech-1', text: 'React' },
                { id: 'tech-2', text: 'Vue' },
                { id: 'tech-3', text: 'Angular' },
                { id: 'tech-4', text: 'Svelte' },
              ]}
              itemToString={(item) => (item ? item.text : '')}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <MultiSelect
              id="frameworks-multiselect"
              label="Select frameworks"
              titleText="Backend Frameworks"
              autoAlign
              items={[
                { id: 'framework-1', text: 'Node.js' },
                { id: 'framework-2', text: 'Django' },
                { id: 'framework-3', text: 'Spring Boot' },
                { id: 'framework-4', text: 'Ruby on Rails' },
              ]}
              itemToString={(item) => (item ? item.text : '')}
            />
          </div>
        </ModalBody>
        <ModalFooter primaryButtonText="Save" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithOverflowMenu = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Resource Management" title="Manage Resources" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            Use the overflow menu to access additional actions for each
            resource. This demonstrates how overflow menus work within modal
            dialogs.
          </p>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1rem',
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
              <div>
                <strong>Database Server</strong>
                <p style={{ fontSize: '0.875rem', color: '#525252' }}>
                  PostgreSQL 14.2
                </p>
              </div>
              <OverflowMenu aria-label="Database actions" flipped>
                <OverflowMenuItem itemText="Start" />
                <OverflowMenuItem itemText="Stop" />
                <OverflowMenuItem itemText="Restart" />
                <OverflowMenuItem hasDivider isDelete itemText="Delete" />
              </OverflowMenu>
            </div>
          </div>
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1rem',
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
              <div>
                <strong>Application Server</strong>
                <p style={{ fontSize: '0.875rem', color: '#525252' }}>
                  Node.js 18.x
                </p>
              </div>
              <OverflowMenu aria-label="Application actions" flipped>
                <OverflowMenuItem itemText="Deploy" />
                <OverflowMenuItem itemText="Scale" />
                <OverflowMenuItem itemText="View Logs" />
                <OverflowMenuItem hasDivider isDelete itemText="Remove" />
              </OverflowMenu>
            </div>
          </div>
        </ModalBody>
        <ModalFooter primaryButtonText="Apply" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithToggletip = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Settings" title="System Configuration" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            Click the information icons to see toggletips with additional
            details about each setting. Toggletips remain open until you click
            outside or press ESC.
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="cache-size" style={{ fontWeight: 600 }}>
                Cache Size (MB)
              </label>
              <Toggletip align="top">
                <ToggletipButton label="Additional information">
                  <Information />
                </ToggletipButton>
                <ToggletipContent>
                  <p>
                    The amount of memory allocated for caching. Higher values
                    improve performance but use more RAM.
                  </p>
                  <ToggletipActions>
                    <a href="#" className="cds--link">
                      Learn more
                    </a>
                  </ToggletipActions>
                </ToggletipContent>
              </Toggletip>
            </div>
            <TextInput
              id="cache-size"
              placeholder="512"
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="timeout" style={{ fontWeight: 600 }}>
                Request Timeout (seconds)
              </label>
              <Toggletip align="top">
                <ToggletipButton label="Additional information">
                  <Information />
                </ToggletipButton>
                <ToggletipContent>
                  <p>
                    Maximum time to wait for a response before timing out.
                    Recommended: 30-60 seconds.
                  </p>
                  <ToggletipActions>
                    <a href="#" className="cds--link">
                      View documentation
                    </a>
                  </ToggletipActions>
                </ToggletipContent>
              </Toggletip>
            </div>
            <TextInput
              id="timeout"
              placeholder="30"
              style={{ marginTop: '0.5rem' }}
            />
          </div>
        </ModalBody>
        <ModalFooter primaryButtonText="Save" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithPopover = () => {
  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Access Control" title="User Permissions" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            Configure user permissions and access levels. Click the button below
            to see a popover with additional options.
          </p>
          <TextInput
            id="username"
            labelText="Username"
            placeholder="Enter username"
            style={{ marginBottom: '1.5rem' }}
          />
          <div style={{ marginBottom: '1.5rem' }}>
            <Select id="role-select" defaultValue="viewer" labelText="Role">
              <SelectItem value="viewer" text="Viewer" />
              <SelectItem value="editor" text="Editor" />
              <SelectItem value="admin" text="Administrator" />
            </Select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}>
              Permission Details
            </label>
            <Popover
              open={popoverOpen}
              onRequestClose={() => setPopoverOpen(false)}
              align="bottom-left">
              <Button
                kind="tertiary"
                onClick={() => setPopoverOpen(!popoverOpen)}>
                View Permission Matrix
              </Button>
              <PopoverContent>
                <div style={{ padding: '1rem', minWidth: '300px' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Permission Levels</h4>
                  <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                    <li>
                      <strong>Viewer:</strong> Read-only access
                    </li>
                    <li>
                      <strong>Editor:</strong> Read and write access
                    </li>
                    <li>
                      <strong>Admin:</strong> Full access including user
                      management
                    </li>
                  </ul>
                  <Button
                    size="sm"
                    kind="primary"
                    onClick={() => setPopoverOpen(false)}
                    style={{ marginTop: '1rem' }}>
                    Got it
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </ModalBody>
        <ModalFooter primaryButtonText="Update" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const NestedModals = () => {
  const [outerOpen, setOuterOpen] = useState(true);
  const [innerOpen, setInnerOpen] = useState(false);
  return (
    <ModalStackProvider>
      <Button onClick={() => setOuterOpen(true)}>Launch outer modal</Button>
      <ComposedModal open={outerOpen} onClose={() => setOuterOpen(false)}>
        <ModalHeader label="Parent Modal" title="Outer Modal" />
        <ModalBody>
          <p style={{ marginBottom: '1.5rem' }}>
            This is the outer modal. Click the button below to open a nested
            modal inside this one. Test ESC key behavior - it should close the
            inner modal first, then the outer modal.
          </p>
          <TextInput
            id="outer-input"
            labelText="Outer modal input"
            placeholder="Enter some text"
            style={{ marginBottom: '1.5rem' }}
          />
          <Button onClick={() => setInnerOpen(true)}>Open nested modal</Button>

          <ComposedModal
            open={innerOpen}
            onClose={() => setInnerOpen(false)}
            size="sm">
            <ModalHeader label="Child Modal" title="Inner Modal" />
            <ModalBody>
              <p style={{ marginBottom: '1.5rem' }}>
                This is a nested modal inside the outer modal. Press ESC to
                close only this modal, leaving the outer modal open.
              </p>
              <TextInput
                id="inner-input"
                labelText="Inner modal input"
                placeholder="Enter some text"
              />
            </ModalBody>
            <ModalFooter
              primaryButtonText="Close Inner"
              secondaryButtonText="Cancel"
              onRequestSubmit={() => setInnerOpen(false)}
            />
          </ComposedModal>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Close Outer"
          secondaryButtonText="Cancel"
        />
      </ComposedModal>
    </ModalStackProvider>
  );
};

export const Default = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal {...args} open={open} onClose={() => setOpen(false)}>
        <ModalHeader
          label="Account resources"
          title="Add a custom domain"
          {...args}
        />
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          {...args}
        />
      </ComposedModal>
    </>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const FullWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)} isFullWidth>
        <ModalHeader
          label="An example of a modal with no padding"
          title="Full Width Modal"
        />
        <ModalBody>
          <StructuredListWrapper>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head noWrap>
                  Column A
                </StructuredListCell>
                <StructuredListCell head noWrap>
                  Column B
                </StructuredListCell>
                <StructuredListCell head noWrap>
                  Column C
                </StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 1</StructuredListCell>
                <StructuredListCell>Row 1</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 2</StructuredListCell>
                <StructuredListCell>Row 2</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
              <StructuredListRow>
                <StructuredListCell noWrap>Row 3</StructuredListCell>
                <StructuredListCell>Row 3</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  dui magna, finibus id tortor sed, aliquet bibendum augue.
                  Aenean posuere sem vel euismod dignissim. Nulla ut cursus
                  dolor. Pellentesque vulputate nisl a porttitor interdum.
                </StructuredListCell>
              </StructuredListRow>
            </StructuredListBody>
          </StructuredListWrapper>
        </ModalBody>
        <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const PassiveModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="You have been successfully signed out" />
        <ModalBody />
      </ComposedModal>
    </>
  );
};

export const WithStateManager = () => {
  const button = React.useRef();

  /**
   * Simple state manager for modals.
   */
  const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        {!ModalContent || typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
              <ModalContent open={open} setOpen={setOpen} />,
              document.body
            )}
        {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
      </>
    );
  };
  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button ref={button} onClick={() => setOpen(true)}>
          Launch composed modal
        </Button>
      )}>
      {({ open, setOpen }) => (
        <ComposedModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          launcherButtonRef={button}>
          <ModalHeader label="Account resources" title="Add a custom domain" />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </ModalBody>
          <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
        </ComposedModal>
      )}
    </ModalStateManager>
  );
};

export const WithScrollingContent = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Account resources" title="Add a custom domain" />
        <ModalBody hasScrollingContent>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            eu nibh odio. Nunc a consequat est, id porttitor sapien. Proin vitae
            leo vitae orci tincidunt auctor eget eget libero. Ut tincidunt
            ultricies fringilla. Aliquam erat volutpat. Aenean arcu odio,
            elementum vel vehicula vitae, porttitor ac lorem. Sed viverra elit
            ac risus tincidunt fermentum. Ut sollicitudin nibh id risus ornare
            ornare. Etiam gravida orci ut lectus dictum, quis ultricies felis
            mollis. Mauris nec commodo est, nec faucibus nibh. Nunc commodo ante
            quis pretium consectetur. Ut ac nisl vitae mi mattis vulputate a at
            elit. Nullam porttitor ex eget mi feugiat mattis. Nunc non sodales
            magna. Proin ornare tellus quis hendrerit egestas. Donec pharetra
            leo nec molestie sollicitudin.{' '}
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <div style={{ marginBottom: '1rem' }}>
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </div>
          <Dropdown
            id="drop"
            label="Dropdown"
            titleText="Dropdown"
            items={[
              { id: 'one', label: 'one', name: 'one' },
              { id: 'two', label: 'two', name: 'two' },
            ]}
            style={{ marginBottom: '1rem' }}
          />
          <MultiSelect
            id="test"
            label="Multiselect"
            titleText="Multiselect"
            items={[
              {
                id: 'downshift-1-item-0',
                text: 'Option 1',
              },
              {
                id: 'downshift-1-item-1',
                text: 'Option 2',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </ModalBody>
        <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
      </ComposedModal>
    </>
  );
};

export const WithInlineLoading = () => {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState('inactive');
  const [description, setDescription] = useState('Submitting...');

  const fakePromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const submit = async () => {
    setStatus('active');

    await fakePromise();

    setDescription('Submitted!');
    setStatus('finished');
  };

  const resetStatus = () => {
    setStatus('inactive');
    setDescription('Submitting...');
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      <ComposedModal open={open} onClose={() => setOpen(false)}>
        <ModalHeader label="Account resources" title="Add a custom domain" />
        <ModalBody>
          <p style={{ marginBottom: '1rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="e.g. github.com"
            style={{ marginBottom: '1rem' }}
          />
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          loadingStatus={status}
          loadingDescription={description}
          onRequestSubmit={submit}
          onLoadingSuccess={resetStatus}
        />
      </ComposedModal>
    </>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const _withAILabel = {
  render: () => {
    const [open, setOpen] = useState(true); // eslint-disable-line
    return (
      <div className="ai-label-modal">
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
        <ComposedModal
          open={open}
          onClose={() => setOpen(false)}
          decorator={aiLabel}>
          <ModalHeader label="Account resources" title="Add a custom domain" />
          <ModalBody>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eu nibh odio. Nunc a consequat est, id porttitor sapien. Proin
              vitae leo vitae orci tincidunt auctor eget eget libero. Ut
              tincidunt ultricies fringilla. Aliquam erat volutpat. Aenean arcu
              odio, elementum vel vehicula vitae, porttitor ac lorem. Sed
              viverra elit ac risus tincidunt fermentum. Ut sollicitudin nibh id
              risus ornare ornare. Etiam gravida orci ut lectus dictum, quis
              ultricies felis mollis. Mauris nec commodo est, nec faucibus nibh.
              Nunc commodo ante quis pretium consectetur. Ut ac nisl vitae mi
              mattis vulputate a at elit. Nullam porttitor ex eget mi feugiat
              mattis. Nunc non sodales magna. Proin ornare tellus quis hendrerit
              egestas. Donec pharetra leo nec molestie sollicitudin.
            </p>

            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p style={{ marginBlock: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
              placeholder="e.g. github.com"
              style={{ marginBottom: '1rem' }}
            />
          </ModalBody>

          <ModalFooter
            primaryButtonText="Save"
            secondaryButtons={[{ buttonText: 'Cancel' }]}
          />
        </ComposedModal>
      </div>
    );
  },
};
