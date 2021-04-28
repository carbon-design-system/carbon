/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  object,
  optionsKnob as options,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import mdx from './ComposedModal.mdx';

const sizes = {
  'Extra small (xs)': 'xs',
  'Small (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg)': 'lg',
};

const buttons = {
  'None (0)': '0',
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};

const props = {
  composedModal: () => ({
    numberOfButtons: options('Number of Buttons', buttons, '2', {
      display: 'inline-radio',
    }),
    open: boolean('Open (open in <ComposedModal>)', true),
    onKeyDown: action('onKeyDown'),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      '[data-modal-primary-focus]'
    ),
    size: select('Size (size)', sizes, 'md'),
    preventCloseOnClickOutside: boolean(
      'Prevent closing on click outside of modal (preventCloseOnClickOutside)',
      true
    ),
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: text('Optional Label (label in <ModalHeader>)', 'Label'),
    title: text(
      'Optional title (title in <ModalHeader>)',
      titleOnly
        ? `
      Passive modal title as the message. Should be direct and 3 lines or less.
    `.trim()
        : 'Modal heading'
    ),
    iconDescription: text(
      'Close icon description (iconDescription in <ModalHeader>)',
      'Close'
    ),
    buttonOnClick: action('buttonOnClick'),
  }),
  modalBody: () => ({
    hasScrollingContent: boolean(
      'Modal contains scrollable content (hasScrollingContent)',
      false
    ),
    'aria-label': text('ARIA label for content', 'Example modal content'),
  }),
  modalFooter: (numberOfButtons) => {
    const secondaryButtons = () => {
      switch (numberOfButtons) {
        case '2':
          return {
            secondaryButtonText: text(
              'Secondary button text (secondaryButtonText in <ModalFooter>)',
              'Secondary button'
            ),
          };
        case '3':
          return {
            secondaryButtons: object(
              'Secondary button config array (secondaryButtons)',
              [
                {
                  buttonText: 'Keep both',
                  onClick: action('onClick'),
                },
                {
                  buttonText: 'Rename',
                  onClick: action('onClick'),
                },
              ]
            ),
          };
        default:
          return null;
      }
    };
    return {
      danger: boolean('Primary button danger (danger)', false),
      primaryButtonText: text(
        'Primary button text (primaryButtonText in <ModalFooter>)',
        'Primary button'
      ),
      primaryButtonDisabled: boolean(
        'Primary button disabled (primaryButtonDisabled in <ModalFooter>)',
        false
      ),
      ...secondaryButtons(numberOfButtons),
      onRequestClose: action('onRequestClose'),
      onRequestSubmit: action('onRequestSubmit'),
    };
  },
};

const scrollingContent = (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <h3>Lorem ipsum</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
  </>
);

export default {
  title: 'Components/ComposedModal',
  decorators: [withKnobs],
  parameters: {
    component: ComposedModal,
    subcomponents: {
      ModalHeader,
      ModalBody,
      ModalFooter,
    },
    docs: {
      page: mdx,
    },
  },
};

export const Playground = () => {
  const { size, numberOfButtons, ...rest } = props.composedModal();
  const { hasScrollingContent } = props.modalBody();
  return (
    <ComposedModal {...rest} size={size || undefined}>
      <ModalHeader {...props.modalHeader()} />
      <ModalBody
        {...props.modalBody()}
        aria-label={hasScrollingContent ? 'Modal content' : undefined}>
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
        {hasScrollingContent && scrollingContent}
      </ModalBody>
      {numberOfButtons > 0 && (
        <ModalFooter {...props.modalFooter(numberOfButtons)}></ModalFooter>
      )}
    </ComposedModal>
  );
};

export const Default = () => {
  return (
    <ComposedModal open>
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
      <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
    </ComposedModal>
  );
};

Default.story = {
  name: 'Composed Modal',
};

export const PassiveModal = () => {
  return (
    <ComposedModal open>
      <ModalHeader title="You have been successfully signed out" />
      <ModalBody />
    </ComposedModal>
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
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      )}>
      {({ open, setOpen }) => (
        <ComposedModal open={open} onClose={() => setOpen(false)}>
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
