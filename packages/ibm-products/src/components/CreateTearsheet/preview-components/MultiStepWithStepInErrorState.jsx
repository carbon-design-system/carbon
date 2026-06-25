/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, Column, Grid, TextInput, NumberInput } from '@carbon/react';
import cx from 'classnames';
import { pkg } from '../../../settings';
import { CreateTearsheet } from '../CreateTearsheet';
import { CreateTearsheetStep } from '../CreateTearsheetStep';
import { sampleDecorator } from '../../../global/js/story-parts/decorator';

const blockClass = `${pkg.prefix}--tearsheet-create-multi-step`;

export const MultiStepWithStepInErrorState = (
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
  const [stepOneTextInputValue, setStepOneTextInputValue] = useState('');
  const [topicDescriptionValue, setTopicDescriptionValue] = useState('');
  const [stepTwoTextInputValue, setStepTwoTextInputValue] = useState(1);
  useState('one-day');
  const [stepOneIsInvalid, setStepOneIsInvalid] = useState(true);
  const [stepTwoIsInvalid, setStepTwoIsInvalid] = useState(false);

  const clearCreateData = () => {
    setStepOneTextInputValue('');
    setTopicDescriptionValue('');
    setStepTwoTextInputValue(1);
    setStepOneIsInvalid(true);
    setStepTwoIsInvalid(true);
    setOpen(false);
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
          title="Topic name"
          fieldsetLegendText="Topic information"
          disableSubmit={stepOneIsInvalid}
          subtitle="This is the unique name used to recognize your topic"
          invalid={stepOneIsInvalid}
        >
          <Grid>
            <Column xlg={8} lg={8} md={8} sm={4}>
              <TextInput
                labelText="Topic name"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={stepOneTextInputValue}
                placeholder="Enter topic name"
                onChange={(event) => {
                  setStepOneIsInvalid(!event.target.value.length);
                  setStepOneTextInputValue(event.target.value);
                }}
                invalid={stepOneIsInvalid}
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
            </Column>
          </Grid>
        </CreateTearsheetStep>
        <CreateTearsheetStep
          title="Partitions"
          disableSubmit={stepTwoIsInvalid}
          subtitle="One or more partitions make up a topic. A partition is an ordered
           list of messages."
          description="Partitions are distributed across the brokers in order to increase
           the scalability of your topic. You can also use them to distribute
           messages across the members of a consumer group."
          fieldsetLegendText="Partition information"
          invalid={stepTwoIsInvalid}
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
                hideSteppers
                onChange={(event) => {
                  event.target.value > 0 && event.target.value <= 100
                    ? setStepTwoIsInvalid(false)
                    : setStepTwoIsInvalid(true);
                  setStepTwoTextInputValue(event.target.value);
                }}
              />
            </Column>
          </Grid>
        </CreateTearsheetStep>
      </CreateTearsheet>
    </div>
  );
};
