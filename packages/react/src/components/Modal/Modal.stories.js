/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import MultiSelect from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import mdx from './Modal.mdx';

const buttons = {
  'None (0)': '0',
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};

const props = {
  modal: () => ({
    numberOfButtons: ('Number of Buttons', buttons, '2'),
    className: 'some-class',
    open: true,
    danger: false,
    alert: false,
    shouldSubmitOnEnter: false,
    hasScrollingContent: false,
    hasForm: false,
    modalHeading: 'Modal heading',
    modalLabel: 'Label',
    modalAriaLabel:
      'A label to be read by screen readers on the modal root node',
    selectorPrimaryFocus: '[data-modal-primary-focus]',
    size: 'md',
    onBlur: action('onBlur'),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: action('onRequestSubmit'),
    onSecondarySubmit: action('onSecondarySubmit'),
    preventCloseOnClickOutside: true,
    primaryButtonDisabled: false,
    primaryButtonText: 'Primary button',
  }),
  modalFooter: (numberOfButtons) => {
    const secondaryButtons = () => {
      switch (numberOfButtons) {
        case '2':
          return {
            secondaryButtonText: 'Secondary button',
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
      passiveModal: false || numberOfButtons === '0',
      ...secondaryButtons(),
    };
  },
};

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

export const Playground = () => {
  const { size, numberOfButtons, hasScrollingContent, ...modalProps } =
    props.modal();
  const { passiveModal, ...footerProps } = props.modalFooter(numberOfButtons);
  return (
    <Modal
      passiveModal={numberOfButtons === '0' || passiveModal}
      size={size || undefined}
      hasScrollingContent={hasScrollingContent}
      aria-label={hasScrollingContent ? 'Modal content' : undefined}
      {...modalProps}
      {...footerProps}>
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
      <br />
      {hasScrollingContent && (
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
