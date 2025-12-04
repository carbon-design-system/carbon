/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../Button';
import InlineLoading from '.';
import mdx from './InlineLoading.mdx';

const defaultArgs = {
  description: 'Loading',
  iconDescription: 'Loading data...',
  theme: 'g10',
};
const defaultArgTypes = {
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
  theme: {
    options: ['white', 'g10', 'g90', 'g100'],
    control: { type: 'select' },
    description: 'The theme to apply to the component.',
  },
};
export default {
  title: 'Components/InlineLoading',
  component: InlineLoading,
  argTypes: defaultArgTypes,
  args: defaultArgs,
  parameters: {
    docs: {
      page: mdx,
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

Default.parameters = {
  controls: {
    exclude: ['successDelay'],
  },
};
