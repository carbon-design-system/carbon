// @ts-nocheck
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Column,
  FormGroup,
  Grid,
  InlineNotification,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  TextInput,
  Toggle,
} from '@carbon/react';
import { DefinitionTooltip } from '@carbon/react';
import { usePrefix } from '@carbon/react';

import { CreateFullPage } from '../components/CreateFullPage';
import { CreateFullPageStep } from '../components/CreateFullPageStep';

const blockClass = 'create-full-page-pattern';
const storyClass = 'create-full-page-stories';

export const CreateFullPageWithSections = () => {
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);

  return (
    <div className="create-full-page-stories__viewport">
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <CreateFullPage
        className={`${blockClass}`}
        secondaryTitle="Create topic"
        nextButtonText="Next"
        backButtonText="Back"
        cancelButtonText="Cancel"
        submitButtonText="Create"
        modalTitle="Are you sure you want to cancel?"
        modalDescription="If you cancel, the information you have entered won't be saved."
        modalDangerButtonText="Cancel partition"
        modalSecondaryButtonText="Return to form"
        onRequestSubmit={async () => {
          console.log('Form submitted');
        }}
        onClose={() => {
          console.log('CreateFullPage closed');
        }}
      >
        <CreateFullPageStep
          title="Partition"
          subtitle="One or more partitions make up a topic. A partition is an ordered list of messages."
          description="Partitions are distributed across the brokers in order to increase the scalability of your topic. You can also use them to distribute messages across the members of a consumer group."
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
          disableSubmit={!textInput}
        >
          <Grid>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <FormGroup
                className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
                legendText="Partition"
              >
                <TextInput
                  id="test-6"
                  invalidText="A valid value is required"
                  labelText="Topic name"
                  placeholder="Enter topic name"
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    setIsInvalid(false);
                  }}
                  onBlur={() => {
                    textInput.length === 0 && setIsInvalid(true);
                  }}
                  invalid={isInvalid}
                />
                {hasSubmitError && (
                  <InlineNotification
                    lowContrast
                    kind="error"
                    title="Error"
                    subtitle="Resolve errors to continue"
                    onClose={() => setHasSubmitError(false)}
                  />
                )}
                <div>
                  <div>
                    <DefinitionTooltip
                      className={`${storyClass}__error--text`}
                      size="sm"
                      definition={
                        'Once toggled on, an inline error notification will appear upon clicking next. This is an example usage of how to prevent the next step if some kind of error occurred during the `onNext` handler.'
                      }
                    >
                      Simulate error
                    </DefinitionTooltip>
                  </div>
                  <Toggle
                    labelText="Simulate error"
                    hideLabel
                    id="simulated-error-toggle"
                    size="sm"
                    onToggle={(event) => setShouldReject(event)}
                  />
                </div>
              </FormGroup>
            </Column>
          </Grid>

          <span className={`${blockClass}__section-divider`} />

          <Grid>
            <Column span={50}>
              <h5 className={`${blockClass}__step-title`}>
                Core configuration
              </h5>

              <h6 className={`${blockClass}__step-subtitle`}>
                This is how long messages are retained before they are deleted.
              </h6>
            </Column>
          </Grid>

          <Grid>
            <Column xlg={8} lg={8} md={4} sm={4}>
              <FormGroup
                className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
                legendText="Core configuration"
              >
                <Grid>
                  <Column span={50}>
                    <p
                      className={`${blockClass}__step-description ${storyClass}__step-description`}
                    >
                      If your messages are not read by a consumer within this
                      time, they will be missed.
                    </p>
                  </Column>

                  <Column xlg={5} lg={5} md={4} sm={4}>
                    <Grid>
                      <Column xlg={5} lg={5} md={4} sm={4}>
                        <TextInput
                          id="test-7"
                          invalidText="A valid value is required"
                          labelText="Topic name (optional)"
                          placeholder="Enter topic name"
                        />
                      </Column>

                      <Column span={3}>
                        <NumberInput
                          id="test-8"
                          invalidText="Number is not valid"
                          label="Label (optional)"
                          max={100}
                          min={0}
                          step={10}
                          value={0}
                          iconDescription="Choose a number"
                        />

                        <NumberInput
                          id="test-9"
                          invalidText="Number is not valid"
                          label="Label (optional)"
                          max={100}
                          min={0}
                          step={10}
                          value={0}
                          iconDescription="Choose a number"
                        />
                      </Column>

                      <Column xlg={5} lg={5} md={4} sm={4}>
                        <TextInput
                          id="test-10"
                          invalidText="A valid value is required"
                          labelText="Minimum in-sync replicas (optional)"
                          placeholder="Enter topic name"
                        />
                      </Column>
                    </Grid>
                  </Column>
                </Grid>
              </FormGroup>
            </Column>
          </Grid>
        </CreateFullPageStep>

        <CreateFullPageStep
          title="Message retention"
          subtitle="This is how many copies of a topic will be made for high availability"
          description="The partitions of each topic can be replicated across a configurable number of brokers."
        >
          <Grid>
            <Column span={100}>
              <RadioButtonGroup
                defaultSelected="standard"
                legend="Group Legend"
                name="radio-button-group"
                valueSelected="standard"
                orientation="vertical"
              >
                <RadioButton
                  id="radio-4"
                  labelText="Replication factor: 1"
                  value="standard"
                />
                <RadioButton
                  id="radio-5"
                  labelText="Replication factor: 2"
                  value="default-selected"
                />
                <RadioButton
                  id="radio-6"
                  labelText="Replication factor: 3"
                  value="disabled"
                />
              </RadioButtonGroup>
            </Column>
          </Grid>
        </CreateFullPageStep>
      </CreateFullPage>
    </div>
  );
};
