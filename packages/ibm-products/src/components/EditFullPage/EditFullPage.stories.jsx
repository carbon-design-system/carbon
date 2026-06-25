/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { carbon } from '../../settings';
import { action } from 'storybook/actions';
import { CreateFullPage } from '../CreateFullPage';
import { CreateFullPageStep } from '../CreateFullPage/CreateFullPageStep';
import { pkg } from '../../settings';

import { EditFullPage } from '.';

import styles from '../CreateFullPage/_storybook-styles.scss?inline';
import { Annotation } from '../../../.storybook/Annotation';

const storyClass = 'create-full-page-stories';
const blockClass = `${pkg.prefix}--create-full-page`;

import {
  Checkbox,
  TextInput,
  NumberInput,
  InlineNotification,
  Toggle,
  RadioButtonGroup,
  RadioButton,
  FormGroup,
  Column,
  Grid,
  DefinitionTooltip,
  usePrefix,
} from '@carbon/react';
import DocsPage from './EditFullPage.docs-page';

export default {
  title: 'Deprecated/Edit and update/EditFullPage',
  component: EditFullPage,
  tags: ['autodocs'],
  parameters: {
    styles,
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
    docs: { page: DocsPage },
    controls: { sort: 'requiredFirst' },
  },
  decorators: [
    (story) => (
      <div className={`${storyClass}__viewport`}>
        {/* fullPage component styles */}
        <style>{`
      .${pkg.prefix}--custom-annotation { height: 100% }
      .${pkg.prefix}--custom-annotation > .${pkg.prefix}--annotation__content { height: calc(100% - 1.6rem); padding: 0 }
      `}</style>
        <Annotation
          className={`${pkg.prefix}--custom-annotation`}
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
      </div>
    ),
  ],
};

const defaultFullPageProps = {
  nextButtonText: 'Next',
  backButtonText: 'Back',
  cancelButtonText: 'Cancel changes',
  submitButtonText: 'Save changes',
  modalTitle: 'Are you sure you want to cancel?',
  modalDescription:
    "If you cancel, the information you have entered won't be saved.",
  modalDangerButtonText: 'Cancel partition',
  modalSecondaryButtonText: 'Return to form',
  onRequestSubmit: action('Submit handler called'),
  onClose: action('Close handler called'),
};

