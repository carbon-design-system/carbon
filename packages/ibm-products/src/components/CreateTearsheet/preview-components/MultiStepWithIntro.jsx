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
  RadioTile,
  TextInput,
  TileGroup,
  Toggle,
  NumberInput,
} from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { CreateTearsheet } from '../CreateTearsheet';
import { CreateTearsheetStep } from '../CreateTearsheetStep';
import { NoDataIllustration } from '../../EmptyStates/assets/NoDataIllustration';
import { sampleDecorator } from '../../../global/js/story-parts/decorator';

const blockClass = `${pkg.prefix}--tearsheet-create-multi-step`;

export const MultiStepWithIntro = (
  {
    backButtonText,
    cancelButtonText,
    className,
    description,
    influencerWidth,
    label,
    nextButtonText,
    slug,
    decorator,
    submitButtonText,
    title,
  },
  context
) => {
  const [simulatedDelay] = useState(750);
  const [open, setOpen] = useState(context?.viewMode !== 'docs');
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [stepOneTextInputValue, setStepOneTextInputValue] = useState('');
  const [topicDescriptionValue, setTopicDescriptionValue] = useState('');
  const [topicVersionValue, setTopicVersionValue] = useState('');
  const [stepTwoTextInputValue, setStepTwoTextInputValue] = useState(1);
  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState('one-day');
  const [isInvalid, setIsInvalid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('standard');

  const clearCreateData = () => {
    setStepOneTextInputValue('');
    setTopicDescriptionValue('');
    setTopicVersionValue('');
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue('one-day');
    setHasSubmitError(false);
    setIsInvalid(false);
    setOpen(false);
    setSelectedCategory('standard');
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
        slug={slug && sampleDecorator(slug)}
        decorator={decorator && sampleDecorator(decorator)}
      >
        <CreateTearsheetStep
          title="Select a category"
          subtitle="This is the category of item you will create"
          introStep
          hasFieldset={false}
        >
          <TileGroup
            defaultSelected={selectedCategory}
            legend="Categories"
            name="Select a category"
            onChange={(value) => setSelectedCategory(value)}
            valueSelected={selectedCategory}
          >
            <RadioTile
              className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile`}
              value="standard"
              id="tile-1"
              tabIndex={selectedCategory === 'standard' ? 0 : -1}
            >
              <NoDataIllustration size="lg" />
              <span
                className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile-label`}
              >
                Standard
              </span>
            </RadioTile>
            <RadioTile
              className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile`}
              value="premium"
              id="tile-2"
              tabIndex={selectedCategory === 'premium' ? 0 : -1}
            >
              <NoDataIllustration size="lg" />
              <span
                className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile-label`}
              >
                Premium
              </span>
            </RadioTile>
            <RadioTile
              className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile`}
              value="plus"
              id="tile-3"
              tabIndex={selectedCategory === 'plus' ? 0 : -1}
            >
              <NoDataIllustration size="lg" />
              <span
                className={`${pkg.prefix}--tearsheet-create-multi-step--custom-tile-label`}
              >
                Plus
              </span>
            </RadioTile>
          </TileGroup>
        </CreateTearsheetStep>
        <CreateTearsheetStep
          title="Conditional step"
          subtitle="This step will only show for plus category creation flows"
          hasFieldset={false}
          includeStep={selectedCategory === 'plus'}
        >
          This step will only show for plus create flows
        </CreateTearsheetStep>
        <CreateTearsheetStep
          title="Standard step only"
          hasFieldset={false}
          includeStep={selectedCategory === 'standard'}
        >
          This step will only show for standard create flows
        </CreateTearsheetStep>
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
          description="It will also be used by your producers and consumers as part of the
           connection information, so make it something easy to recognize."
        >
          <Grid>
            <Column xlg={8} lg={8} md={8} sm={4}>
              <TextInput
                labelText="Topic name"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={stepOneTextInputValue}
                placeholder="Enter topic name"
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
            </Column>
          </Grid>
        </CreateTearsheetStep>
      </CreateTearsheet>
    </div>
  );
};
