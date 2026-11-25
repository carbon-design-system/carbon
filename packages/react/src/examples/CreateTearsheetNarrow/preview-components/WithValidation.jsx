/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { TextInput, NumberInput, Dropdown, FormGroup } from '@carbon/react';
import cx from 'classnames';
import { CreateTearsheetNarrow } from '../components/CreateTearsheetNarrow';
import '../styles/_create-tearsheet-narrow.scss';

const blockClass = `tearsheet-create-narrow`;

export const WithValidation = ({
  cancelButtonText = 'Cancel',
  className = 'tearsheet-create-narrow',
  description = '',
  label = '',
  submitButtonText = 'Create',
  title = 'Create',
  open,
  setOpen,
  ...rest
}) => {
  const [topicName, setTopicName] = useState('');
  const [partitionCount, setPartitionCount] = useState(1);
  const [replicaCount, setReplicaCount] = useState(1);
  const [minimumInSyncReplicaCount, setMinimumInSyncReplicaCount] = useState(1);
  const [retentionTime, setRetentionTime] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [items] = useState(['Day(s)', 'Month(s)', 'Year(s)']);
  const [invalid, setInvalid] = useState(false);

  const numberInputsInvalid =
    partitionCount <= 0 ||
    replicaCount <= 0 ||
    minimumInSyncReplicaCount <= 0 ||
    retentionTime <= 0 ||
    quantity <= 0;

  const clearCreateData = () => {
    setTopicName('');
    setPartitionCount(1);
    setReplicaCount(1);
    setMinimumInSyncReplicaCount(1);
    setRetentionTime(1);
    setQuantity(1);
    setInvalid(false);
    setOpen(false);
  };

  return (
    <CreateTearsheetNarrow
      label={label}
      className={cx(blockClass, className)}
      submitButtonText={submitButtonText}
      cancelButtonText={cancelButtonText}
      description={description}
      title={title}
      formTitle="Core configuration"
      formDescription="We recommend you fill out and evaluate these details at a minimum before deploying your topic."
      open={open}
      onClose={clearCreateData}
      setOpen={setOpen}
      onRequestSubmit={async () => {
        // Perform submit action here
        console.log('Submit clicked');
      }}
      hasCloseIcon={true}
      selectorPrimaryFocus="#tearsheet-narrow-story-text-input-1"
      disableSubmit={!topicName || numberInputsInvalid}
      {...rest}
    >
      <FormGroup
        className={`${blockClass}__form ${blockClass}__example-form-group`}
        legendText="Topic information"
      >
        <TextInput
          labelText="Topic name"
          id="tearsheet-narrow-story-text-input-1"
          value={topicName}
          placeholder="Enter topic name"
          onChange={(event) => {
            setTopicName(event.target.value);
            if (event.target.value.length) {
              setInvalid(false);
            }
          }}
          onBlur={() => !topicName.length && setInvalid(true)}
          invalid={invalid}
          invalidText="This is a required field"
        />
        <NumberInput
          iconDescription="Choose a number"
          id="partition-count"
          min={1}
          max={100}
          value={partitionCount}
          label="Partitions"
          invalidText="Max partitions is 100, min is 1"
          onChange={(event) => setPartitionCount(event.imaginaryTarget.value)}
        />
        <NumberInput
          iconDescription="Choose a number"
          id="replica-count"
          min={1}
          max={100}
          value={replicaCount}
          label="Replicas"
          invalidText="Max replicas is 10, min is 1"
          onChange={(event) => setReplicaCount(event.imaginaryTarget.value)}
        />
        <NumberInput
          iconDescription="Choose a number"
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
        className={`${blockClass}__form ${blockClass}__example-form-group`}
        legendText="Scheduling"
      >
        <div className={`${blockClass}__flex-container`}>
          <NumberInput
            iconDescription="Choose a number"
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
          iconDescription="Choose a number"
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
  );
};