const Template = ({ ...args }) => {
  const [textInput, setTextInput] = useState('Enter topic name');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  const carbonPrefix = usePrefix();

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <CreateFullPage {...args}>
        <CreateFullPageStep
          className={`${storyClass}__step-fieldset--no-label`}
          title="Partition"
          subtitle="One or more partitions make up a topic. A partition is an ordered list
        of messages."
          description="Partitions are distributed across the brokers in order to increase the
        scalability of your topic. You can also use them to distribute
        messages across the members of a consumer group."
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
              <TextInput
                id="test-1"
                invalidText="A valid value is required"
                labelText="Topic name"
                placeholder="Enter topic name"
                value={textInput}
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
              <Checkbox
                labelText={`Include additional step`}
                id="include-additional-step-checkbox"
                onChange={(value) => setShouldIncludeAdditionalStep(value)}
                checked={shouldIncludeAdditionalStep}
              />
            </Column>
          </Grid>
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Dynamic step"
          description="Example dynamic step"
          includeStep={shouldIncludeAdditionalStep}
        />
        <CreateFullPageStep
          title="Empty"
          secondaryLabel="Optional"
          description="Empty step for demonstration purposes"
        />
        <CreateFullPageStep
          className={`${storyClass}__step-fieldset--no-label`}
          title="Core configuration"
          description="Here is an example description for the 'Core configuration' step."
          secondaryLabel="Optional"
        >
          <Grid>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <Grid>
                <Column xlg={5} lg={5} md={4} sm={4}>
                  <TextInput
                    id="test-2"
                    invalidText="A valid value is required"
                    labelText="Topic name (optional)"
                    placeholder="Enter topic name"
                    value={textInput}
                  />
                </Column>
                <Column xlg={5} lg={5} md={4} sm={4}>
                  <NumberInput
                    id="test-3"
                    invalidText="Number is not valid"
                    label="Label (optional)"
                    max={100}
                    min={0}
                    step={10}
                    value={0}
                    iconDescription="Number input"
                  />
                  <NumberInput
                    id="test-4"
                    invalidText="Number is not valid"
                    label="Label (optional)"
                    max={100}
                    min={0}
                    step={10}
                    value={0}
                    iconDescription="Number input"
                  />
                </Column>
                <Column xlg={5} lg={5} md={4} sm={4}>
                  <TextInput
                    id="test-5"
                    invalidText="A valid value is required"
                    labelText="Minimum in-sync replicas (optional)"
                    placeholder="Enter topic name"
                    value={textInput}
                  />
                </Column>
              </Grid>
            </Column>
          </Grid>
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Message retention"
          subtitle="This is how many copies of a topic will be made for high availability"
          description="The partitions of each topic can be replicated across a configurable number of brokers"
        >
          <Grid>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <RadioButtonGroup
                defaultSelected="standard"
                legend="Group Legend"
                name="radio-button-group"
                valueSelected="standard"
                orientation="vertical"
              >
                <RadioButton
                  id="radio-1"
                  labelText="Replication factor: 1"
                  value="standard"
                />
                <RadioButton
                  id="radio-2"
                  labelText="Replication factor: 2"
                  value="default-selected"
                />
                <RadioButton
                  id="radio-3"
                  labelText="Replication factor: 3"
                  value="disabled"
                />
              </RadioButtonGroup>
            </Column>
          </Grid>
        </CreateFullPageStep>
      </CreateFullPage>
    </>
  );
};

const TemplateWithSections = ({ ...args }) => {
  const [textInput, setTextInput] = useState('Enter topic name');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);
  const carbonPrefix = usePrefix();

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <CreateFullPage className={`${blockClass}`} {...args}>
        <CreateFullPageStep
          title="Partition"
          subtitle="One or more partitions make up a topic. A partition is an ordered list
        of messages."
          description="Partitions are distributed across the brokers in order to increase the
        scalability of your topic. You can also use them to distribute
        messages across the members of a consumer group."
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
                  value={textInput}
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
            <Column xlg={5} lg={5} md={4} sm={4}>
              <h5 className={`${blockClass}__step-title`}>
                Core configuration
              </h5>
              <h6 className={`${blockClass}__step-subtitle`}>
                This is how long messages are retained before they are deleted.
              </h6>
              <FormGroup
                className={`${blockClass}__step-fieldset ${storyClass}__step-fieldset--label`}
                legendText="Core configuration"
              >
                <p>
                  If your messages are not read by a consumer within this time,
                  they will be missed.
                </p>
                <TextInput
                  id="test-7"
                  invalidText="A valid value is required"
                  labelText="Topic name (optional)"
                  placeholder="Enter topic name"
                  value={textInput}
                />
                <NumberInput
                  id="test-8"
                  invalidText="Number is not valid"
                  label="Label (optional)"
                  max={100}
                  min={0}
                  step={10}
                  value={0}
                />
                <NumberInput
                  id="test-9"
                  invalidText="Number is not valid"
                  label="Label (optional)"
                  max={100}
                  min={0}
                  step={10}
                  value={0}
                />
                <TextInput
                  id="test-10"
                  invalidText="A valid value is required"
                  labelText="Minimum in-sync replicas (optional)"
                  placeholder="Enter topic name"
                  value={textInput}
                />
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
            <Column xlg={5} lg={5} md={4} sm={4}>
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
    </>
  );
};

export const editFullPage = Template.bind({});
editFullPage.args = {
  ...defaultFullPageProps,
};

export const editFullPageWithSections = TemplateWithSections.bind({});
editFullPageWithSections.args = {
  ...defaultFullPageProps,
};
