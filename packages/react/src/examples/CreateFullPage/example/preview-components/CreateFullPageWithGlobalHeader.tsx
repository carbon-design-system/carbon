// @ts-nocheck
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Checkbox,
  Column,
  DefinitionTooltip,
  Grid,
  Header,
  HeaderMenuButton,
  HeaderName,
  InlineNotification,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  SideNav,
  SideNavItems,
  SideNavLink,
  TextInput,
  Toggle,
} from '@carbon/react';
import { usePrefix } from '@carbon/react';

import { CreateFullPage } from '../components/CreateFullPage';
import { CreateFullPageStep } from '../components/CreateFullPageStep';

const storyClass = 'create-full-page-stories';

export const CreateFullPageWithGlobalHeader = () => {
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [shouldReject, setShouldReject] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [simulatedDelay] = useState(750);
  const [shouldIncludeAdditionalStep, setShouldIncludeAdditionalStep] =
    useState(false);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [topicName2, setTopicName2] = useState('');
  const [numberInput1, setNumberInput1] = useState(0);
  const [numberInput2, setNumberInput2] = useState(0);
  const [replicas, setReplicas] = useState('');
  const [replicationFactor, setReplicationFactor] = useState('standard');

  return (
    <div className={`${storyClass}__viewport`}>
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
        <CreateFullPage
          title="Page title"
          breadcrumbsOverflowAriaLabel="Open and close additional breadcrumb item list."
          breadcrumbs={[
            { key: '0', label: 'Breadcrumb 1', href: '/', title: 'home page' },
            { key: '1', label: 'Breadcrumb 2', href: '/' },
            { key: '2', label: 'Breadcrumb 3', href: '/' },
            { key: '3', label: 'Breadcrumb 4', isCurrentPage: true },
          ]}
          breadcrumbOverflowTooltipAlign="right"
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
            className={`${storyClass}__step-fieldset--no-label`}
            title="Partition"
            subtitle="One or more partitions make up a topic. A partition is an ordered list of messages."
            description="Partitions are distributed across the brokers in order to increase the scalability of your topic. You can also use them to distribute messages across the members of a consumer group."
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
                  onChange={(checked) =>
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
                      value={topicName2}
                      onChange={(e) => setTopicName2(e.target.value)}
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
                      value={numberInput1}
                      onChange={(e) => setNumberInput1(e.imaginaryTarget.value)}
                      iconDescription="Choose a number"
                    />

                    <NumberInput
                      id="test-4"
                      invalidText="Number is not valid"
                      label="Label (optional)"
                      max={100}
                      min={0}
                      step={10}
                      value={numberInput2}
                      onChange={(e) => setNumberInput2(e.imaginaryTarget.value)}
                      iconDescription="Choose a number"
                    />
                  </Column>

                  <Column xlg={5} lg={5} md={4} sm={4}>
                    <TextInput
                      id="test-5"
                      invalidText="A valid value is required"
                      labelText="Minimum in-sync replicas (optional)"
                      placeholder="Enter topic name"
                      value={replicas}
                      onChange={(e) => setReplicas(e.target.value)}
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
                  valueSelected={replicationFactor}
                  onChange={(value) => setReplicationFactor(value)}
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
    </div>
  );
};
