/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from 'storybook/actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import { Popover, PopoverContent } from '../Popover';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import ComboBox from '../ComboBox';
import mdx from './Modal.mdx';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';
import TextArea from '../TextArea';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import {
  View,
  FolderOpen,
  Folders,
  OverflowMenuVertical,
  Information,
} from '@carbon/icons-react';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
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

const buttons = {
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    'aria-label': {
      control: 'text',
    },
    modalHeading: {
      control: 'text',
    },
    modalLabel: {
      control: 'text',
    },
    numberOfButtons: {
      description: 'Count of Footer Buttons',
      options: Object.keys(buttons),
      mapping: buttons,
      control: {
        type: 'inline-radio',
        labels: Object.keys(buttons),
      },
    },
    onKeyDown: {
      action: 'onKeyDown',
    },
    onRequestSubmit: {
      action: 'onRequestSubmit',
    },

    preventCloseOnClickOutside: {
      control: 'boolean',
    },
    primaryButtonText: {
      control: 'text',
    },
  },
};

const modalFooter = (numberOfButtons) => {
  const secondaryButtons = () => {
    switch (numberOfButtons) {
      case '1':
        return {
          secondaryButtons: [],
        };
      case '2':
        return {
          secondaryButtonText: 'Cancel',
        };
      case '3':
        return {
          secondaryButtons: [
            {
              buttonText: 'Keep both',
              onClick: action('onClick'),
            },
            {
              buttonText: 'Rename',
              onClick: action('onClick'),
            },
          ],
        };
      default:
        return null;
    }
  };
  return {
    ...secondaryButtons(),
  };
};

const sharedParameters = {
  controls: {
    exclude: [
      'id',
      'launcherButtonRef',
      'secondaryButtons',
      'secondaryButtonText',
      'selectorPrimaryFocus',
      'selectorsFloatingMenus',
    ],
  },
};

export const BasicTextOnly = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Basic Modal"
        primaryButtonText="OK"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p>This is a basic modal with only text content.</p>
        <p>Press ESC to test if the modal closes.</p>
      </Modal>
    </>
  );
};

BasicTextOnly.parameters = { ...sharedParameters };

export const Default = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        onRequestClose={(e) => {
          action(e);
          setOpen(false);
        }}
        modalHeading="Add a custom domain"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        aria-label="Modal content"
        open={open}
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '2rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
          placeholder="For example, GitHub.com"
          style={{ marginBottom: '24px' }}
        />
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Dropdown
            autoAlign={true}
            id="default"
            titleText="TLS (Example of Floating UI)"
            label="Option 1"
            items={[
              {
                id: 'option-0',
                text: '1.0',
              },
              {
                id: 'option-1',
                text: '1.1',
              },
              {
                id: 'option-2',
                text: '1.2',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <MultiSelect
            id="test"
            label="Choose options"
            titleText="Mapping domain"
            autoAlign
            items={[
              {
                id: 'downshift-1-item-0',
                text: 'Cloud Foundry',
              },
              {
                id: 'downshift-1-item-1',
                text: 'Kubernetes Ingress',
              },
              {
                id: 'downshift-1-item-2',
                text: 'VPC Load Balancer',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
        <CheckboxGroup legendText="Terms of Agreement">
          <Checkbox
            id="checkbox-label-1"
            labelText="I confirm domain ownership and accept IBM service terms and applicable charges."
          />
        </CheckboxGroup>
      </Modal>
    </>
  );
};

Default.argTypes = {
  onSecondarySubmit: {
    action: 'onSecondarySubmit',
  },
};

Default.parameters = { ...sharedParameters };

export const FullWidth = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        isFullWidth
        modalHeading="Full width modal"
        modalLabel="An example of a modal with no padding"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <StructuredListWrapper style={{ marginBottom: '48px' }}>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head noWrap>
                Default size
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Features
              </StructuredListCell>
              <StructuredListCell head noWrap>
                Pricing
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Lite</StructuredListCell>
              <StructuredListCell>2 vCPUs | 4GB RAM</StructuredListCell>
              <StructuredListCell>$0.12 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Graduated tier</StructuredListCell>
              <StructuredListCell>2 vCPUs | 8GB RAM</StructuredListCell>
              <StructuredListCell>$0.13 USD / hourly</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Premium</StructuredListCell>
              <StructuredListCell>4 vCPUs | 10GB RAM</StructuredListCell>
              <StructuredListCell>$0.20 USD / hourly</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </>
  );
};

FullWidth.parameters = { ...sharedParameters };

export const DangerModal = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p>
          Check for dependencies on the domain before deletion. For instance, if
          the domain is used as a primary domain for users or if it's associated
          with critical applications or services, those connections will need to
          be removed or reconfigured first.
        </p>
      </Modal>
    </>
  );
};

