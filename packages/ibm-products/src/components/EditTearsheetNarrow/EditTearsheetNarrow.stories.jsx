/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
// TODO: import action to handle events if required.
import { action } from 'storybook/actions';
import {
  Button,
  Dropdown,
  NumberInput,
  TextInput,
  FormGroup,
} from '@carbon/react';
import { pkg } from '../../settings';
import { EditTearsheetNarrow } from '.';
import { CreateTearsheetNarrow } from '../CreateTearsheetNarrow';

import styles from '../CreateTearsheetNarrow/_storybook-styles.scss?inline';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import { SlugSample, slugArgTypes } from '../../global/js/story-parts/slug';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Deprecated/Edit and update/EditTearsheetNarrow',
  component: EditTearsheetNarrow,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: () => (
        <StoryDocsPage altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/edit-and-update/usage/#tearsheet-edit" />
      ),
    },
  },
  decorators: [
    (story) => (
      <Annotation
        type="deprecation-notice"
        text={
          <div>
            This component is deprecated and will be removed in the next major
            version.
          </div>
        }
      >
        {story()}
      </Annotation>
    ),
  ],
  argTypes: {
    ...slugArgTypes(),
  },
};

const createTearsheetNarrowBlockClass = `${pkg.prefix}--create-tearsheet-narrow--story`;

const defaultStoryProps = {
  title: 'Edit partition',
  className: 'test-class-name',
  description: 'Select the number of partitions you want to create',
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you fill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: 'Save',
  secondaryButtonText: 'Cancel',
  label: 'Test label',
  selectorPrimaryFocus: '#tearsheet-narrow-story-text-input--1',
};

