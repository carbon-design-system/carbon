/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Button,
  Column,
  Grid,
  InlineNotification,
  RadioButtonGroup,
  RadioButton,
  RadioTile,
  TextInput,
  TileGroup,
  Toggle,
  NumberInput,
  AILabel,
  AILabelContent,
} from '@carbon/react';
import { StepProvider, useStepContext } from '@carbon/utilities-react';
import cx from 'classnames';
import { CreateTearsheet } from '../components/CreateTearsheet';
import { CreateTearsheetStep } from '../components/CreateTearsheetStep';
import { NoDataEmptyState } from '@carbon/ibm-products';

const blockClass = `tearsheet-create-multi-step`;

const IntroStep = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <CreateTearsheetStep
      title="Select a category"
      subtitle="This is the category of item you will create"
      hideSteps
      hasFieldset={false}
      primaryFocusElement="#tile-1"
    >
      <TileGroup
        defaultSelected={selectedCategory}
        legend="Categories"
        name="Select a category"
        onChange={(value) => setSelectedCategory(value)}
        valueSelected={selectedCategory}
      >
        <RadioTile
          className={`tearsheet-create-multi-step--custom-tile`}
          value="standard"
          id="tile-1"
          tabIndex={selectedCategory === 'standard' ? 0 : -1}
        >
          <NoDataEmptyState />
          <span className={`tearsheet-create-multi-step--custom-tile-label`}>
            Standard
          </span>
        </RadioTile>
        <RadioTile
          className={`tearsheet-create-multi-step--custom-tile`}
          value="premium"
          id="tile-2"
          tabIndex={selectedCategory === 'premium' ? 0 : -1}
        >
          <NoDataEmptyState size="lg" />
          <span className={`tearsheet-create-multi-step--custom-tile-label`}>
            Premium
          </span>
        </RadioTile>
        <RadioTile
          className={`tearsheet-create-multi-step--custom-tile`}
          value="plus"
          id="tile-3"
          tabIndex={selectedCategory === 'plus' ? 0 : -1}
        >
          <NoDataEmptyState size="lg" />
          <span className={`tearsheet-create-multi-step--custom-tile-label`}>
            Plus
          </span>
        </RadioTile>
      </TileGroup>
    </CreateTearsheetStep>
  );
};

const TopicNameStep = ({
  shouldReject,
  setShouldReject,
  hasSubmitError,
  setHasSubmitError,
  isInvalid,
  setIsInvalid,
  simulatedDelay,
  blockClass,
}) => {
  const { formState, setFormState } = useStepContext();
  const { topicName, topicDescription, topicVersion } = formState || {};

  return (
    <CreateTearsheetStep
      primaryFocusElement="#tearsheet-multi-step-story-text-input-multi-step-1"
      onNext={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (shouldReject) {
              setHasSubmitError(true);
              reject();
            }
            setIsInvalid(false);
            resolve();
          }, simulatedDelay);
        });
      }}
      title="Topic name"
      fieldsetLegendText="Topic information"
      subtitle="This is the unique name used to recognize your topic"
      description="It will also be used by your producers and consumers as part of the
           connection information, so make it something easy to recognize."
    >
      <Grid>
        <Column xlg={8} lg={8} md={8} sm={4}>
          <TextInput
            labelText="Topic name"
            id="tearsheet-multi-step-story-text-input-multi-step-1"
            value={topicName || ''}
            placeholder="Enter topic name"
            onChange={(event) => {
              if (event.target.value.length) {
                setIsInvalid(false);
              }
              setFormState((prev) => ({
                ...prev,
                topicName: event.target.value,
              }));
            }}
            invalid={isInvalid}
            invalidText="This is a required field"
          />
          <TextInput
            labelText="Topic description (optional)"
            id="tearsheet-multi-step-story-text-input-multi-step-1-input-2"
            value={topicDescription || ''}
            placeholder="Enter topic description"
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                topicDescription: event.target.value,
              }))
            }
          />
          <TextInput
            labelText="Topic version (optional)"
            id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
            value={topicVersion || ''}
            placeholder="Enter topic version"
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                topicVersion: event.target.value,
              }))
            }
          />
          {hasSubmitError && (
            <InlineNotification
              kind="error"
              title="Error"
              subtitle="Resolve errors to continue"
              onClose={() => setHasSubmitError(false)}
            />
          )}
          <Toggle
            className={`${blockClass}__error--toggle`}
            id="simulated-error-toggle"
            size="sm"
            labelText="Simulate error"
            onToggle={(event) => setShouldReject(event)}
          />
        </Column>
      </Grid>
    </CreateTearsheetStep>
  );
};

const PartitionsStep = () => {
  const { formState, setFormState } = useStepContext();
  const { partitions = 1 } = formState || {};

  return (
    <CreateTearsheetStep
      title="Partitions"
      subtitle="One or more partitions make up a topic. A partition is an ordered
           list of messages."
      description="Partitions are distributed across the brokers in order to increase
           the scalability of your topic. You can also use them to distribute
           messages across the members of a consumer group."
      fieldsetLegendText="Partition information"
      primaryFocusElement="#carbon-number"
    >
      <Grid>
        <Column xlg={3} lg={3} md={8} sm={4}>
          <NumberInput
            iconDescription="Choose a number"
            id="carbon-number"
            min={1}
            max={100}
            value={partitions}
            label="Partitions"
            helperText="1 partition is sufficient for getting started but, production systems often have more."
            invalidText="Max partitions is 100, min is 1"
            onChange={(event) => {
              const value = event?.imaginaryTarget?.value;
              setFormState((prev) => ({
                ...prev,
                partitions: value,
              }));
            }}
          />
        </Column>
      </Grid>
    </CreateTearsheetStep>
  );
};

