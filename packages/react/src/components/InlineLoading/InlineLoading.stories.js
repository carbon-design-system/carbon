/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../Button';
import InlineLoading from '.';
import mdx from './InlineLoading.mdx';

export default {
  title: 'Components/InlineLoading',
  component: InlineLoading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  description: {
    control: {
      type: 'text',
    },
  },
  iconDescription: {
    control: {
      type: 'text',
    },
  },
  successDelay: {
    control: {
      type: 'number',
    },
  },
  status: {
    options: ['inactive', 'active', 'error', 'finished'],
    control: {
      type: 'select',
    },
  },
  onSuccess: {
    action: 'onSuccess',
  },
  'aria-live': {
    control: {
      type: 'text',
    },
  },
};

export const UxExample = () => {
  function MockSubmission({ children }) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [description, setDescription] = React.useState('Submitting...');
    const [ariaLive, setAriaLive] = React.useState('off');
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

export const Default = (args) => <InlineLoading {...args} />;

Default.args = {
  description: 'Loading',
  iconDescription: 'Loading data...',
  status: 'active',
  onSuccess: () => console.log('Success!'),
  'aria-live': 'assertive',
};

Default.parameters = {
  controls: {
    exclude: ['successDelay'],
  },
};

Default.argTypes = { ...sharedArgTypes };
