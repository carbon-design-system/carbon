/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  Column,
  InlineNotification,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Toggle,
  NumberInput,
} from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { EditTearsheet } from '../EditTearsheet';
import { EditTearsheetForm } from '../EditTearsheetForm';
import { action } from 'storybook/actions';
import { SlugSample } from '../../../global/js/story-parts/slug';

const blockClass = `${pkg.prefix}--tearsheet-edit-multi-form`;

export const MultiFormEditTearsheet = ({
  cancelButtonText,
  className,
  description,
  influencerWidth,
  label,
  slug,
  submitButtonText,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [formOneTextInputValue, setFormOneTextInputValue] =
    useState('Topic name here');
  const [topicDescriptionValue, setTopicDescriptionValue] = useState(
    'Topic description here'
  );
  const [topicVersionValue, setTopicVersionValue] =
    useState('Topic value here');
  const [topicLocationValue, setTopicLocationValue] = useState('Location here');
  const [formTwoTextInputValue, setFormTwoTextInputValue] = useState(1);
  const [formThreeTextInputValue, setFormThreeTextInputValue] =
    useState('one-day');
  const [isInvalid, setIsInvalid] = useState(false);

  const clearCreateData = () => {
    setFormOneTextInputValue(formOneTextInputValue);
    setTopicDescriptionValue(topicDescriptionValue);
    setTopicVersionValue(topicVersionValue);
    setTopicLocationValue(topicLocationValue);
    setFormTwoTextInputValue(1);
    setFormThreeTextInputValue('one-day');
    setHasSubmitError(false);
    setIsInvalid(false);
    setOpen(false);
  };

  const onClose = () => {
    clearCreateData();
    action('onClose')();
  };

  const onSubmit = async () => {
    //emulate submit processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOpen(false);
    action('onSubmit')();
  };

  const handleFormChange = () => {
    action('handleFormChange')();
  };

  return (
    <div>
      <style>{`.${blockClass} { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close EditTearsheet' : 'Open EditTearsheet'}
      </Button>
      <EditTearsheet
        influencerWidth={influencerWidth}
        label={label}
        className={cx(blockClass, className)}
        submitButtonText={submitButtonText}
        cancelButtonText={cancelButtonText}
        description={description}
        title={title}
        open={open}
        onRequestSubmit={onSubmit}
        onClose={onClose}
        onFormChange={handleFormChange}
        slug={slug && SlugSample()}
      >
        <EditTearsheetForm
          title="Topic name"
          fieldsetLegendText="Topic information"
          subtitle="This is the unique name used to recognize your topic"
          description="It will also be used by your producers and consumers as part of the
          connection information, so make it something easy to recognize."
        >
          <Column xlg={8} lg={8} md={8} sm={8}>
            <TextInput
              labelText="Topic name"
              placeholder="Enter topic name"
              id="tearsheet-multi-form-story-text-input-multi-form-1"
              value={formOneTextInputValue}
              onChange={(event) => {
                if (event.target.value.length) {
                  setIsInvalid(false);
                }
                setFormOneTextInputValue(event.target.value);
              }}
              invalid={isInvalid}
              invalidText="This is a required field"
              onBlur={() => {
                if (!formOneTextInputValue.length) {
                  setIsInvalid(true);
                }
              }}
            />
            <TextInput
              labelText="Topic description (optional)"
              id="tearsheet-multi-form-story-text-input-multi-form-1-input-2"
              value={topicDescriptionValue}
              placeholder="Enter topic description"
              onChange={(event) => setTopicDescriptionValue(event.target.value)}
            />
            <TextInput
              labelText="Topic version (optional)"
              id="tearsheet-multi-form-story-text-input-multi-form-1-input-3"
              value={topicVersionValue}
              placeholder="Enter topic version"
              onChange={(event) => setTopicVersionValue(event.target.value)}
            />
            {hasSubmitError && (
              <InlineNotification
                kind="error"
                title="Error"
                subtitle="Resolve errors to continue"
                onClose={() => setHasSubmitError(!hasSubmitError)}
              />
            )}
            <Toggle
              className={`${blockClass}__error--toggle`}
              id="simulated-error-toggle"
              size="sm"
              labelText="Simulate error"
              onToggle={() => setHasSubmitError(!hasSubmitError)}
              toggled={hasSubmitError}
            />
          </Column>
        </EditTearsheetForm>
        <EditTearsheetForm
          title="Location"
          subtitle="Custom form subtitle"
          fieldsetLegendText=""
          description="Custom form description (see storybook implementation for new custom form capability)"
        >
          <Column xlg={8} lg={8} md={8} sm={8}>
            <TextInput
              value={topicLocationValue}
              onChange={(event) => setTopicLocationValue(event.target.value)}
              id="custom-form-input"
              labelText="Location"
              placeholder="Enter location"
            />
          </Column>
        </EditTearsheetForm>
        <EditTearsheetForm
          title="Partitions"
          subtitle="One or more partitions make up a topic. A partition is an ordered
          list of messages."
          description="Partitions are distributed across the brokers in order to increase
          the scalability of your topic. You can also use them to distribute
          messages across the members of a consumer group."
          fieldsetLegendText="Partition information"
        >
          <Column xlg={3} lg={3} md={8} sm={4}>
            <NumberInput
              id="carbon-number"
              min={1}
              max={100}
              value={formTwoTextInputValue}
              label="Partitions"
              helperText="1 partition is sufficient for getting started but, production systems often have more."
              invalidText="Max partitions is 100, min is 1"
              onChange={(event) =>
                setFormTwoTextInputValue(event.imaginaryTarget.value)
              }
            />
          </Column>
        </EditTearsheetForm>
        <EditTearsheetForm
          title="Message retention"
          subtitle="This is how long messages are retained before they are deleted."
          description="If your messages are not read by a consumer within this time, they
          will be missed."
          fieldsetLegendText="Message retention scheduling"
        >
          <Column xlg={8} lg={8} md={8} sm={8}>
            <RadioButtonGroup
              legendText="Message retention"
              name="radio-button-group"
              defaultSelected={formThreeTextInputValue}
              onChange={(value) => setFormThreeTextInputValue(value)}
              orientation="vertical"
            >
              <RadioButton labelText="A day" value="one-day" id="one-day" />
              <RadioButton labelText="A week" value="one-week" id="one-week" />
              <RadioButton
                labelText="A month"
                value="one-month"
                id="one-month"
              />
            </RadioButtonGroup>
          </Column>
        </EditTearsheetForm>
      </EditTearsheet>
    </div>
  );
};
