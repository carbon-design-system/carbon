/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button, InlineLoading } from 'carbon-components-react';

export default {
  title: 'Components/InlineLoading',

  parameters: {
    component: InlineLoading,
  },
};

export const _InlineLoading = () => (
  <InlineLoading
    status="active"
    iconDescription="Active loading indicator"
    description="Loading data..."
  />
);

export const UxExample = () => {
  function MockSubmission({ children }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Submitting...');
    const [ariaLive, setAriaLive] = useState('off');
    const handleSubmit = () => {
      setIsSubmitting(true);
      setAriaLive('assertive');

      // Instead of making a real request, we mock it with a timer
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setDescription('Submitted!');

        // To make submittable again, we reset the state after a bit so the user gets completion feedback
        setTimeout(() => {
          setSuccess(false);
          setDescription('Submitting...');
          setAriaLive('off');
        }, 1500);
      }, 2000);
    };

    return children({
      handleSubmit,
      isSubmitting,
      success,
      description,
      ariaLive,
    });
  }

  return (
    <MockSubmission>
      {({ handleSubmit, isSubmitting, success, description, ariaLive }) => (
        <div style={{ display: 'flex', width: '300px' }}>
          <Button kind="secondary" disabled={isSubmitting || success}>
            Cancel
          </Button>
          {isSubmitting || success ? (
            <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={description}
              status={success ? 'finished' : 'active'}
              aria-live={ariaLive}
            />
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      )}
    </MockSubmission>
  );
};