const MessageRetentionStep = () => {
  const { formState, setFormState } = useStepContext();
  const { messageRetention = 'one-day' } = formState || {};

  return (
    <CreateTearsheetStep
      title="Message retention"
      onNext={() => Promise.resolve()}
      subtitle="This is how long messages are retained before they are deleted."
      description="If your messages are not read by a consumer within this time, they
           will be missed."
      fieldsetLegendText="Message retention scheduling"
      primaryFocusElement="#one-day"
    >
      <Grid>
        <Column xlg={8} lg={8} md={8} sm={4}>
          <RadioButtonGroup
            legendText="Message retention"
            name="radio-button-group"
            valueSelected={messageRetention}
            onChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                messageRetention: value,
              }))
            }
            orientation="vertical"
          >
            <RadioButton labelText="A day" value="one-day" id="one-day" />
            <RadioButton labelText="A week" value="one-week" id="one-week" />
            <RadioButton labelText="A month" value="one-month" id="one-month" />
          </RadioButtonGroup>
        </Column>
      </Grid>
    </CreateTearsheetStep>
  );
};

export const MultiStepWithIntro = ({
  backButtonText = 'Back',
  cancelButtonText = 'Cancel',
  className = 'tearsheet-create-multi-step',
  description = '',
  influencerWidth = undefined,
  label = '',
  nextButtonText = 'Next',
  slug = undefined,
  decorator = undefined,
  submitButtonText = 'Create',
  title = 'Create',
  open,
  setOpen,
}) => {
  const [simulatedDelay] = useState(750);
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('standard');

  const clearCreateData = () => {
    setHasSubmitError(false);
    setIsInvalid(false);
    setOpen(false);
    setSelectedCategory('standard');
  };

  const handleNextDisabledState = (formState, currentStep) => {
    // Step 1 is intro step - always enabled
    if (currentStep === 1) {
      return false;
    }

    // Calculate step indices based on selected category
    let topicNameStepIndex = 2;
    let partitionsStepIndex = 3;
    let retentionStepIndex = 4;

    if (selectedCategory === 'plus') {
      // Plus has conditional step after intro
      topicNameStepIndex = 3;
      partitionsStepIndex = 4;
      retentionStepIndex = 5;
    } else if (selectedCategory === 'standard') {
      // Standard has conditional step after intro
      topicNameStepIndex = 3;
      partitionsStepIndex = 4;
      retentionStepIndex = 5;
    }

    // Topic name step - require topic name
    if (currentStep === topicNameStepIndex && !formState?.topicName) {
      return true;
    }

    // Partitions step - always has default value
    if (currentStep === partitionsStepIndex) {
      return false;
    }

    // Message retention step - always has default value
    if (currentStep === retentionStepIndex) {
      return false;
    }

    return false;
  };

  const handleBackDisabledState = (currentStep) => {
    return currentStep === 1;
  };
  const Decorator = () => (
    <AILabel className="decorator-container" size="xs">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            This is not really Lorem Ipsum but the spell checker did not like
            the previous text with it&apos;s non-words which is why this
            unwieldy sentence, should one choose to call it that, here.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
      </AILabelContent>
    </AILabel>
  );

  return (
    <StepProvider>
      <CreateTearsheet
        influencerWidth={influencerWidth}
        label={label}
        className={cx(blockClass, className)}
        submitButtonText={submitButtonText}
        cancelButtonText={cancelButtonText}
        backButtonText={backButtonText}
        nextButtonText={nextButtonText}
        description={description}
        title={title}
        open={open}
        onClose={clearCreateData}
        onRequestSubmit={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              clearCreateData();
              resolve();
            }, simulatedDelay);
          })
        }
        decorator={decorator && <Decorator />}
        hasError={hasSubmitError}
        handleNextDisabledState={handleNextDisabledState}
        handleBackDisabledState={handleBackDisabledState}
      >
        <IntroStep
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          title={title}
          hideSteps={true}
        />
        {selectedCategory === 'plus' && (
          <CreateTearsheetStep
            title="Conditional step"
            subtitle="This step will only show for plus category creation flows"
            hasFieldset={false}
            primaryFocusElement="body"
          >
            This step will only show for plus create flows
          </CreateTearsheetStep>
        )}
        {selectedCategory === 'standard' && (
          <CreateTearsheetStep
            title="Standard step only"
            hasFieldset={false}
            primaryFocusElement="body"
          >
            This step will only show for standard create flows
          </CreateTearsheetStep>
        )}
        <TopicNameStep
          shouldReject={shouldReject}
          setShouldReject={setShouldReject}
          hasSubmitError={hasSubmitError}
          setHasSubmitError={setHasSubmitError}
          isInvalid={isInvalid}
          setIsInvalid={setIsInvalid}
          simulatedDelay={simulatedDelay}
          blockClass={blockClass}
          title="Topic name"
        />
        <PartitionsStep title="Partitions" />
        <MessageRetentionStep title="Message Retention" />
      </CreateTearsheet>
    </StepProvider>
  );
};