DangerModal.parameters = { ...sharedParameters };

export const WithScrollingContent = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        hasScrollingContent
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '1rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <p style={{ marginBottom: '2rem' }}>
          Domain mappings provide the URL route to your Code Engine application
          or function within a project. With Code Engine, these mappings are
          automatically created, by default, whenever you deploy an application
          or create a function. However, you can map your own custom domain to a
          Code Engine application or function. This option routes requests from
          your custom URL to your application or function. You can use the Code
          Engine CLI.
        </p>
        <div style={{ marginBottom: '24px' }}>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Select id="select-1" defaultValue="us-south" labelText="Region">
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <ComboBox
            allowCustomValue
            autoAlign={true}
            id="carbon-combobox"
            items={['Viewer', 'Editor', 'Manager']}
            titleText="Permissions (Example of Floating UI)"
          />
        </div>
        <MultiSelect
          id="test"
          label="Choose options"
          titleText="Mapping domain"
          autoAlign
          items={[
            {
              id: 'downshift-1-item-0',
              text: 'Cloud Foundry',
            },
            {
              id: 'downshift-1-item-1',
              text: 'Kubernetes Ingress',
            },
            {
              id: 'downshift-1-item-2',
              text: 'VPC Load Balancer',
            },
          ]}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Modal>
    </>
  );
};

WithScrollingContent.parameters = { ...sharedParameters };

export const WithStateManager = ({ numberOfButtons, ...args }) => {
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

  const button = React.useRef();

  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button ref={button} onClick={() => setOpen(true)}>
          Launch modal
        </Button>
      )}>
      {({ open, setOpen }) => (
        <Modal
          launcherButtonRef={button}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          open={open}
          onRequestClose={() => setOpen(false)}
          {...args}
          {...modalFooter(numberOfButtons)}>
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
        </Modal>
      )}
    </ModalStateManager>
  );
};

WithStateManager.parameters = { ...sharedParameters };

export const PassiveModal = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
        modalHeading="You are now signed out."
        {...args}
        {...modalFooter(numberOfButtons)}
      />
    </>
  );
};

PassiveModal.parameters = {
  controls: {
    include: [
      'aria-label',
      'closeButtonLabel',
      'hasScrollingContent',
      'isFullWidth',
      'modalAriaLabel',
      'modalHeading',
      'modalLabel',
      'open',
      'preventCloseOnClickOutside',
      'size',
    ],
  },
};

export const WithInlineLoading = (args) => {
  const [status, setStatus] = useState('inactive');
  const [description, setDescription] = useState('Deleting...');

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

    setDescription('Deleted!');
    setStatus('finished');
  };

  const resetStatus = () => {
    setStatus('inactive');
    setDescription('Deleting...');
  };

  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        loadingStatus={status}
        loadingDescription={description}
        {...args}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={submit}
        onLoadingSuccess={resetStatus}
      />
    </>
  );
};