const Template = ({ slug, ...args }) => {
  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState('Enter topic name here');
  const [partitionCount, setPartitionCount] = useState(1);
  const [replicaCount, setReplicaCount] = useState(1);
  const [minimumInSyncReplicaCount, setMinimumInSyncReplicaCount] = useState(1);
  const [retentionTime, setRetentionTime] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [items] = useState(['Day(s)', 'Month(s)', 'Year(s']);
  const numberInputsInvalid =
    partitionCount <= 0 ||
    replicaCount <= 0 ||
    minimumInSyncReplicaCount <= 0 ||
    retentionTime <= 0 ||
    quantity <= 0;
  return (
    <>
      <style>{`.${defaultStoryProps.className} { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close EditTearsheetNarrow' : 'Open EditTearsheetNarrow'}
      </Button>
      <CreateTearsheetNarrow
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={action('onRequestSubmit action called')}
        disableSubmit={!topicName || numberInputsInvalid}
        slug={slug && SlugSample()}
        {...args}
      >
        <TextInput
          labelText="Topic name"
          id="tearsheet-narrow-story-text-input--1"
          value={topicName}
          placeholder="Enter topic name"
          onChange={(event) => setTopicName(event.target.value)}
        />
        <NumberInput
          id="partition-count"
          min={1}
          max={100}
          value={partitionCount}
          label="Partitions"
          invalidText="Max partitions is 100, min is 1"
          onChange={(event) => setPartitionCount(event.imaginaryTarget.value)}
        />
        <NumberInput
          id="replica-count"
          min={1}
          max={100}
          value={replicaCount}
          label="Replicas"
          invalidText="Max replicas is 10, min is 1"
          onChange={(event) => setReplicaCount(event.imaginaryTarget.value)}
        />
        <NumberInput
          id="minimum-in-sync-count"
          min={1}
          max={100}
          value={minimumInSyncReplicaCount}
          label="Minimum in-sync replicas"
          invalidText="Max is 5, min is 1"
          onChange={(event) =>
            setMinimumInSyncReplicaCount(event.imaginaryTarget.value)
          }
        />
        <div className={`${createTearsheetNarrowBlockClass}__flex-container`}>
          <NumberInput
            id="retention-time"
            min={1}
            max={60}
            value={retentionTime}
            label="Retention time"
            invalidText="Max is 60, min is 1"
            onChange={(event) => setRetentionTime(event.imaginaryTarget.value)}
          />
          <Dropdown
            id="create-tearsheet-narrow-dropdown-options-c"
            initialSelectedItem="Day(s)"
            items={items}
            label="Options"
            titleText="Options"
          />
        </div>
        <NumberInput
          id="quantity"
          min={1}
          max={100}
          value={quantity}
          label="Quantity"
          invalidText="Max is 10, min is 1"
          onChange={(event) => setQuantity(event.imaginaryTarget.value)}
        />
      </CreateTearsheetNarrow>
    </>
  );
};

const WithValidationTemplate = ({ slug, ...args }) => {
  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState('Enter topic name here');
  const [partitionCount, setPartitionCount] = useState(1);
  const [replicaCount, setReplicaCount] = useState(1);
  const [minimumInSyncReplicaCount, setMinimumInSyncReplicaCount] = useState(1);
  const [retentionTime, setRetentionTime] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [items] = useState(['Day(s)', 'Month(s)', 'Year(s']);
  const [invalid, setInvalid] = useState(false);
  const numberInputsInvalid =
    partitionCount <= 0 ||
    replicaCount <= 0 ||
    minimumInSyncReplicaCount <= 0 ||
    retentionTime <= 0 ||
    quantity <= 0;
  return (
    <>
      <style>{`.${defaultStoryProps.className} { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close EditTearsheetNarrow' : 'Open EditTearsheetNarrow'}
      </Button>
      <CreateTearsheetNarrow
        open={open}
        onRequestClose={() => {
          setOpen(false);
          setTopicName('');
          setInvalid(false);
        }}
        onRequestSubmit={action('onRequestSubmit action called')}
        disableSubmit={!topicName || numberInputsInvalid}
        slug={slug && SlugSample()}
        {...args}
      >
        <FormGroup
          className={`${createTearsheetNarrowBlockClass}__form ${createTearsheetNarrowBlockClass}__example-form-group`}
          legendText="Topic information"
        >
          <TextInput
            labelText="Topic name"
            id="tearsheet-narrow-story-text-input--1"
            value={topicName}
            placeholder="Enter topic name"
            onChange={(event) => setTopicName(event.target.value)}
            onBlur={() => !topicName.length && setInvalid(true)}
            invalid={invalid}
            invalidText="This is a required field"
          />
          <NumberInput
            id="partition-count"
            min={1}
            max={100}
            value={partitionCount}
            label="Partitions"
            invalidText="Max partitions is 100, min is 1"
            onChange={(event) => setPartitionCount(event.imaginaryTarget.value)}
          />
          <NumberInput
            id="replica-count"
            min={1}
            max={100}
            value={replicaCount}
            label="Replicas"
            invalidText="Max replicas is 10, min is 1"
            onChange={(event) => setReplicaCount(event.imaginaryTarget.value)}
          />
          <NumberInput
            id="minimum-in-sync-count"
            min={1}
            max={100}
            value={minimumInSyncReplicaCount}
            label="Minimum in-sync replicas"
            invalidText="Max is 5, min is 1"
            onChange={(event) =>
              setMinimumInSyncReplicaCount(event.imaginaryTarget.value)
            }
          />
        </FormGroup>
        <FormGroup
          className={`${createTearsheetNarrowBlockClass}__form ${createTearsheetNarrowBlockClass}__example-form-group`}
          legendText="Scheduling"
        >
          <div className={`${createTearsheetNarrowBlockClass}__flex-container`}>
            <NumberInput
              id="retention-time"
              min={1}
              max={60}
              value={retentionTime}
              label="Retention time"
              invalidText="Max is 60, min is 1"
              onChange={(event) =>
                setRetentionTime(event.imaginaryTarget.value)
              }
            />
            <Dropdown
              id="create-tearsheet-narrow-dropdown-options-c"
              initialSelectedItem="Day(s)"
              items={items}
              label="Options"
              titleText="Options"
            />
          </div>
          <NumberInput
            id="quantity"
            min={1}
            max={100}
            value={quantity}
            label="Quantity"
            invalidText="Max is 10, min is 1"
            onChange={(event) => setQuantity(event.imaginaryTarget.value)}
          />
        </FormGroup>
      </CreateTearsheetNarrow>
    </>
  );
};

const editTearsheetNarrowStoryName = 'Default';
export const editTearsheetNarrow = Template.bind({});
editTearsheetNarrow.storyName = editTearsheetNarrowStoryName;
editTearsheetNarrow.args = {
  ...defaultStoryProps,
};

const withValidationStoryName = 'With Form Validation';
export const withValidation = WithValidationTemplate.bind({});
withValidation.storyName = withValidationStoryName;
withValidation.args = {
  ...defaultStoryProps,
};

const withMultipleFormsStoryName = 'With Multiple Forms';
export const withMultipleForms = WithValidationTemplate.bind({});
withMultipleForms.storyName = withMultipleFormsStoryName;
withMultipleForms.args = {
  ...defaultStoryProps,
};
