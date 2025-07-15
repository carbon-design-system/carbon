/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';

export default {
  title: 'Components/ComposedModal/Feature Flags',
  component: ComposedModal,
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
  tags: ['!autodocs'],
};

export const EnableDialogElement = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <FeatureFlags enableDialogElement>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              enable-dialog-element
            </LinkTo>{' '}
            enabled
          </span>
        }>
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
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            {...args}
          />
        </ComposedModal>
      </Annotation>
    </FeatureFlags>
  );
};
EnableDialogElement.storyName = 'enable-dialog-element';
EnableDialogElement.argTypes = {
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
  containerClassName: {
    table: {
      disable: true,
    },
  },
  launcherButtonRef: {
    table: {
      disable: true,
    },
  },
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
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

export const EnableExperimentalFocusWrapWithoutSentinels = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              enable-experimental-focus-wrap-without-sentinels
            </LinkTo>{' '}
            enabled
          </span>
        }>
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
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            {...args}
          />
        </ComposedModal>
      </Annotation>
    </FeatureFlags>
  );
};
EnableExperimentalFocusWrapWithoutSentinels.storyName =
  'enable-experimental-focus-wrap-without-sentinels';
EnableExperimentalFocusWrapWithoutSentinels.argTypes = {
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
  containerClassName: {
    table: {
      disable: true,
    },
  },
  launcherButtonRef: {
    table: {
      disable: true,
    },
  },
  onClose: {
    action: 'onClose',
  },
  onKeyDown: {
    action: 'onKeyDown',
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
