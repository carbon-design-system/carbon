/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { MultiStepTearsheet } from './preview-components/MultiStepTearsheet';
import { MultiStepWithIntro } from './preview-components/MultiStepWithIntro';
import { MultiStepWithStepInErrorState } from './preview-components/MultiStepWithStepInErrorState';
import '@carbon/styles/css/styles.css';
import '@carbon/ibm-products/css/index.min.css';
import './styles/_create-tearsheet.scss';
import './styles/_story-styles.scss';

export const App = () => {
  const [openMultiStep, setOpenMultiStep] = useState(false);
  const [openWithIntro, setOpenWithIntro] = useState(false);
  const [openWithError, setOpenWithError] = useState(false);

  const commonProps = {
    title: 'Create topic',
    description: 'Specify details for the new topic you want to create',
    submitButtonText: 'Create',
    cancelButtonText: 'Cancel',
    backButtonText: 'Back',
    nextButtonText: 'Next',
  };

  return (
    <div className="app-container" style={{ padding: '2rem' }}>
      <h1>CreateTearsheet Patterns</h1>
      <p style={{ marginBottom: '2rem' }}>
        Examples demonstrating the CreateTearsheet pattern with StepFlow.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          maxWidth: '400px',
        }}
      >
        <Button onClick={() => setOpenMultiStep(!openMultiStep)}>
          {openMultiStep ? 'Close' : 'Open'} Multi-step Tearsheet
        </Button>

        <Button onClick={() => setOpenWithIntro(!openWithIntro)}>
          {openWithIntro ? 'Close' : 'Open'} Tearsheet with Intro Step
        </Button>

        <Button onClick={() => setOpenWithError(!openWithError)}>
          {openWithError ? 'Close' : 'Open'} Tearsheet with Error State
        </Button>
      </div>

      <MultiStepTearsheet
        {...commonProps}
        open={openMultiStep}
        setOpen={setOpenMultiStep}
      />

      <MultiStepWithIntro
        {...commonProps}
        open={openWithIntro}
        setOpen={setOpenWithIntro}
      />

      <MultiStepWithStepInErrorState
        {...commonProps}
        open={openWithError}
        setOpen={setOpenWithError}
      />
    </div>
  );
};

export default App;
