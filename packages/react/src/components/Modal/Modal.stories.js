/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import MultiSelect from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import mdx from './Modal.mdx';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Modal
      open
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
  );
};

export const FullWidth = () => {
  return (
    <Modal
      open
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 2</StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 3</StructuredListCell>
            <StructuredListCell>Row 3</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </Modal>
  );
};

export const DangerModal = () => {
  return (
    <Modal
      open
      danger
      modalHeading="Are you sure you want to delete this custom domain?"
      modalLabel="Account resources"
      primaryButtonText="Delete"
      secondaryButtonText="Cancel"
    />
  );
};

export const Playground = (args) => {
  return (
    <Modal
      open
      modalHeading="Add a custom domain"
      primaryButtonText="Add"
      secondaryButtonText="Cancel"
      aria-label="Modal content"
      {...args}>
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
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <h3>Lorem ipsum</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
        </>
      )}
    </Modal>
  );
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
  onKeyDown: {
    action: 'clicked',
  },
  onRequestClose: {
    action: 'clicked',
  },
  onRequestSubmit: {
    action: 'clicked',
  },
  onSecondarySubmit: {
    action: 'clicked',
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
  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
      )}>
      {({ open, setOpen }) => (
        <Modal
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
  return (
    <Modal
      open
      passiveModal
      modalHeading="You have been successfully signed out"></Modal>
  );
};
