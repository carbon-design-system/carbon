/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import MultiSelect from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import mdx from './Modal.featureflag.mdx';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';

export default {
  title: 'Experimental/Feature Flags/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
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
        <Dropdown
          id="drop"
          label="Dropdown"
          titleText="Dropdown"
          items={[
            { id: 'one', label: 'one', name: 'one' },
            { id: 'two', label: 'two', name: 'two' },
          ]}
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
      </Modal>
    </>
  );
};

export const FullWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        isFullWidth
        modalHeading="Full Width Modal"
        modalLabel="An example of a modal with no padding"
        primaryButtonText="Add"
        secondaryButtonText="Cancel">
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
                dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean
                posuere sem vel euismod dignissim. Nulla ut cursus dolor.
                Pellentesque vulputate nisl a porttitor interdum.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Row 2</StructuredListCell>
              <StructuredListCell>Row 2</StructuredListCell>
              <StructuredListCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean
                posuere sem vel euismod dignissim. Nulla ut cursus dolor.
                Pellentesque vulputate nisl a porttitor interdum.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Row 3</StructuredListCell>
              <StructuredListCell>Row 3</StructuredListCell>
              <StructuredListCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean
                posuere sem vel euismod dignissim. Nulla ut cursus dolor.
                Pellentesque vulputate nisl a porttitor interdum.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </Modal>
    </>
  );
};

export const DangerModal = () => {
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
      />
    </>
  );
};

const buttons = {
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
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

export const WithScrollingContent = () => {
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
        secondaryButtonText="Cancel">
        <p style={{ marginBottom: '1rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
          nibh odio. Nunc a consequat est, id porttitor sapien. Proin vitae leo
          vitae orci tincidunt auctor eget eget libero. Ut tincidunt ultricies
          fringilla. Aliquam erat volutpat. Aenean arcu odio, elementum vel
          vehicula vitae, porttitor ac lorem. Sed viverra elit ac risus
          tincidunt fermentum. Ut sollicitudin nibh id risus ornare ornare.
          Etiam gravida orci ut lectus dictum, quis ultricies felis mollis.
          Mauris nec commodo est, nec faucibus nibh. Nunc commodo ante quis
          pretium consectetur. Ut ac nisl vitae mi mattis vulputate a at elit.
          Nullam porttitor ex eget mi feugiat mattis. Nunc non sodales magna.
          Proin ornare tellus quis hendrerit egestas. Donec pharetra leo nec
          molestie sollicitudin.{' '}
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
      </Modal>
    </>
  );
};

export const Playground = ({ numberOfButtons, ...args }) => {
  const [open, setOpen] = useState(true);
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
        {args.hasScrollingContent && (
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

Playground.args = {
  numberOfButtons: 'Two (2)',
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
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
  onSecondarySubmit: {
    action: 'onSecondarySubmit',
    table: {
      disable: true,
    },
  },
  primaryButtonText: {
    control: 'text',
  },
  secondaryButtons: {
    table: {
      disable: true,
    },
  },
  secondaryButtonText: {
    control: 'text',
    table: {
      disable: true,
    },
  },
  selectorPrimaryFocus: {
    table: {
      disable: true,
    },
  },
  selectorsFloatingMenus: {
    table: {
      disable: true,
    },
  },
};

export const WithStateManager = () => {
  /**
   * Simple state manager for modals.
   */
  const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }) => {
    const [open, setOpen] = useState(false);
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

  const button = useRef();

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
          onRequestClose={() => setOpen(false)}>
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

export const PassiveModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
      <Modal
        open={open}
        onRequestClose={() => setOpen(false)}
        passiveModal
        modalHeading="You have been successfully signed out"
      />
    </>
  );
};

export const WithInlineLoading = () => {
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
        onRequestClose={() => setOpen(false)}
        danger
        modalHeading="Are you sure you want to delete this custom domain?"
        modalLabel="Account resources"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={submit}
        loadingStatus={status}
        loadingDescription={description}
        onLoadingSuccess={resetStatus}
      />
    </>
  );
};