WithInlineLoading.parameters = {
  controls: {
    exclude: [
      'loadingStatus',
      'loadingDescription',
      'numberOfButtons',
      'id',
      'launcherButtonRef',
      'secondaryButtons',
      'secondaryButtonText',
      'selectorPrimaryFocus',
      'selectorsFloatingMenus',
    ],
  },
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

export const withAILabel = {
  render: ({ numberOfButtons, ...args }) => {
    const [open, setOpen] = useState(true); // eslint-disable-line
    return (
      <div className="ai-label-modal">
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <Button onClick={() => setOpen2(true)}>
          Launch modal decorator tooltip
        </Button>
        <Modal
          open={open}
          onRequestClose={() => setOpen(false)}
          modalHeading="Add a custom domain"
          modalLabel="Account resources"
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          decorator={aiLabel}
          {...args}
          {...modalFooter(numberOfButtons)}>
          <p style={{ marginBottom: '2rem' }}>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
            placeholder="For example, GitHub.com"
            style={{ marginBottom: '24px' }}
          />
          <div style={{ marginBottom: '24px' }}>
            <Select id="select-1" defaultValue="us-south" labelText="Region">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
          </div>
          <TextArea labelText="Comments" style={{ height: '80px' }} />
        </Modal>
      </div>
    );
  },
};

export const WithAILabelInBody = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="AI-Enhanced Content Analysis"
        modalLabel="AI Features"
        primaryButtonText="Analyze"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
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
      </Modal>
    </>
  );
};

WithAILabelInBody.parameters = { ...sharedParameters };

export const WithDatePicker = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Schedule an Event"
        modalLabel="Event Management"
        primaryButtonText="Schedule"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
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
      </Modal>
    </>
  );
};

WithDatePicker.parameters = { ...sharedParameters };

export const WithMultiSelect = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Configure Project Settings"
        modalLabel="Project Configuration"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '1.5rem' }}>
          Select multiple technologies and frameworks for your project. You can
          choose as many options as needed.
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
              {
                id: 'tech-1',
                text: 'React',
              },
              {
                id: 'tech-2',
                text: 'Vue',
              },
              {
                id: 'tech-3',
                text: 'Angular',
              },
              {
                id: 'tech-4',
                text: 'Svelte',
              },
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
              {
                id: 'framework-1',
                text: 'Node.js',
              },
              {
                id: 'framework-2',
                text: 'Django',
              },
              {
                id: 'framework-3',
                text: 'Spring Boot',
              },
              {
                id: 'framework-4',
                text: 'Ruby on Rails',
              },
            ]}
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
      </Modal>
    </>
  );
};

WithMultiSelect.parameters = { ...sharedParameters };

export const WithOverflowMenu = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Manage Resources"
        modalLabel="Resource Management"
        primaryButtonText="Apply"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '1.5rem' }}>
          Use the overflow menu to access additional actions for each resource.
          This demonstrates how overflow menus work within modal dialogs.
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
      </Modal>
    </>
  );
};

WithOverflowMenu.parameters = { ...sharedParameters };

export const WithToggletip = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="System Configuration"
        modalLabel="Settings"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
        <p style={{ marginBottom: '1.5rem' }}>
          Click the information icons to see toggletips with additional details
          about each setting. Toggletips remain open until you click outside or
          press ESC.
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="max-connections" style={{ fontWeight: 600 }}>
              Max Connections
            </label>
            <Toggletip align="top">
              <ToggletipButton label="Additional information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  Maximum number of concurrent connections allowed. Setting this
                  too high may impact server stability.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Default:</strong> 100
                  <br />
                  <strong>Recommended range:</strong> 50-200
                </p>
              </ToggletipContent>
            </Toggletip>
          </div>
          <TextInput
            id="max-connections"
            placeholder="100"
            style={{ marginTop: '0.5rem' }}
          />
        </div>
        <CheckboxGroup legendText="Advanced Options">
          <Checkbox id="enable-compression" labelText="Enable compression" />
          <Checkbox id="enable-logging" labelText="Enable detailed logging" />
        </CheckboxGroup>
      </Modal>
    </>
  );
};

WithToggletip.parameters = { ...sharedParameters };

export const WithPopover = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="User Permissions"
        modalLabel="Access Control"
        primaryButtonText="Update"
        secondaryButtonText="Cancel"
        {...args}
        {...modalFooter(numberOfButtons)}>
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
        <CheckboxGroup legendText="Additional Permissions">
          <Checkbox id="can-export" labelText="Can export data" />
          <Checkbox id="can-share" labelText="Can share with others" />
        </CheckboxGroup>
      </Modal>
    </>
  );
};

WithPopover.parameters = { ...sharedParameters };
withAILabel.parameters = { ...sharedParameters };
