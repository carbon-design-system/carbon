/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  Column,
  TextInput,
  NumberInput,
  Dropdown,
  FormGroup,
  Header,
  HeaderContainer,
  HeaderName,
  usePrefix,
  unstable__Slug as Slug,
  unstable__SlugContent as SlugContent,
} from '@carbon/react';

import { pkg } from '../../settings';
import { CreateSidePanel } from './CreateSidePanel';

import styles from './_storybook-styles.scss?inline';
import DocsPage from './CreateSidePanel.docs-page';
import { sidePanelDecorator } from '../../global/decorators/sidePanelDecorator';
import { renderTrigger } from '../../global/js/utils/story-helper';

const blockClass = `${pkg.prefix}--create-side-panel`;

const prefix = 'create-side-panel-stories__';

const sampleSlug = (
  <Slug className="slug-container" size="xs">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          This is not really Lorem Ipsum but the spell checker did not like the
          previous text with it&apos;s non-words which is why this unwieldy
          sentence, should one choose to call it that, here.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
    </SlugContent>
  </Slug>
);

const defaultStoryProps = {
  title: 'Create partitions',
  subtitle: "Specify the details of the partitions you're creating",
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you fill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: 'Create',
  secondaryButtonText: 'Cancel',
};

const items = ['Day(s)', 'Month(s)', 'Year(s)'];

const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header>
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
      </Header>
    )}
  />
);

export default {
  title: 'Patterns/Prebuilt patterns/Create flows/CreateSidePanel',
  component: CreateSidePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    styles,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    slug: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI slug',
          1: 'with AI Slug',
        },
        default: 0,
      },
      options: [0, 1],
    },
  },
  decorators: [sidePanelDecorator(renderUIShellHeader, prefix)],
};

const DefaultTemplate = ({ slug, ...args }, context) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  return (
    <>
      {renderTrigger({ open, setOpen, name: 'side panel' })}
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
        slug={slug && sampleSlug}
      >
        <TextInput
          id="create-side-panel-topic-name-a"
          labelText="Topic name"
          className={`${prefix}form-item`}
          placeholder="Enter topic name"
        />
        <NumberInput
          id="1"
          className={`${prefix}form-item`}
          label="Partitions"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="2"
          className={`${prefix}form-item`}
          label="Replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <div
          style={{
            display: 'grid',
            alignItems: 'flex-end',
            gridGap: '0.75rem',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <NumberInput
            id="4"
            className={`${prefix}form-item`}
            label="Retention time"
            min={0}
            max={50}
            value={30}
            iconDescription="Choose a number"
          />
          <Dropdown
            id="create-side-panel-dropdown-options-a"
            items={items}
            initialSelectedItem="Day(s)"
            label="Options"
            titleText="Options"
            className={`${prefix}form-item`}
          />
        </div>
        <NumberInput
          id="5"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
      </CreateSidePanel>
    </>
  );
};

const TemplateWithFormValidation = ({ slug, ...args }, context) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <>
      {renderTrigger({ open, setOpen, name: 'side panel' })}
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        disableSubmit={!textInput.length}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
        slug={slug && sampleSlug}
      >
        <TextInput
          id="create-side-panel-topic-name-b"
          labelText="Topic name"
          className={`${prefix}form-item`}
          placeholder="Enter topic name"
          onChange={(e) => {
            setTextInput(e.target.value);
            setInvalid(false);
          }}
          onBlur={() => {
            textInput.length === 0 && setInvalid(true);
          }}
          invalid={invalid}
          invalidText="This is a required field"
        />
        <NumberInput
          id="1"
          className={`${prefix}form-item`}
          label="Partitions"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="2"
          className={`${prefix}form-item`}
          label="Replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <div className={`${prefix}example-container`}>
          <NumberInput
            id="4"
            className={`${prefix}form-item`}
            label="Retention time"
            min={0}
            max={50}
            value={30}
            iconDescription="Choose a number"
          />
          <Dropdown
            id="create-side-panel-dropdown-options-b"
            aria-label="Dropdown"
            initialSelectedItem="Day(s)"
            items={items}
            label="Options"
            className={`${prefix}form-item`}
          />
        </div>
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
      </CreateSidePanel>
    </>
  );
};

const TemplateWithMultipleForms = ({ slug, ...args }, context) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <>
      {renderTrigger({ open, setOpen, name: 'side panel' })}
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        disableSubmit={!textInput.length}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
        slug={slug && sampleSlug}
      >
        <FormGroup
          className={`${blockClass}__form ${prefix}example-form-group`}
          legendText="Personal information"
        >
          <TextInput
            id="create-side-panel-first-name"
            labelText="First name"
            className={`${prefix}form-item`}
            placeholder="Enter topic name"
            onChange={(e) => {
              setTextInput(e.target.value);
              setInvalid(false);
            }}
            onBlur={() => {
              textInput.length === 0 && setInvalid(true);
            }}
            invalid={invalid}
            invalidText="This is a required field"
          />
          <Dropdown
            id="create-side-panel-dropdown-bu"
            titleText="Business unit"
            aria-label="Dropdown"
            initialSelectedItem="IBM Cloud platform"
            items={['IBM Cloud platform', 'AI Ops', 'Watson']}
            label="Business unit"
            className={`${prefix}form-item`}
          />
        </FormGroup>
        <FormGroup
          className={`${blockClass}__form ${prefix}example-form-group`}
          legendText="Topic information"
        >
          <TextInput
            id="create-side-panel-topic-name-c"
            labelText="Topic name"
            className={`${prefix}form-item`}
            placeholder="Enter topic name"
          />
          <NumberInput
            id="1"
            className={`${prefix}form-item`}
            label="Partitions"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <NumberInput
            id="2"
            className={`${prefix}form-item`}
            label="Replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <NumberInput
            id="3"
            className={`${prefix}form-item`}
            label="Minimum in-sync replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <div className={`${prefix}example-container`}>
            <NumberInput
              id="4"
              className={`${prefix}form-item`}
              label="Retention time"
              min={0}
              max={50}
              value={30}
              iconDescription="Choose a number"
            />
            <Dropdown
              id="create-side-panel-dropdown-options-c"
              aria-label="Dropdown"
              initialSelectedItem="Day(s)"
              items={items}
              label="Options"
              className={`${prefix}form-item`}
            />
          </div>
          <NumberInput
            id="3"
            className={`${prefix}form-item`}
            label="Minimum in-sync replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
        </FormGroup>
      </CreateSidePanel>
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  selectorPageContent: '#ibm-products-page-content',
  ...defaultStoryProps,
};

export const WithFormValidation = TemplateWithFormValidation.bind({});
WithFormValidation.args = {
  selectorPageContent: '#ibm-products-page-content',
  ...defaultStoryProps,
};

export const WithMultipleForms = TemplateWithMultipleForms.bind({});
WithMultipleForms.args = {
  selectorPageContent: '#ibm-products-page-content',
  ...defaultStoryProps,
};
