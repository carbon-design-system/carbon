/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2021, 2023
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
  TextInput,
  Toggle,
  NumberInput,
  Checkbox,
  Link,
} from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { CreateTearsheet } from '../CreateTearsheet';
import { CreateTearsheetStep } from '../CreateTearsheetStep';
import { sampleDecorator } from '../../../global/js/story-parts/decorator';

const blockClass = `${pkg.prefix}--tearsheet-create-multi-step`;

const CustomStep = ({ value1, setValue1, ...rest }) => {
  return (
    <CreateTearsheetStep {...rest} disableSubmit={!value1}>
      <Grid>
        <Column xlg={8} lg={8} md={8} sm={4}>
          <TextInput
            value={value1}
            onChange={(event) => setValue1(event.target.value)}
            id="custom-step-input"
            labelText="Location"
            placeholder="Enter location"
          />
        </Column>
      </Grid>
    </CreateTearsheetStep>
  );
};

export const MultiStepTearsheet = (
  {
    backButtonText,
    cancelButtonText,
    className,
    description,
    firstFocusElement,
    influencerWidth,
    label,
    nextButtonText,
    secondaryButtonDisabled: secondaryButtonDisabledProp,
    slug,
    decorator,
    submitButtonText,
    title,
    ...rest
  },
  context
) => {
  const [simulatedDelay] = useState(750);
  const [open, setOpen] = useState(context?.viewMode !== 'docs');
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [value1, setValue1] = useState('');
  const [stepOneTextInputValue, setStepOneTextInputValue] = useState('');
  const [topicDescriptionValue, setTopicDescriptionValue] = useState('');
  const [topicVersionValue, setTopicVersionValue] = useState('');
  const [stepTwoTextInputValue, setStepTwoTextInputValue] = useState(1);
  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState('one-day');
  const [isInvalid, setIsInvalid] = useState(false);
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  const [selIndex, setSelIndex] = useState(0);
  const [disableBackButton, setDisableBackButton] = useState(false);
  const clearCreateData = () => {
    setStepOneTextInputValue('');
    setTopicDescriptionValue('');
    setTopicVersionValue('');
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue('one-day');
    setHasSubmitError(false);
    setIsInvalid(false);
    setOpen(false);
    setValue1('');
    setShouldIncludeAdditionalStep(false);
    setDisableBackButton(false);
  };

  return (
    <div>
      <style>{`.${blockClass} { opacity: 0 }`};</style>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close CreateTearsheet' : 'Open CreateTearsheet'}
      </Button>
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
        firstFocusElement={firstFocusElement}
        slug={slug && sampleDecorator(slug)}
        decorator={decorator && sampleDecorator(decorator)}
        {...rest}
        hasError={hasSubmitError}
        selectorPrimaryFocus="#tearsheet-multi-step-story-text-input-multi-step-1"
      >
        <CreateTearsheetStep
          onNext={() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // Example usage of how to prevent the next step if some kind
                // of error occurred during the `onNext` handler.
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
          disableSubmit={!stepOneTextInputValue}
          subtitle="This is the unique name used to recognize your topic"
          description={
            <div>
              It will also be used by your producers and consumers as part of
              the connection information, so make it something easy to
              recognize. <Link href="#">Learn more.</Link>
            </div>
          }
        >
          <Grid>
            <Column xlg={8} lg={8} md={8} sm={4}>
              <TextInput
                labelText="Topic name"
                placeholder="Enter topic name"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={stepOneTextInputValue}
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setStepOneTextInputValue(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {}}
              />
              <TextInput
                labelText="Topic description (optional)"
                id="tearsheet-multi-step-story-text-input-multi-step-1-input-2"
                value={topicDescriptionValue}
                placeholder="Enter topic description"
                onChange={(event) =>
                  setTopicDescriptionValue(event.target.value)
                }
              />
              <TextInput
                labelText="Topic version (optional)"
                id="tearsheet-multi-step-story-text-input-multi-step-1-input-3"
                value={topicVersionValue}
                placeholder="Enter topic version"
                onChange={(event) => setTopicVersionValue(event.target.value)}
              />

              {hasSubmitError && (
                <InlineNotification
                  kind="error"
                  title="Error"
                  subtitle="Resolve errors to continue"
                  id="step-submit-error"
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
              <Checkbox
                labelText={`Include additional step`}
                id="include-additional-step-checkbox"
                onChange={(event, { checked }) =>
                  setShouldIncludeAdditionalStep(checked)
                }
                checked={shouldIncludeAdditionalStep}
              />
            </Column>
          </Grid>
        </CreateTearsheetStep>
        <CreateTearsheetStep
          onPrevious={() => {
            console.log('custom onPrevious handler');
          }}
          title="Dynamic step"
          subtitle="Dynamic step subtitle"
          description="This is an example showing how to include a dynamic step into the CreateTearsheet"
          hasFieldset={false}
          includeStep={shouldIncludeAdditionalStep}
        >
          dynamic step content
        </CreateTearsheetStep>
        <CustomStep
          title="Location"
          subtitle="Custom step subtitle"
          description="Custom step description (see storybook implementation for new custom step capability)"
          value1={value1}
          setValue1={setValue1}
          hasFieldset={false}
        />
        <CreateTearsheetStep
          title="Partitions"
          disableSubmit={!stepTwoTextInputValue}
          subtitle="One or more partitions make up a topic. A partition is an ordered
          list of messages."
          description="Partitions are distributed across the brokers in order to increase
          the scalability of your topic. You can also use them to distribute
          messages across the members of a consumer group."
          fieldsetLegendText="Partition information"
        >
          <Grid>
            <Column xlg={3} lg={3} md={8} sm={4}>
              <NumberInput
                iconDescription="Choose a number"
                id="carbon-number"
                min={1}
                max={100}
                value={stepTwoTextInputValue}
                label="Partitions"
                helperText="1 partition is sufficient for getting started but, production systems often have more."
                invalidText="Max partitions is 100, min is 1"
                onChange={(event) =>
                  setStepTwoTextInputValue(event.imaginaryTarget.value)
                }
              />
            </Column>
          </Grid>
        </CreateTearsheetStep>
        <CreateTearsheetStep
          title="Message retention"
          disableSubmit={!stepThreeTextInputValue}
          secondaryButtonDisabled={
            secondaryButtonDisabledProp !== undefined
              ? secondaryButtonDisabledProp
              : disableBackButton
          }
          onNext={() => Promise.resolve()}
          subtitle="This is how long messages are retained before they are deleted."
          description="If your messages are not read by a consumer within this time, they
          will be missed."
          fieldsetLegendText="Message retention scheduling"
        >
          <Grid>
            <Column xlg={8} lg={8} md={8} sm={4}>
              <RadioButtonGroup
                legendText="Message retention"
                name="radio-button-group"
                defaultSelected={stepThreeTextInputValue}
                onChange={(value) => setStepThreeTextInputValue(value)}
                orientation="vertical"
              >
                <RadioButton labelText="A day" value="one-day" id="one-day" />
                <RadioButton
                  labelText="A week"
                  value="one-week"
                  id="one-week"
                />
                <RadioButton
                  labelText="A month"
                  value="one-month"
                  id="one-month"
                />
              </RadioButtonGroup>
              <Toggle
                className={`${blockClass}__back-button--toggle`}
                id="disable-back-button-toggle"
                size="sm"
                labelText="Disable secondary button"
                toggled={disableBackButton}
                onToggle={(checked) => setDisableBackButton(checked)}
              />
            </Column>
          </Grid>
        </CreateTearsheetStep>
      </CreateTearsheet>
    </div>
  );
};
