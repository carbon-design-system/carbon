/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Dropdown, NumberInput, TextInput } from '@carbon/react';
import { CreateSidePanel } from '../components/CreateSidePanel';
import '../styles/_create-side-panel.scss';

const storyPrefix = `create-side-panel-stories__`;
const items = ['Day(s)', 'Month(s)', 'Year(s)'];

export const WithValidation = ({
  primaryButtonText = 'Create',
  secondaryButtonText = 'Cancel',
  subtitle = '',
  title = 'Create partitions',
  selectorPageContent = '#ibm-products-page-content',
  open,
  setOpen,
  ...rest
}) => {
  const [topicName, setTopicName] = useState('');
  const [invalid, setInvalid] = useState(false);

  const clearAndClose = () => {
    setTopicName('');
    setInvalid(false);
    setOpen(false);
  };

  return (
    <CreateSidePanel
      open={open}
      title={title}
      subtitle={subtitle}
      formTitle="Core configuration"
      formDescription="We recommend you fill out and evaluate these details at a minimum before deploying your topic."
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      selectorPageContent={selectorPageContent}
      selectorPrimaryFocus="#create-side-panel-topic-name-b"
      onRequestClose={clearAndClose}
      onRequestSubmit={clearAndClose}
      disableSubmit={!topicName.length}
      {...rest}
    >
      <TextInput
        id="create-side-panel-topic-name-b"
        labelText="Topic name"
        className={`${storyPrefix}form-item`}
        placeholder="Enter topic name"
        value={topicName}
        onChange={(e) => {
          setTopicName(e.target.value);
          setInvalid(false);
        }}
        onBlur={() => {
          topicName.length === 0 && setInvalid(true);
        }}
        invalid={invalid}
        invalidText="This is a required field"
      />
      <NumberInput
        id="create-side-panel-partitions-b"
        className={`${storyPrefix}form-item`}
        label="Partitions"
        min={0}
        max={50}
        value={1}
        iconDescription="Choose a number"
      />
      <NumberInput
        id="create-side-panel-replicas-b"
        className={`${storyPrefix}form-item`}
        label="Replicas"
        min={0}
        max={50}
        value={1}
        iconDescription="Choose a number"
      />
      <NumberInput
        id="create-side-panel-min-in-sync-b"
        className={`${storyPrefix}form-item`}
        label="Minimum in-sync replicas"
        min={0}
        max={50}
        value={1}
        iconDescription="Choose a number"
      />
      <div className={`${storyPrefix}example-container`}>
        <NumberInput
          id="create-side-panel-retention-time-b"
          className={`${storyPrefix}form-item`}
          label="Retention time"
          min={0}
          max={50}
          value={30}
          iconDescription="Choose a number"
        />
        <Dropdown
          id="create-side-panel-dropdown-options-b"
          aria-label="Dropdown"
          items={items}
          initialSelectedItem="Day(s)"
          label="Options"
          titleText="Options"
          className={`${storyPrefix}form-item`}
        />
      </div>
      <NumberInput
        id="create-side-panel-quantity-b"
        className={`${storyPrefix}form-item`}
        label="Quantity"
        min={0}
        max={50}
        value={1}
        iconDescription="Choose a number"
      />
    </CreateSidePanel>
  );
};
