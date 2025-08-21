/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Modal from './';
import Button from '../Button';
import Select from '../Select';
import { MultiSelect } from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import { ClassPrefix } from '../ClassPrefix';
import './Modal.stories.scss';
import { FeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import LinkTo from '@storybook/addon-links/react';

export default {
  title: 'Components/Modal/Feature Flags',
  component: Modal,
  tags: ['!autodocs'],
  argTypes: {
    launcherButtonRef: {
      table: {
        disable: true,
      },
    },
  },
};

export const EnableDialogElement = () => {
  const [open, setOpen] = useState(false);
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
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <ClassPrefix prefix="dialog-refactor">
          <div className="experimental-modal">
            <Modal
              open={open}
              onRequestClose={() => setOpen(false)}
              modalHeading="Add a custom domain"
              modalLabel="Account resources"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </p>
              <TextInput
                autofocus="true"
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
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnableDialogElement.storyName = 'enable-dialog-element';

export const EnableExperimentalFocusWrapWithoutSentinels = () => {
  const [open, setOpen] = useState(false);
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
        <Button onClick={() => setOpen(true)}>Launch modal</Button>
        <ClassPrefix prefix="dialog-refactor">
          <div className="experimental-modal">
            <Modal
              open={open}
              onRequestClose={() => setOpen(false)}
              modalHeading="Add a custom domain"
              modalLabel="Account resources"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </p>
              <TextInput
                autofocus="true"
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
          </div>
        </ClassPrefix>
      </Annotation>
    </FeatureFlags>
  );
};
EnableExperimentalFocusWrapWithoutSentinels.storyName =
  'enable-experimental-focus-wrap-without-sentinels';
