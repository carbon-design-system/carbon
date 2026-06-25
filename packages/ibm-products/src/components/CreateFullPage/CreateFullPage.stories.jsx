/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { usePrefix, Link } from '@carbon/react';
import { CreateFullPage } from '.';
import { CreateFullPageStep } from './CreateFullPageStep';
import { pkg } from '../../settings';

import styles from './_storybook-styles.scss?inline';

const storyClass = 'create-full-page-stories';
const blockClass = `${pkg.prefix}--create-full-page`;

import {
  Checkbox,
  TextInput,
  NumberInput,
  InlineNotification,
  Toggle,
  DefinitionTooltip,
  RadioButtonGroup,
  RadioButton,
  FormGroup,
  Grid,
  Column,
  Header,
  HeaderName,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavLink,
} from '@carbon/react';
import DocsPage from './CreateFullPage.docs-page';

const breadcrumbs = {
  'No breadcrumb': null,
  'A single breadcrumb': [{ href: '/', key: '0', label: 'Home page' }],
  'Two breadcrumbs': [
    { key: '0', href: '/', label: 'Home page' },
    { key: '1', href: '/', label: 'Application name' },
  ],
};

export default {
  title: 'Patterns/Prebuilt patterns/Create flows/CreateFullPage',
  component: CreateFullPage,
  tags: ['autodocs'],
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: { page: DocsPage },
    controls: { sort: 'requiredFirst' },
  },

  decorators: [
    (story) => <div className={`${storyClass}__viewport`}>{story()}</div>,
  ],
  argTypes: {
    breadcrumbs: {
      control: {
        type: 'select',
        labels: Object.keys(breadcrumbs),
      },
      options: Object.values(breadcrumbs).map((_k, i) => i),
      mapping: Object.values(breadcrumbs),
    },
    children: {
      control: false,
    },
  },
};

const defaultFullPageProps = {
  secondaryTitle: 'Create topic',
  nextButtonText: 'Next',
  backButtonText: 'Back',
  cancelButtonText: 'Cancel',
  submitButtonText: 'Create',
  modalTitle: 'Are you sure you want to cancel?',
  modalDescription:
    "If you cancel, the information you have entered won't be saved.",
  modalDangerButtonText: 'Cancel partition',
  modalSecondaryButtonText: 'Return to form',
  onClickInfluencerStep: (step) => console.log('Step: ', step),
  onRequestSubmit: action('Submit handler called'),
  onClose: action('Close handler called'),
};

const Template = ({ ...args }) => {
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <CreateFullPage {...args}>
        <CreateFullPageStep
          className={`${storyClass}__step-fieldset--no-label`}
          title="Partition"
          subtitle="One or more partitions make up a topic. A partition is an ordered list
        of messages."
          description={
            <>
              <span>
                Partitions are distributed across the brokers in order to
                increase the scalability of your topic. You can also use them to
                distribute messages across the members of a consumer group.
              </span>
              &nbsp;<Link href="#">Learn more.</Link>
            </>
          }
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
                onChange={(event, { checked }) =>
                  setShouldIncludeAdditionalStep(checked)
                }
                checked={shouldIncludeAdditionalStep}
              />
            </Column>
          </Grid>
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Dynamic step"
          description="Example dynamic step"
          includeStep={shouldIncludeAdditionalStep}
          onPrevious={() => console.log('custom onPrevious handler')}
        />
        <CreateFullPageStep
          title="Empty"
          secondaryLabel="Optional"
          description="Empty step for demonstration purposes"
          onPrevious={() => console.log('custom onPrevious handler')}
        />
        <CreateFullPageStep
          className={`${storyClass}__step-fieldset--no-label`}
          title="Core configuration"
          description="Here is an example description for the 'Core configuration' step."
          secondaryLabel="Optional"
          onPrevious={() => console.log('custom onPrevious handler')}
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
                  />
                </Column>

                <Column span={3}>
                  <NumberInput
                    id="test-3"
                    invalidText="Number is not valid"
                    label="Label (optional)"
                    max={100}
                    min={0}
                    step={10}
                    value={0}
                    iconDescription="Choose a number"
                  />

                  <NumberInput
                    id="test-4"
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
                    id="test-5"
                    invalidText="A valid value is required"
                    labelText="Minimum in-sync replicas (optional)"
                    placeholder="Enter topic name"
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
          onPrevious={() => console.log('custom onPrevious handler')}
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
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);

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
    </>
  );
};

