// @ts-nocheck
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Column, Grid, TextInput } from '@carbon/react';
import { usePrefix } from '@carbon/react';

import { CreateFullPage } from '../components/CreateFullPage';
import { CreateFullPageStep } from '../components/CreateFullPageStep';

const storyClass = 'create-full-page-stories';

export const CreateFullPageWithStepInErrorState = () => {
  const carbonPrefix = usePrefix();
  const [textInput, setTextInput] = useState('');
  const [isInvalid, setIsInvalid] = useState(true);
  const [isFirstStepInvalid, setIsFirstStepInvalid] = useState(true);

  return (
    <div className={`${storyClass}__viewport`}>
      <style>{`.${carbonPrefix}--modal { opacity: 0; }`};</style>
      <CreateFullPage
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
    </div>
  );
};