const TemplateWithError = ({ ...args }) => {
  const [textInput, setTextInput] = useState('');
  const [isInvalid, setIsInvalid] = useState(true);
  const [isFirstStepInvalid, setIsFirstStepInvalid] = useState(true);

  return (
    <CreateFullPage {...args}>
      <CreateFullPageStep
        title="Partition"
        subtitle="One or more partitions make up a topic. A partition is an ordered list
        of messages."
        invalid={isFirstStepInvalid}
        disableSubmit={isFirstStepInvalid}
      >
        <Grid>
          <Column xlg={5} lg={5} md={4} sm={4}>
            <TextInput
              id="test-6"
              invalidText="A valid value is required"
              labelText="Topic name"
              placeholder="Enter topic name"
              onChange={(e) => {
                setTextInput(e.target.value);
                setIsInvalid(e.target.value ? false : true);
                setIsFirstStepInvalid(e.target.value ? false : true);
              }}
              onBlur={() => {
                textInput.length === 0 && setIsInvalid(true);
              }}
              invalid={isInvalid}
            />
          </Column>
        </Grid>
      </CreateFullPageStep>
      <CreateFullPageStep title="Core Configuration">
        <Grid>
          <Column xlg={5} lg={5} md={4} sm={4}>
            Test step
          </Column>
        </Grid>
      </CreateFullPageStep>
    </CreateFullPage>
  );
};

export const createFullPage = Template.bind({});
createFullPage.args = {
  ...defaultFullPageProps,
};

export const createFullPageWithSections = TemplateWithSections.bind({});
createFullPageWithSections.args = {
  ...defaultFullPageProps,
};

export const createFullPageWithHeader = Template.bind({});
createFullPageWithHeader.args = {
  ...defaultFullPageProps,
  title: 'Page title',
  breadcrumbsOverflowAriaLabel:
    'Open and close additional breadcrumb item list.',
  breadcrumbs: [
    { key: '0', label: 'Breadcrumb 1', href: '/', title: 'home page' },
    { key: '1', label: 'Breadcrumb 2', href: '/' },
    { key: '2', label: 'Breadcrumb 3', href: '/' },
    { key: '3', label: 'Breadcrumb 4', isCurrentPage: true },
  ],
  maxVisibleBreadcrumbs: 3,
  breadcrumbOverflowTooltipAlign: 'right',
};

export const createFullPageWithStepInErrorState = TemplateWithError.bind({});
createFullPageWithStepInErrorState.args = {
  ...defaultFullPageProps,
};

const TemplateWithGlobalHeader = ({ ...args }) => {
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);

  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  return (
    <>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <Header aria-label="IBM Platform Name">
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={() => {
            setIsSideNavExpanded((prev) => !prev);
          }}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#" prefix="IBM">
          Products application
        </HeaderName>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isFixedNav
        >
          <SideNavItems>
            <SideNavLink
              href="https://pages.github.ibm.com/carbon/ibm-products/"
              target="_blank"
            >
              Sample link: Carbon for IBM Products
            </SideNavLink>
          </SideNavItems>
        </SideNav>
      </Header>
      <div
        className={`${storyClass}__content-container ${storyClass}__content-container--with-global-header`}
      >
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
                  onChange={(event, { checked }) =>
                    setShouldIncludeAdditionalStep(checked)
                  }
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
                    />
                  </Column>

                  <Column span={3}>
                    <NumberInput
                      id="test-3"
                      invalidText="Number is not valid"
                      label="Label (optional)"
                      max={100}
                      min={0}
                      step={10}
                      value={0}
                      iconDescription="Choose a number"
                    />

                    <NumberInput
                      id="test-4"
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
                      id="test-5"
                      invalidText="A valid value is required"
                      labelText="Minimum in-sync replicas (optional)"
                      placeholder="Enter topic name"
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
              <Column span={100}>
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
      </div>
    </>
  );
};

export const createFullPageWithGlobalHeader = TemplateWithGlobalHeader.bind({});
createFullPageWithGlobalHeader.args = {
  ...defaultFullPageProps,
  title: 'Page title',
  breadcrumbsOverflowAriaLabel:
    'Open and close additional breadcrumb item list.',
  breadcrumbs: [
    { key: '0', label: 'Breadcrumb 1', href: '/', title: 'home page' },
    { key: '1', label: 'Breadcrumb 2', href: '/' },
    { key: '2', label: 'Breadcrumb 3', href: '/' },
    { key: '3', label: 'Breadcrumb 4', isCurrentPage: true },
  ],
  maxVisibleBreadcrumbs: 3,
  breadcrumbOverflowTooltipAlign: 'right',
};
